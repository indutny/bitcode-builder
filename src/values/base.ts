import { Type } from '../types';
import * as values from './';

export abstract class Value {
  constructor(public readonly ty: Type) {
  }

  public isArgument(): boolean {
    return this instanceof values.Argument;
  }

  public isGlobal(): boolean {
    return this instanceof values.Global;
  }

  public isBasicBlock(): boolean {
    return this instanceof values.BasicBlock;
  }

  public isConst(): boolean {
    return this instanceof values.constants.Constant;
  }

  public isInstruction(): boolean {
    return this instanceof values.instructions.Instruction;
  }
}
