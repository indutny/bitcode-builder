import * as types from '../../types';
import { Constant } from './base';

export class Int extends Constant {
  // TODO(indutny): 64bit values through Array, or Int64 class?
  constructor(ty: types.Int, public readonly value: number) {
    super(ty);
  }

  public isEqual(to: Constant): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isInt() || !to.ty.isEqual(this.ty)) {
      return false;
    }

    const toInt = to as Int;
    return toInt.value === this.value;
  }
}
