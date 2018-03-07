import * as assert from 'assert';

import { Label, Type } from '../types';
import { Value } from './base';
import { Func } from './function';
import {
  Binop, BinopType, Branch, Cast, CastType, ICmp, ICmpPredicate, Instruction,
  Jump, Load, Phi, Ret, Store,
} from './instructions';

export class BasicBlock extends Value {
  protected readonly predecessors: BasicBlock[] = [];
  protected readonly successors: BasicBlock[] = [];
  private readonly instructions: Instruction[] = [];
  private readonly phis: Phi[] = [];
  private privTerminator: Instruction | null = null;

  constructor(private readonly parent: Func,
              public name: string | null = null) {
    super(new Label());
  }

  public get terminator() { return this.privTerminator; }

  public phi(ty: Type): Phi {
    return this.push<Phi>(new Phi(ty));
  }

  // Regular instructions

  public binop(binopType: BinopType, left: Value, right: Value): Binop {
    return this.push<Binop>(new Binop(binopType, left, right));
  }

  public cast(castType: CastType, value: Value, targetType: Type): Cast {
    return this.push<Cast>(new Cast(castType, value, targetType));
  }

  public icmp(predicate: ICmpPredicate, left: Value, right: Value): ICmp {
    return this.push<ICmp>(new ICmp(predicate, left, right));
  }

  public load(ptr: Value, alignment: number | null = null,
              isVolatile: boolean = false): Load {
    return this.push<Load>(new Load(ptr, alignment, isVolatile));
  }

  public store(value: Value, ptr: Value, alignment: number | null = null,
               isVolatile: boolean = false)
    : Store {
    return this.push<Store>(new Store(value, ptr, alignment, isVolatile));
  }

  // Terminators

  public ret(operand: Value | null = null): Ret {
    const returnType = this.parent.ty.toSignature().returnType;
    if (operand === null) {
      assert(returnType.isVoid(), 'Void return from non-Void function');
    } else {
      assert(returnType.isEqual(operand.ty), 'Return type mismatch');
    }
    return this.terminate<Ret>(new Ret(operand));
  }

  public jmp(target: BasicBlock): Jump {
    this.addSuccessor(target);
    return this.terminate<Jump>(new Jump(target));
  }

  public branch(condition: Value, onTrue: BasicBlock,
                onFalse: BasicBlock): Branch {
    this.addSuccessor(onTrue);
    this.addSuccessor(onFalse);
    return this.terminate<Branch>(new Branch(condition, onTrue, onFalse));
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

  private addSuccessor(block: BasicBlock) {
    this.successors.push(block);
    block.predecessors.push(this);
  }
}
