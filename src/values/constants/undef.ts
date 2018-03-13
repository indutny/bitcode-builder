import * as types from '../../types';
import { Constant } from './base';

export class Undef extends Constant {
  constructor(ty: types.Type) {
    super(ty);
  }

  public isEqual(to: Constant): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isUndef()) {
      return false;
    }

    const toUndef = to as Undef;
    return toUndef.ty.isEqual(this.ty);
  }

  public toString(): string {
    return `[undef type=${this.ty.typeString}]`;
  }
}
