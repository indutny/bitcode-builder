import * as assert from 'assert';

import { Type } from './base';

class ArrayTy extends Type {
  constructor(public readonly length: number, public readonly elemType: Type) {
    super(`[${length} x ${elemType.typeString}]`);

    assert(!elemType.isVoid(), 'Can\'t create Array of Void');
  }

  public isEqual(to: Type): boolean {
    if (!to.isArray()) {
      return false;
    }

    const toArray = to as ArrayTy;
    return toArray.length === this.length &&
      toArray.elemType.isEqual(this.elemType);
  }
}
export { ArrayTy as Array };
