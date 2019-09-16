import * as values from '../values';
import { Type } from './base';

export class Int extends Type {
  constructor(public readonly width: number, public readonly signed: boolean = false) {
    super('i' + width);
  }

  public isEqual(to: Type): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isInt()) {
      return false;
    }

    const toInt = to as Int;
    return toInt.width === this.width && toInt.signed === this.signed;
  }

  public val(num: number): values.constants.Int {
    return new values.constants.Int(this, num);
  }
}
