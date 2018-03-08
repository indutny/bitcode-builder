import * as assert from 'assert';

import * as values from '../values';
import { Type } from './base';

class ArrayTy extends Type {
  constructor(public readonly length: number, public readonly elemType: Type) {
    super(`[${length} x ${elemType.typeString}]`);

    assert(!elemType.isVoid(), 'Can\'t create Array of Void');
  }

  public isEqual(to: Type): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isArray()) {
      return false;
    }

    return to.length === this.length &&
      to.elemType.isEqual(this.elemType);
  }

  public val<T extends values.constants.Constant>(elems: T[])
    : values.constants.Array<T> {
    assert.strictEqual(elems.length, this.length, 'Invalid elements count');
    return new values.constants.Array<T>(this, elems);
  }
}
export { ArrayTy as Array };
