import { Type } from '../types';
import * as values from './';

export abstract class Value {
  constructor(public readonly ty: Type) {
  }

  public isBasicBlock(): boolean {
    return this instanceof values.BasicBlock;
  }

  public isDeclaration(): boolean {
    return this instanceof values.Declaration;
  }

  public isFunction(): boolean {
    return this instanceof values.Func;
  }

  public isConst(): boolean {
    return this instanceof values.constants.Constant;
  }

  public isInstruction(): boolean {
    return this instanceof values.instructions.Instruction;
  }
}
