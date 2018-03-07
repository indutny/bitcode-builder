import * as assert from 'assert';
import { Bitcode } from '../';

describe('bitcode/function', () => {
  let b: Bitcode;
  beforeEach(() => {
    b = new Bitcode();
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
      assert.deepStrictEqual(fn.paramNames, [ 'p' ]);
    });

    it('should allow populating body', () => {
      const sig = b.signature(b.void(), [ b.i(32) ]);

      const fn = sig.defineFunction('some_func', [ 'p' ]);

      const bb = fn.createBlock('bb');

      fn.body.jmp(bb);
      bb.ret();
    });
  });
});
