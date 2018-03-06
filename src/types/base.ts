import * as types from '../types';
import * as values from '../values';

export abstract class Type {
  constructor(private privTypeString: string) {
  }

  public get typeString(): string {
    return this.privTypeString;
  }

  public ptr(): types.Pointer {
    return new types.Pointer(this);
  }

  public val(_: any): values.Value {
    throw new Error('Not supported');
  }

  public isVoid(): boolean { return this instanceof types.Void; }
  public isInt(): boolean { return this instanceof types.Int; }
  public isPointer(): boolean { return this instanceof types.Pointer; }
  public isSignature(): boolean { return this instanceof types.Signature; }
  public isStruct(): boolean { return this instanceof types.Struct; }
  public isArray(): boolean { return this instanceof types.Array; }

  public abstract isEqual(to: Type): boolean;
}
