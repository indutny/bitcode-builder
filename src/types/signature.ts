import { Type } from './base';

export class Signature extends Type {
  constructor(public readonly returnType: Type,
              public readonly params: Type[]) {
    super(`${returnType.typeString} ` +
      `(${params.map((p) => p.typeString).join(', ')})`);
  }

  public isEqual(to: Type): boolean {
    if (!to.isSignature()) {
      return false;
    }

    const toSig = to as Signature;

    return toSig.returnType.isEqual(this.returnType) &&
      toSig.params.length === this.params.length &&
      toSig.params.every((param, i) => param.isEqual(this.params[i]));
  }
}
