import { Type } from '../../types';
import { Value } from '../base';
import { Metadata } from '../constants';
import * as instructions from './';

export abstract class Instruction extends Value {
  public readonly metadata: Map<string, Metadata> = new Map();

  constructor(ty: Type, public readonly opcode: string,
              protected readonly operands: Value[]) {
    super(ty);
  }

  public isPhi(): boolean { return this instanceof instructions.Phi; }

  public *[Symbol.iterator](): Iterator<Value> {
    yield* this.operands;
  }
}
