import * as values from '../values';
import { Type } from './base';

export class Int extends Type {
  constructor(public readonly width: number) {
    super('i' + width);
  }

  public isEqual(to: Type): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isInt()) {
      return false;
    }

    return to.width === this.width;
  }

  public val(num: number): values.constants.Int {
    return new values.constants.Int(this, num);
  }
}
