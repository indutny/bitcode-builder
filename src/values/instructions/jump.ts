import * as values from '../';
import { Void } from '../../types';
import { Instruction } from './base';

export class Jump extends Instruction {
  constructor(public readonly target: values.BasicBlock) {
    super(new Void(), [ target ]);
  }
}
