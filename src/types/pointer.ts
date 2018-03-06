import { Type } from './base';

export class Pointer extends Type {
  constructor(public readonly to: Type) {
    super(to.typeString + '*');
  }
}
