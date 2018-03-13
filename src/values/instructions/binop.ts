import * as assert from 'assert';

import * as values from '../';
import { Instruction } from './base';

// TODO(indutny): floating point
export type BinopType =
  'add' | 'sub' | 'mul' | 'udiv' | 'sdiv' | 'urem' | 'srem' | 'shl' | 'lshr' |
  'ashr' | 'and' | 'or' | 'xor';

// TODO(indutny): optimization (nsw, nuw, ...)
export class Binop extends Instruction {
  constructor(public readonly binopType: BinopType,
              public readonly left: values.Value,
              public readonly right: values.Value) {
    super(left.ty, 'binop.' + binopType, [ left, right ]);
    assert(left.ty.isInt() && right.ty.isInt(),
      'Only Int type is supported at the moment');
    assert(left.ty.isEqual(right.ty),
      'Left and right operands of Binop have different types');
  }
}
