import * as assert from 'assert';

import * as values from '../';
import { Type } from '../../types';
import { Instruction } from './base';

export type BinopType = 'add' | 'mul';

export class Binop extends Instruction {
  constructor(public readonly binopType: BinopType,
              left: values.Value, right: values.Value) {
    super(left.ty, [ left, right ]);
    assert(left.ty.isEqual(right.ty),
      'Left and right operands of Binop have different types');
  }

  public addEdge(fromBlock: values.BasicBlock, value: values.Value) {
    this.operands.push(fromBlock, value);
  }
}
