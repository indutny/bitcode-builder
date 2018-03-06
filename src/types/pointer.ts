import { Type } from './base';

export class Pointer extends Type {
  constructor(public readonly to: Type) {
    super(to.typeString + '*');
  }

  public isEqual(to: Type): boolean {
    if (!to.isPointer()) {
      return false;
    }

    const toPtr = to as Pointer;
    return toPtr.to.isEqual(this.to);
  }
}
