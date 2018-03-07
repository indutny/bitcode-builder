import * as assert from 'assert';
import { Bitcode } from '../';

describe('bitcode/instructions', () => {
  const b = new Bitcode();

  const createFn = () => {
    const sig = b.signature(b.void(), [ b.i(32), b.i(32), b.i(8) ]);
    return sig.defineFunction('some_func', [ 'a', 'b', 'c' ]);
  };

  describe('binop', () => {
    it('should be created', () => {
      const fn = createFn();
      fn.body.binop('add', fn.getArgument('a'), fn.getArgument('b'));
    });

    it('should check that operands are of Int type', () => {
      const fn = createFn();

      assert.throws(() => {
        fn.body.binop('add', fn.getArgument('a'), b.i(32).ptr().val(null));
      }, /Only Int/);
    });

    it('should check equality of types', () => {
      const fn = createFn();

      assert.throws(() => {
        fn.body.binop('add', fn.getArgument('a'), fn.getArgument('c'));
      }, /Left and right.*different types/);
    });
  });
});
