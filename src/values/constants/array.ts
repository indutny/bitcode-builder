import * as types from '../../types';
import { Constant } from './base';

class ArrayVal<T extends Constant> extends Constant {
  constructor(ty: types.Array, public readonly elems: ReadonlyArray<T>) {
    super(ty);
  }

  public isEqual(to: Constant): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isArray() || !to.ty.isEqual(this.ty)) {
      return false;
    }

    const toArray = to as ArrayVal<T>;
    return toArray.elems.length === this.elems.length &&
      toArray.elems.every((elem, i) => elem.isEqual(this.elems[i]));
  }
}

export { ArrayVal as Array };
