import * as assert from 'assert';
import { Bitcode } from '../';

describe('bitcode/types', () => {
  let b;
  beforeEach(() => {
    b = new Bitcode();
  });

  it('should create Void', () => {
    const t = b.void();

    assert(t.isVoid());
    assert.strictEqual(t.typeString, 'void');
  });

  it('should create Int', () => {
    const i32 = b.i(32);

    assert(i32.isInt());
    assert.strictEqual(i32.typeString, 'i32');
  });

  it('should create Signature', () => {
    const sig = b.signature(b.void(), [ b.i(32), b.i(8) ]);

    assert(sig.isSignature());
    assert.strictEqual(sig.typeString, 'void (i32, i8)');
  });

  describe('Array', () => {
    it('should create Array', () => {
      const sig = b.array(4, b.i(32));

      assert(sig.isArray());
      assert.strictEqual(sig.typeString, '[4 x i32]');
    });

    it('should not create Array of Void', () => {
      assert.throws(() => b.array(4, b.void()), /Can't create Array of Void/);
    });
  });

  describe('Pointer', () => {
    it('should not point to Void', () => {
      assert.throws(() => b.void().ptr(), /Can't create pointer to void/);
    });

    it('should point to Int', () => {
      const p = b.i(32).ptr();

      assert(p.isPointer());
      assert.strictEqual(p.typeString, 'i32*');
      assert(p.to.isInt());
    });

    it('should point to Signature', () => {
      const p = b.signature(b.void(), [ b.i(32), b.i(8) ]).ptr();

      assert(p.isPointer());
      assert.strictEqual(p.typeString, 'void (i32, i8)*');
      assert(p.to.isSignature());
    });

    it('should point to Pointer', () => {
      const p = b.i(32).ptr().ptr();

      assert(p.isPointer());
      assert.strictEqual(p.typeString, 'i32**');
      assert(p.to.isPointer());
    });
  });
});
