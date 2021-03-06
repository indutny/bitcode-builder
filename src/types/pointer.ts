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
      // Signatures might be equal to pointers, better check
      if (to.isSignature()) {
        return to.isEqual(this);
      }
      return false;
    }

    const toPtr = to as Pointer;
    return toPtr.to.isEqual(this.to);
  }

  public val(_: null): values.constants.Null {
    return new values.constants.Null(this);
  }
}
