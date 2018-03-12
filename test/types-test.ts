import * as assert from 'assert';
import { Builder } from '../src/bitcode';

describe('bitcode/types', () => {
  let b: Builder;
  beforeEach(() => {
    b = new Builder();
  });

  it('should create Void', () => {
    const t = b.void();

    assert(t.isVoid());
    assert.strictEqual(t.typeString, 'void');
    assert(t.isEqual(b.void()));
  });

  it('should create Int', () => {
    const i32 = b.i(32);

    assert(i32.isInt());
    assert.strictEqual(i32.typeString, 'i32');
    assert(i32.isEqual(b.i(32)));
    assert(!i32.isEqual(b.i(16)));
  });

  it('should create Signature', () => {
    const sig = b.signature(b.void(), [ b.i(32), b.i(8) ]);

    assert(sig.isSignature());
    assert.strictEqual(sig.typeString, 'void (i32, i8)');
    assert(sig.isEqual(sig));
    assert(!sig.isEqual(b.signature(b.void(), [ b.i(32) ])));
    assert(!sig.isEqual(b.signature(b.i(32), [ b.i(32), b.i(8) ])));
    assert(!sig.isEqual(b.signature(b.void(), [ b.i(32), b.i(16) ])));

    assert(sig.isEqual(sig.ptr()));
  });

  describe('Array', () => {
    it('should create Array', () => {
      const arr = b.array(4, b.i(32));

      assert(arr.isArray());
      assert.strictEqual(arr.typeString, '[4 x i32]');
      assert(arr.isEqual(arr));
      assert(!arr.isEqual(b.array(5, b.i(32))));
      assert(!arr.isEqual(b.array(4, b.i(64))));
    });

    it('should not create Array of Void', () => {
      assert.throws(() => b.array(4, b.void()), /Can't create Array of Void/);
    });
  });

  describe('Struct', () => {
    it('should create Struct', () => {
      const s = b.struct();

      assert(s.isStruct());
      s.addField(b.i(32), 'f1');
      s.addField(b.i(8), 'f2');
      s.finalize();
      assert.strictEqual(s.typeString, '{ i32, i8 }');

      assert(s.isEqual(s));

      const diff1 = b.struct();
      diff1.addField(b.i(32), 'a1');
      diff1.finalize();
      assert(!s.isEqual(diff1));

      const diff2 = b.struct();
      diff2.addField(b.i(32), 'a1');
      diff2.addField(b.i(16), 'b2');
      diff2.finalize();
      assert(!s.isEqual(diff1));
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
