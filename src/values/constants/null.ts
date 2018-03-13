import * as types from '../../types';
import { Constant } from './base';

export class Null extends Constant {
  constructor(ty: types.Pointer) {
    super(ty);
  }

  public isEqual(to: Constant): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isNull()) {
      return false;
    }

    const toNull = to as Null;
    return toNull.ty.isEqual(this.ty);
  }

  public toString(): string {
    return `[null type=${this.ty.typeString}]`;
  }
}
