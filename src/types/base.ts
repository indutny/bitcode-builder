import * as types from '../types';

export abstract class Type {
  constructor(public readonly typeString: string) {
  }

  public ptr(): types.Pointer {
    return new types.Pointer(this);
  }

  public isVoid(): boolean { return this instanceof types.Void; }
  public isInt(): boolean { return this instanceof types.Int; }
  public isPointer(): boolean { return this instanceof types.Pointer; }
  public isSignature(): boolean { return this instanceof types.Signature; }
  public isArray(): boolean { return this instanceof types.Array; }
}
