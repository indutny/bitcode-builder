import * as assert from 'assert';

import * as values from '../';
import { Void } from '../../types';
import { Instruction } from './base';

export interface ISwitchCase {
  value: values.constants.Int;
  block: values.BasicBlock;
}

export class Switch extends Instruction {
  constructor(public readonly condition: values.Value,
              public readonly otherwise: values.BasicBlock,
              public readonly cases: ISwitchCase[]) {
    super(new Void(), 'switch', [ condition, otherwise ]);

    assert(condition.ty.isInt(), 'Switch `condition` must have Int type');
    cases.forEach((c, index) => {
      assert(condition.ty.isEqual(c.value.ty),
        `Type mismatch for switch clause :${index}`);
      this.operands.push(c.value, c.block);
    });
  }
}
