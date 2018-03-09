import { Void } from '../../types';
import { Instruction } from './base';

export class Unreachable extends Instruction {
  constructor() {
    super(new Void(), 'unreachable', []);
  }
}
