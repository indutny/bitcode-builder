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
  });
});
