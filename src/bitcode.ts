import { Buffer } from 'buffer';

import { Attribute, AttributeList } from './attribute-list';
import { CallingConv } from './calling-conv';
import { Linkage } from './linkage';
import * as types from './types';
import * as values from './values';

import Type = types.Type;
import constants = values.constants;

const CHAR_WIDTH = 8;

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

  public static global(ty: types.Type, name: string, init?: constants.Constant)
    : values.Global {
    return new values.Global(ty, name, init);
  }

  public static cstring(value: string): constants.Array {
    const len = Buffer.byteLength(value);
    const blob = Buffer.alloc(len + 1);
    blob.write(value);
    return Builder.blob(Buffer.from(blob));
  }

  public static blob(buffer: Buffer): constants.Array {
    const elemTy = Builder.i(CHAR_WIDTH);
    const ty = Builder.array(buffer.length, elemTy);

    const elems = Array.from(buffer).map((ch) => elemTy.val(ch));
    return ty.val(elems);
  }

  // Metadata

  public static metadata(value: constants.MetadataValue): constants.Metadata {
    return new constants.Metadata(value);
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

  public global(ty: types.Type, name: string, init?: constants.Constant)
    : values.Global {
    return Builder.global(ty, name, init);
  }

  public cstring(value: string): constants.Array {
    return Builder.cstring(value);
  }

  public blob(buffer: Buffer): constants.Array {
    // TODO(indutny): cache results?
    return Builder.blob(buffer);
  }

  public metadata(value: constants.MetadataValue): constants.Metadata {
    return Builder.metadata(value);
  }
}

export { types, values, Attribute, AttributeList, CallingConv, Linkage };
