import * as types from '../types';

export abstract class Type {
  constructor(public readonly typeString: string) {
  }

  public isVoid() { return this instanceof types.Void; }
  public isInt() { return this instanceof types.Int; }
  public isPointer() { return this instanceof types.Pointer; }
  public isSignature() { return this instanceof types.Signature; }
}
