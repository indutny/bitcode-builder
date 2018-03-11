import * as assert from 'assert';

import * as values from '../';
import { BOOL_WIDTH } from '../../constants';
import { Int } from '../../types';
import { Instruction } from './base';

// TODO(indutny): floating point
export type ICmpPredicate =
  'eq' | 'ne' | 'ugt' | 'uge' | 'ult' | 'ule' | 'sgt' | 'sge' | 'slt' | 'sle';

export class ICmp extends Instruction {
  constructor(public readonly predicate: ICmpPredicate,
              public readonly left: values.Value,
              public readonly right: values.Value) {
    super(new Int(BOOL_WIDTH), 'icmp', [ left, right ]);

    assert(left.ty.isInt() || left.ty.isPointer(),
      'Only integer types are supported at the moment');
    assert(left.ty.isEqual(right.ty),
      'Left and right operands of ICmp have different types');
  }
}
