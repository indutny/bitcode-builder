import * as assert from 'assert';

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

  public isConstant(): boolean {
    return this instanceof values.constants.Constant;
  }

  public isInstruction(): boolean {
    return this instanceof values.instructions.Instruction;
  }

  public toArgument(): values.Argument {
    assert(this.isArgument(), 'Value is not an Argument instance');
    return this as any;
  }

  public toGlobal(): values.Global {
    assert(this.isGlobal(), 'Value is not an Global instance');
    return this as any;
  }

  public toBasicBlock(): values.BasicBlock {
    assert(this.isBasicBlock(), 'Value is not an BasicBlock instance');
    return this as any;
  }

  public toConstant(): values.constants.Constant {
    assert(this.isConstant(), 'Value is not an Constant instance');
    return this as any;
  }

  public toInstruction(): values.instructions.Instruction {
    assert(this.isInstruction(), 'Value is not an Instruction instance');
    return this as any;
  }
}
