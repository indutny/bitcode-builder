import { Attribute } from './attribute-list';
import { CallingConv } from './calling-conv';
import { Linkage } from './linkage';
import * as types from './types';
import * as values from './values';

import Type = types.Type;
import Constant = values.constants.Constant;

export class Builder {
  // Types

  public static void(): types.Void {
    return new types.Void();
  }

  public static i(width: number): types.Int {
    return new types.Int(width);
  }

  public static signature(returnType: Type, params: Type[]): types.Signature {
    return new types.Signature(returnType, params);
  }

  public static array(length: number, elemType: Type): types.Array {
    return new types.Array(length, elemType);
  }

  public static struct(name?: string): types.Struct {
    return new types.Struct(name);
  }

  // Values

  public static global(ty: types.Type, name: string, init?: Constant)
    : values.Global {
    return new values.Global(ty, name, init);
  }

  // Metadata

  public static metadata(value: values.constants.MetadataValue)
    : values.constants.Metadata {
    return new values.constants.Metadata(value);
  }

  // Convenience methods

  public void(): types.Void { return Builder.void(); }

  public i(width: number): types.Int { return Builder.i(width); }

  public signature(returnType: Type, params: Type[]): types.Signature {
    return Builder.signature(returnType, params);
  }

  public array(length: number, elemType: Type): types.Array {
    return Builder.array(length, elemType);
  }

  public struct(name?: string): types.Struct { return Builder.struct(name); }

  public global(ty: types.Type, name: string, init?: values.constants.Constant)
    : values.Global {
    return Builder.global(ty, name, init);
  }

  public metadata(value: values.constants.MetadataValue)
    : values.constants.Metadata {
    return Builder.metadata(value);
  }
}

export { types, values, Attribute, CallingConv, Linkage };
