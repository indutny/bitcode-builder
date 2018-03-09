import * as values from '../';
import { Void } from '../../types';
import { Instruction } from './base';

export class Ret extends Instruction {
  constructor(public readonly operand?: values.Value) {
    super(new Void(), 'ret', operand === undefined ? [] : [ operand ]);
  }
}
