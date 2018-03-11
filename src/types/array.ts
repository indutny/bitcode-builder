import * as assert from 'assert';
import { Buffer } from 'buffer';

import * as values from '../values';
import { Type } from './base';

class ArrayTy extends Type {
  constructor(public readonly length: number, public readonly elemType: Type) {
    super(`[${length} x ${elemType.typeString}]`);

    assert(!elemType.isVoid(), 'Can\'t create Array of Void');
    assert(!elemType.isSignature(),
      'Array can\'t have signature elements, please use `sig.ptr()`');
  }

  public isEqual(to: Type): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isArray()) {
      return false;
    }

    const toArray = to as ArrayTy;
    return toArray.length === this.length &&
      toArray.elemType.isEqual(this.elemType);
  }

  public val(elems: values.constants.Constant[]): values.constants.Array {
    assert.strictEqual(elems.length, this.length, 'Invalid elements count');
    return new values.constants.Array(this, elems);
  }
}
export { ArrayTy as Array };
