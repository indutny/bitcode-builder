import { Type } from '../../types';
import { Value } from '../base';

export abstract class Instruction extends Value {
  constructor(ty: Type, public readonly operands: Value[]) {
    super(ty);
  }
}
