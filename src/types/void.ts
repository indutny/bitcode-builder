import { Type } from './base';

export class Void extends Type {
  constructor() {
    super('void');
  }

  public ptr(): never { throw new Error('Can\'t create pointer to void'); }
}
