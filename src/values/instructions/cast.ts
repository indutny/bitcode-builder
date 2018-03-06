import * as assert from 'assert';

import * as values from '../';
import { Type } from '../../types';
import { Instruction } from './base';

export type CastType = 'trunc' | 'zext' | 'sext' | 'fptoui' | 'fptosi' |
  'uitofp' | 'sitofp' | 'fptrunc' | 'fpext' | 'ptrtoint' | 'inttoptr' |
  'bitcast' | 'addrspacecast';

export class Cast extends Instruction {
  constructor(public readonly castType: CastType, value: values.Value,
              public readonly targetType: Type) {
    super(targetType, [ value ]);

    if (castType === 'trunc' || castType === 'zext' || castType === 'sext') {
      assert(value.ty.isInt() && targetType.isInt(),
        `Invalid types for \`${castType}\` cast`);
    } else if (castType === 'ptrtoint') {
      assert(value.ty.isPointer() && targetType.isInt(),
        'Invalid types for `ptrtoint` cast');
    } else if (castType === 'inttoptr') {
      assert(value.ty.isInt() && targetType.isPointer(),
        'Invalid types for `inttoptr` cast');
    } else if (castType === 'bitcast') {
      assert(value.ty.isPointer() && targetType.isPointer(),
        'Invalid types for `bitcast` cast');
    } else {
      throw new Error(`Sorry, but \`${castType}\` cast is not implemented yet`);
    }
  }
}
