import { Type } from '../base';

export class Field {
  constructor(public readonly ty: Type, public readonly name: string,
              public readonly index: number) {
  }
}
