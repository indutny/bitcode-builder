import * as values from '../';
import { Type } from '../../types';
import { Instruction } from './base';

export class Phi extends Instruction {
  constructor(ty: Type) {
    super(ty, []);
  }

  public addEdge(fromBlock: values.BasicBlock, value: values.Value) {
    this.operands.push(fromBlock, value);
  }
}
