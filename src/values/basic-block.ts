import * as assert from 'assert';

import { Label, Type } from '../types';
import { Value } from './base';
import { Func } from './function';
import {
  Binop, BinopType, Cast, CastType, Instruction, Jump, Phi, Ret,
} from './instructions';

export class BasicBlock extends Value {
  public readonly predecessors: BasicBlock[] = [];
  public readonly successors: BasicBlock[] = [];
  public readonly instructions: Instruction[] = [];
  public readonly phis: Phi[] = [];
  private privTerminator: Instruction | null = null;

  constructor(public readonly parent: Func) {
    super(new Label());
  }

  public get terminator() { return this.privTerminator; }

  public phi(ty: Type): Phi {
    return this.push<Phi>(new Phi(ty));
  }

  public binop(binopType: BinopType, left: Value, right: Value): Binop {
    return this.push<Binop>(new Binop(binopType, left, right));
  }

  public cast(castType: CastType, value: Value, targetType: Type): Cast {
    return this.push<Cast>(new Cast(castType, value, targetType));
  }

  public ret(operand: Value | null): Ret {
    return this.terminate<Ret>(new Ret(operand));
  }

  public jmp(target: BasicBlock): Jump {
    return this.terminate<Jump>(new Jump(target));
  }

  private push<T extends Instruction>(instr: T): T {
    assert.strictEqual(this.terminator, null,
      'Can\'t push into terminated block');
    this.instructions.push(instr);
    return instr;
  }

  private terminate<T extends Instruction>(instr: T): T {
    assert.strictEqual(this.terminator, null, 'Block already terminated');
    this.instructions.push(instr);
    this.privTerminator = instr;
    return instr;
  }
}
