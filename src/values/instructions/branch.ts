import * as assert from 'assert';

import * as values from '../';
import { BOOL_WIDTH } from '../../constants';
import { Void } from '../../types';
import { Instruction } from './base';

export class Branch extends Instruction {
  constructor(public readonly condition: values.Value,
              public readonly onTrue: values.BasicBlock,
              public readonly onFalse: values.BasicBlock) {
    super(new Void(), 'branch', [ condition, onTrue, onFalse ]);

    assert(condition.ty.isInt(), 'Branch `condition` must have Int type');
    assert.strictEqual(condition.ty.toInt().width, BOOL_WIDTH,
      'Branch `condition` must have a boolean width');
  }
}
