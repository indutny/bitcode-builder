import { Type } from '../types';
import { Value } from './base';

export class Argument extends Value {
  constructor(ty: Type, public readonly index: number,
              public readonly name: string) {
    super(ty);
  }

  public toString(): string {
    return `[argument index=${this.index} name=${this.name}]`;
  }
}
