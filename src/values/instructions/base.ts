import { Type } from '../../types';
import { Value } from '../base';

export abstract class Instruction extends Value {
  constructor(ty: Type, public readonly opcode: string,
              protected readonly operands: Value[]) {
    super(ty);
  }
}
