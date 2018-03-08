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

    return to.returnType.isEqual(this.returnType) &&
      to.params.length === this.params.length &&
      to.params.every((param, i) => param.isEqual(this.params[i]));
  }

  public declareFunction(name: string): values.Declaration {
    return new values.Declaration(this, name);
  }

  public defineFunction(name: string, paramNames: string[]): values.Func {
    assert.strictEqual(paramNames.length, this.params.length,
      'Invalid parameter count for `.defineFunc()`');
    return new values.Func(this, name, paramNames);
  }
}
