import { Label } from '../types';
import { Value } from './base';
import { Func } from './function';
import { Instruction } from './instructions';

export class BasicBlock extends Value {
  public readonly predecessors: BasicBlock[] = [];
  public readonly successors: BasicBlock[] = [];
  public readonly instructions: Instruction[] = [];

  constructor(public readonly parent: Func) {
    super(new Label());
  }
}
