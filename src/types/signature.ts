import * as assert from 'assert';

import * as values from '../values';
import { Type } from './base';

export class Signature extends Type {
  constructor(public readonly returnType: Type,
              private readonly params: Type[]) {
    super(`${returnType.typeString} ` +
      `(${params.map((p) => p.typeString).join(', ')})`);
  }

  public get paramCount(): number { return this.params.length; }
  public getParam(index: number): Type { return this.params[index]; }

  public isEqual(to: Type): boolean {
    if (!to.isSignature()) {
      return false;
    }

    const toSig = to as Signature;

    return toSig.returnType.isEqual(this.returnType) &&
      toSig.params.length === this.params.length &&
      toSig.params.every((param, i) => param.isEqual(this.params[i]));
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
