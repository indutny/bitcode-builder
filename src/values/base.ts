import { Type } from '../types';
import * as values from './';

export abstract class Value {
  constructor(public readonly ty: Type) {
  }

  public isBasicBlock(): this is values.BasicBlock {
    return this instanceof values.BasicBlock;
  }

  public isDeclaration(): this is values.Declaration {
    return this instanceof values.Declaration;
  }

  public isFunction(): this is values.Func {
    return this instanceof values.Func;
  }

  public isConst(): this is values.constants.Constant {
    return this instanceof values.constants.Constant;
  }

  public isInstruction(): this is values.instructions.Instruction {
    return this instanceof values.instructions.Instruction;
  }
}
