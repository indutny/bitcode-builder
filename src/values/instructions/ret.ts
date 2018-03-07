import * as values from '../';
import { Void } from '../../types';
import { Instruction } from './base';

export class Ret extends Instruction {
  constructor(operand: values.Value | null) {
    super(new Void(), 'ret', operand === null ? [] : [ operand ]);
  }
}
