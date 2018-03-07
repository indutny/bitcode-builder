import * as types from '../../types';
import { Constant } from './base';

export class Struct extends Constant {
  constructor(ty: types.Struct,
              public readonly fields: ReadonlyArray<Constant>) {
    super(ty);
  }

  public isEqual(to: Constant): boolean {
    if (!to.isStruct()) {
      return false;
    }

    const toStruct = to as Struct;
    return toStruct.ty.isEqual(this.ty) &&
      toStruct.fields.length === this.fields.length &&
      toStruct.fields.every((field, i) => field.isEqual(this.fields[i]));
  }
}
