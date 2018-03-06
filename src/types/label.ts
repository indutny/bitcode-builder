import { Type } from './base';

export class Label extends Type {
  constructor() {
    super('label');
  }

  public isEqual(to: Type): boolean {
    return true;
  }
}
