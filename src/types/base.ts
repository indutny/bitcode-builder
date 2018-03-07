import * as assert from 'assert';

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

  public undef(): values.constants.Undef {
    return new values.constants.Undef(this);
  }

  public isVoid(): boolean { return this instanceof types.Void; }
  public isInt(): boolean { return this instanceof types.Int; }
  public isPointer(): boolean { return this instanceof types.Pointer; }
  public isSignature(): boolean { return this instanceof types.Signature; }
  public isStruct(): boolean { return this instanceof types.Struct; }
  public isArray(): boolean { return this instanceof types.Array; }

  public toInt(): types.Int {
    assert(this.isInt(), 'Type is not an Int instance');
    return this as any;
  }

  public toPointer(): types.Pointer {
    assert(this.isPointer(), 'Type is not a Pointer instance');
    return this as any;
  }

  public toSignature(): types.Signature {
    assert(this.isSignature(), 'Type is not a Signature instance');
    return this as any;
  }

  public toStruct(): types.Struct {
    assert(this.isStruct(), 'Type is not a Struct instance');
    return this as any;
  }

  public toArray(): types.Array {
    assert(this.isArray(), 'Type is not an Array instance');
    return this as any;
  }

  public abstract isEqual(to: Type): boolean;
}
