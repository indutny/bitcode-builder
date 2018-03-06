import * as assert from 'assert';

import { Type } from './base';

export class Array extends Type {
  constructor(public readonly length: number, public readonly elemType: Type) {
    super(`[${length} x ${elemType.typeString}]`);

    assert(!elemType.isVoid(), 'Can\'t create Array of Void');
  }
}
