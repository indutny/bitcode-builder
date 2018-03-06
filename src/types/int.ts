import { Type } from './base';

export class Int extends Type {
  constructor(public readonly width: number) {
    super('i' + width);
  }
}
