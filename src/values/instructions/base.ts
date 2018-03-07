import { Type } from '../../types';
import { Value } from '../base';

// TODO(indutny): metadata
export abstract class Instruction extends Value {
  constructor(ty: Type, public readonly opcode: string,
              protected readonly operands: Value[]) {
    super(ty);
  }

  public *[Symbol.iterator](): Iterator<Value> {
    yield* this.operands;
  }
}
