import * as assert from 'assert';
import { validateName } from '../utils';

import { CallingConv } from '../calling-conv';
import { Label, Type } from '../types';
import { Value } from './base';
import { Constant, Func } from './constants';
import {
  Binop, BinopType, Branch, Call, CallType, Cast, CastType, ExtractValue,
  GetElementPtr, ICmp, ICmpPredicate, InsertValue, Instruction, IPhiEdge,
  ISwitchCase, Jump, Load, Phi, Ret, Store, Switch, Unreachable,
} from './instructions';

export class BasicBlock extends Value {
  protected readonly privPredecessors: BasicBlock[] = [];
  protected readonly privSuccessors: BasicBlock[] = [];
  private readonly instructions: Instruction[] = [];
  private readonly phis: Phi[] = [];
  private privTerminator: Instruction | undefined = undefined;
  private privName: string | undefined = undefined;

  constructor(private readonly parent: Func, name?: string) {
    super(new Label());
    if (name !== undefined) {
      this.name = name;
    }
  }

  public get name(): string | undefined {
    return this.privName;
  }

  public set name(value: string | undefined) {
    if (value !== undefined) {
      assert(validateName(value),
        `Invalid characters in Block name: "${value}"`);
    }
    this.privName = value;
  }

  public get terminator(): Instruction | undefined {
    return this.privTerminator;
  }

  public isTerminated(): boolean { return this.privTerminator !== undefined; }

  public get predecessors(): ReadonlyArray<BasicBlock> {
    return this.privPredecessors;
  }

  public get successors(): ReadonlyArray<BasicBlock> {
    return this.privSuccessors;
  }

  // Special instructions

  public phi(edgeOrTy: Type | IPhiEdge): Phi {
    assert.strictEqual(this.terminator, undefined,
      'Can\'t push into terminated block');
    const phi = new Phi(edgeOrTy);
    this.phis.push(phi);
    return phi;
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

  public load(ptr: Value, alignment?: number, isVolatile: boolean = false)
    : Load {
    return this.push<Load>(new Load(ptr, alignment, isVolatile));
  }

  public store(value: Value, ptr: Value, alignment?: number,
               isVolatile: boolean = false)
    : Store {
    return this.push<Store>(new Store(value, ptr, alignment, isVolatile));
  }

  public getelementptr(ptr: Value, ptrIndex: Value, index?: Constant,
                       inbounds: boolean = false): GetElementPtr {
    return this.push<GetElementPtr>(
      new GetElementPtr(ptr, ptrIndex, index, inbounds));
  }

  public extractvalue(aggr: Value, index: Constant): ExtractValue {
    return this.push<ExtractValue>(new ExtractValue(aggr, index));
  }

  public insertvalue(aggr: Value, elem: Value, index: Constant): InsertValue {
    return this.push<InsertValue>(new InsertValue(aggr, elem, index));
  }

  public call(callee: Value, args: ReadonlyArray<Value>,
              callType: CallType = 'normal', cconv: CallingConv = 'ccc'): Call {
    return this.push<Call>(new Call(callee, args, callType, cconv));
  }

  // Terminators

  public ret(operand?: Value): Ret {
    const returnType = this.parent.ty.toSignature().returnType;
    if (operand === undefined) {
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

  public switch(condition: Value, otherwise: BasicBlock,
                cases: ISwitchCase[]): Switch {
    this.addSuccessor(otherwise);
    cases.forEach((c) => this.addSuccessor(c.block));
    return this.terminate<Switch>(new Switch(condition, otherwise, cases));
  }

  public unreachable(): Unreachable {
    return this.terminate<Unreachable>(new Unreachable());
  }

  public *[Symbol.iterator](): Iterator<Instruction> {
    yield* this.phis;
    yield* this.instructions;
  }

  // Helpers

  private push<T extends Instruction>(instr: T): T {
    assert.strictEqual(this.terminator, undefined,
      'Can\'t push into terminated block');
    this.instructions.push(instr);
    return instr;
  }

  private terminate<T extends Instruction>(instr: T): T {
    assert.strictEqual(this.terminator, undefined, 'Block already terminated');
    this.instructions.push(instr);
    this.privTerminator = instr;
    return instr;
  }

  private addSuccessor(block: BasicBlock) {
    this.privSuccessors.push(block);
    block.privPredecessors.push(this);
  }
}
