import { Attribute } from './attribute-list';
import { CallingConv } from './calling-conv';
import { Linkage } from './linkage';
import { Metadata } from './metadata';
import * as types from './types';
import * as values from './values';

export class Builder {
  constructor(public sourceName: string | null = null) {
  }

  // Types

  public void(): types.Void {
    return new types.Void();
  }

  public i(width: number): types.Int {
    return new types.Int(width);
  }

  public signature(ret: types.Type, params: types.Type[]): types.Signature {
    return new types.Signature(ret, params);
  }

  public array(length: number, elemType: types.Type): types.Array {
    return new types.Array(length, elemType);
  }

  public struct(name: string | null = null): types.Struct {
    return new types.Struct(name);
  }

  // Values

  public global(ty: types.Type, name: string, init: values.Value | null = null)
    : values.Global {
    return new values.Global(ty, name, init);
  }

  // Metadata

  public metadata(value: ReadonlyArray<string | values.Value | Metadata>)
    : Metadata {
    return new Metadata(value);
  }
}

export { types, values, Attribute, CallingConv, Linkage, Metadata };
