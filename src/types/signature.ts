import { Type } from './base';

export class Signature extends Type {
  constructor(public readonly ret: Type, public readonly params: Type[]) {
    super(`${ret.typeString} (${params.map((p) => p.typeString).join(', ')})`);
  }
}
