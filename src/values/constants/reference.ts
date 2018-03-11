import * as types from '../../types';
import * as constants from './';

export class Reference extends constants.Constant {
  constructor(public readonly to: constants.Declaration) {
    super(to.ty.ptr());
  }

  public isEqual(to: constants.Constant): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isReference() || !to.ty.isEqual(this.ty)) {
      return false;
    }

    const toReference = to as Reference;
    return toReference.to.isEqual(this.to);
  }
}
