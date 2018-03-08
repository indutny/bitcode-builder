import * as values from '../values';
import { Type } from './base';

export class Pointer extends Type {
  // TODO(indutny): addrspace
  constructor(public readonly to: Type) {
    super(to.typeString + '*');
  }

  public isEqual(to: Type): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isPointer()) {
      return false;
    }

    const toPtr = to as Pointer;
    return toPtr.to.isEqual(this.to);
  }

  public val(_: null) {
    return new values.constants.Null(this);
  }
}
