import * as assert from 'assert';

import * as values from '../values';
import { Type } from './base';

export class Signature extends Type {
  constructor(public readonly returnType: Type,
              public readonly params: ReadonlyArray<Type>) {
    super(`${returnType.typeString} ` +
      `(${params.map((p) => p.typeString).join(', ')})`);
  }

  public isEqual(to: Type): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isSignature()) {
      return false;
    }

    const toSig = to as Signature;

    return toSig.returnType.isEqual(this.returnType) &&
      toSig.params.length === this.params.length &&
      toSig.params.every((param, i) => param.isEqual(this.params[i]));
  }

  public declareFunction(name: string): values.constants.Declaration {
    return new values.constants.Declaration(this, name);
  }

  public defineFunction(name: string, paramNames: string[])
    : values.constants.Func {
    assert.strictEqual(paramNames.length, this.params.length,
      'Invalid parameter count for `.defineFunc()`');
    return new values.constants.Func(this, name, paramNames);
  }
}
