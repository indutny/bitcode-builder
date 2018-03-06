import { Type } from './base';

export class Int extends Type {
  constructor(public readonly width: number) {
    super('i' + width);
  }

  public isEqual(to: Type): boolean {
    if (!to.isInt()) {
      return false;
    }

    const toInt = to as Int;
    return toInt.width === this.width;
  }
}
