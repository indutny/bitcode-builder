import * as assert from 'assert';
import { Builder, passes } from '../src/bitcode';

describe('bitcode/passes/verify', () => {
  let b: Builder;
  beforeEach(() => {
    b = new Builder();
  });

  it('should throw on undeclared functions', () => {
    const sig = b.signature(b.void(), []);

    const undeclared = sig.declareFunction('undeclared');

    const user = sig.defineFunction('user', []);

    user.body.call(undeclared, []);
    user.body.ret();

    const verify = new passes.Verify({
      declarations: [],
      functions: [ user ],
      globals: [],
    });

    assert.throws(() => {
      verify.run();
    }, /Found reference to.*function.*undeclared/);
  });

  it('should throw on undeclared globals', () => {
    const sig = b.signature(b.void(), []);

    const undeclared = b.global(b.i(32).ptr(), 'undeclared');

    const user = sig.defineFunction('user', []);

    user.body.load(undeclared);
    user.body.ret();

    const verify = new passes.Verify({
      declarations: [],
      functions: [ user ],
      globals: [],
    });

    assert.throws(() => {
      verify.run();
    }, /Found reference to.*global.*undeclared/);
  });

  it('should throw on operands not dominating uses', () => {
    const sig = b.signature(b.i(8), []);

    const fn = sig.defineFunction('fn', []);

    const onTrue = fn.createBlock('true');
    const onFalse = fn.createBlock('false');
    const join = fn.createBlock('join');

    fn.body.branch(b.i(1).val(1), onTrue, onFalse);

    const sum = onTrue.binop('add', b.i(8).val(2), b.i(8).val(3));
    onTrue.jmp(join);

    onFalse.jmp(join);

    join.ret(sum);

    const verify = new passes.Verify({
      declarations: [],
      functions: [ fn ],
      globals: [],
    });

    assert.throws(() => {
      verify.run();
    }, /binop.add.*doesn't dominate.*ret/);
  });

  it('should not throw on phis', () => {
    const sig = b.signature(b.i(8), []);

    const fn = sig.defineFunction('fn', []);

    const onTrue = fn.createBlock('true');
    const onFalse = fn.createBlock('false');
    const join = fn.createBlock('join');

    fn.body.branch(b.i(1).val(1), onTrue, onFalse);

    const sum1 = onTrue.binop('add', b.i(8).val(2), b.i(8).val(3));
    onTrue.jmp(join);

    const sum2 = onFalse.binop('sub', b.i(8).val(2), b.i(8).val(3));
    onFalse.jmp(join);

    const phi = join.phi({ fromBlock: onTrue, value: sum1 });
    phi.addEdge({ fromBlock: onFalse, value: sum2 });
    join.ret(phi);

    const verify = new passes.Verify({
      declarations: [],
      functions: [ fn ],
      globals: [],
    });

    assert.doesNotThrow(() => {
      verify.run();
    });
  });
});
