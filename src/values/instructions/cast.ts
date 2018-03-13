import * as assert from 'assert';

import * as values from '../';
import { Type } from '../../types';
import { Instruction } from './base';

export type CastType = 'trunc' | 'zext' | 'sext' | 'fptoui' | 'fptosi' |
  'uitofp' | 'sitofp' | 'fptrunc' | 'fpext' | 'ptrtoint' | 'inttoptr' |
  'bitcast' | 'addrspacecast';

export class Cast extends Instruction {
  constructor(public readonly castType: CastType,
              public readonly operand: values.Value,
              public readonly targetType: Type) {
    super(targetType, 'cast.' + castType, [ operand ]);

    if (castType === 'trunc' || castType === 'zext' || castType === 'sext') {
      assert(operand.ty.isInt() && targetType.isInt(),
        `Invalid types for \`${castType}\` cast`);

      if (castType === 'trunc') {
        assert(operand.ty.toInt().width >= targetType.toInt().width,
          '`trunc` should reduce bit width`');
      } else {
        assert(operand.ty.toInt().width <= targetType.toInt().width,
          '`zext`/`sext` should extend bit width`');
      }
    } else if (castType === 'ptrtoint') {
      assert(operand.ty.isPointer() && targetType.isInt(),
        'Invalid types for `ptrtoint` cast');
    } else if (castType === 'inttoptr') {
      assert(operand.ty.isInt() && targetType.isPointer(),
        'Invalid types for `inttoptr` cast');
    } else if (castType === 'bitcast') {
      // TODO(indutny): check what we're doing with signatures here
      assert(
        (operand.ty.isSignature() || operand.ty.isPointer()) &&
          (targetType.isSignature() || targetType.isPointer()),
        'Invalid types for `bitcast` cast');
    } else {
      throw new Error(`Sorry, but \`${castType}\` cast is not implemented yet`);
    }
  }
}
