import { Type } from '../../types';
import { Value } from '../base';
import { Metadata } from '../constants';

export abstract class Instruction extends Value {
  public readonly metadata: Map<string, Metadata> = new Map();

  constructor(ty: Type, public readonly opcode: string,
              protected readonly operands: Value[]) {
    super(ty);
  }

  public *[Symbol.iterator](): Iterator<Value> {
    yield* this.operands;
  }
}
