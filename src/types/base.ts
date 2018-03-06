import * as types from '../types';

export abstract class Type {
  constructor(private privTypeString: string) {
  }

  public get typeString(): string {
    return this.privTypeString;
  }

  public ptr(): types.Pointer {
    return new types.Pointer(this);
  }

  public isVoid(): boolean { return this instanceof types.Void; }
  public isInt(): boolean { return this instanceof types.Int; }
  public isPointer(): boolean { return this instanceof types.Pointer; }
  public isSignature(): boolean { return this instanceof types.Signature; }
  public isStruct(): boolean { return this instanceof types.Struct; }
  public isArray(): boolean { return this instanceof types.Array; }

  public abstract isEqual(to: Type): boolean;
}
