import * as assert from 'assert';
import { Bitcode } from '../';

describe('bitcode/constants', () => {
  let b: Bitcode;
  beforeEach(() => {
    b = new Bitcode();
  });

  describe('Int', () => {
    it('should create Int constant', () => {
      const c = b.i(32).val(123);

      assert(c.isInt());
      assert.strictEqual(c.value, 123);
      assert.strictEqual(c.ty.typeString, 'i32');
    });

    it('should support `.isEqual()`', () => {
      const c = b.i(32).val(123);

      assert(c.isEqual(c));

      const c1 = b.i(32).val(456);
      assert(!c.isEqual(c1));
    });
  });

  describe('Array', () => {
    it('should create Array constant', () => {
      const i32 = b.i(32);
      const c = b.array(3, i32).val([ i32.val(1), i32.val(2), i32.val(3) ]);

      assert(c.isArray());
      assert.strictEqual(c.ty.typeString, '[3 x i32]');
      assert.strictEqual(c.elems.length, 3);

      assert.strictEqual(c.elems[0].ty.typeString, 'i32');
      assert.strictEqual(c.elems[0].value, 1);

      assert.strictEqual(c.elems[1].ty.typeString, 'i32');
      assert.strictEqual(c.elems[1].value, 2);

      assert.strictEqual(c.elems[2].ty.typeString, 'i32');
      assert.strictEqual(c.elems[2].value, 3);
    });

    it('should support `.isEqual()`', () => {
      const i32 = b.i(32);
      const c = b.array(3, i32).val([ i32.val(1), i32.val(2), i32.val(3) ]);
      assert(c.isEqual(c));

      const c1 = b.array(1, i32).val([ i32.val(1) ]);
      assert(!c.isEqual(c1));

      const c2 = b.array(3, i32).val([ i32.val(1), i32.val(2), i32.val(4) ]);
      assert(!c.isEqual(c2));
    });
  });

  describe('Struct', () => {
    it('should create Struct constant', () => {
      const i32 = b.i(32);
      const i8 = b.i(8);
      const s = b.struct();
      s.addField(i32, 'a');
      s.addField(i8, 'b');
      s.finalize();

      const sv = s.val({ a: i32.val(1), b: i8.val(2) });

      assert(sv.isStruct());
      assert.strictEqual(sv.ty.typeString, '{ i32, i8 }');
      assert.strictEqual(sv.fields.length, 2);

      assert.strictEqual(sv.fields[0].ty.typeString, 'i32');
      assert(sv.fields[0].isInt());
      assert.strictEqual(sv.fields[0].toInt().value, 1);

      assert.strictEqual(sv.fields[1].ty.typeString, 'i8');
      assert(sv.fields[1].isInt());
      assert.strictEqual(sv.fields[1].toInt().value, 2);
    });

    it('should support `.isEqual()`', () => {
      const i32 = b.i(32);
      const s = b.struct();
      s.addField(i32, 'a');
      s.finalize();

      const sv = s.val({ a: i32.val(1) });
      assert(sv.isEqual(sv));

      const sv1 = s.val({ a: i32.val(2) });
      assert(!sv.isEqual(sv1));
    });
  });
});
