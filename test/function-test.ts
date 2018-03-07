import * as assert from 'assert';
import { Builder } from '../';

describe('bitcode/function', () => {
  let b: Builder;
  beforeEach(() => {
    b = new Builder();
  });

  describe('Declaration', () => {
    it('should create a declaration', () => {
      const sig = b.signature(b.void(), [ b.i(32) ]);

      const decl = sig.declareFunction('some_func');
      assert(decl.isDeclaration());
      assert(decl.ty.isSignature());
      assert(decl.ty.isEqual(sig));
      assert.strictEqual(decl.name, 'some_func');
    });
  });

  describe('Func', () => {
    it('should create a function', () => {
      const sig = b.signature(b.void(), [ b.i(32) ]);

      const fn = sig.defineFunction('some_func', [ 'p' ]);
      assert(fn.isDeclaration());
      assert(fn.isFunction());
      assert(fn.ty.isSignature());
      assert(fn.ty.isEqual(sig));
      assert.strictEqual(fn.name, 'some_func');
    });

    it('should allow populating body', () => {
      const sig = b.signature(b.void(), [ b.i(32) ]);

      const fn = sig.defineFunction('some_func', [ 'p' ]);

      const bb = fn.createBlock('bb');

      fn.body.jmp(bb);
      bb.ret();
    });

    it('should iterate through the blocks/instructions', () => {
      const sig = b.signature(b.i(32), [ b.i(32) ]);

      const fn = sig.defineFunction('some_func', [ 'p' ]);
      fn.body.name = 'fn';

      const loopStart = fn.createBlock('loop_start');
      fn.body.jmp(loopStart);

      const phi = loopStart.phi({
        fromBlock: fn.body,
        value: fn.getArgument('p'),
      });

      const loop = fn.createBlock('loop');
      loopStart.jmp(loop);

      const inc = loop.binop('add', phi, b.i(32).val(1));
      phi.addEdge({ fromBlock: loop, value: inc });

      const loopEnd = fn.createBlock('loop_end');
      loop.branch(b.i(1).val(1), loopStart, loopEnd);

      loopEnd.ret(phi);

      const blocks = [];
      const instrs = [];
      for (const bb of fn) {
        blocks.push(bb.name);

        const subInstrs = [];
        for (const i of bb) {
          subInstrs.push(i.opcode);
        }
        instrs.push(subInstrs);
      }

      assert.deepStrictEqual(blocks, [
        'fn', 'loop_start', 'loop', 'loop_end',
      ]);

      assert.deepStrictEqual(instrs, [
        [ 'jmp' ],
        [ 'phi', 'jmp' ],
        [ 'binop', 'branch' ],
        [ 'ret' ],
      ]);
    });
  });
});
