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
  public isBinop(): boolean { return this instanceof instructions.Binop; }
  public isBranch(): boolean { return this instanceof instructions.Branch; }
  public isCall(): boolean { return this instanceof instructions.Call; }
  public isCast(): boolean { return this instanceof instructions.Cast; }
  public isICmp(): boolean { return this instanceof instructions.ICmp; }
  public isJump(): boolean { return this instanceof instructions.Jump; }
  public isLoad(): boolean { return this instanceof instructions.Load; }
  public isRet(): boolean { return this instanceof instructions.Ret; }
  public isStore(): boolean { return this instanceof instructions.Store; }
  public isSwitch(): boolean { return this instanceof instructions.Switch; }

  public isExtractValue(): boolean {
    return this instanceof instructions.ExtractValue;
  }

  public isInsertValue(): boolean {
    return this instanceof instructions.InsertValue;
  }

  public isGetElementPtr(): boolean {
    return this instanceof instructions.GetElementPtr;
  }

  public isUnreachable(): boolean {
    return this instanceof instructions.Unreachable;
  }

  public *[Symbol.iterator](): Iterator<Value> {
    yield* this.operands;
  }
}
