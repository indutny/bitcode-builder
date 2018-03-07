import * as assert from 'assert';

import * as values from '../';
import { Void } from '../../types';
import { Instruction } from './base';

// TODO(indutny): separate instruction for atomic store?
export class Store extends Instruction {
  constructor(public readonly value: values.Value,
              public readonly ptr: values.Value,
              public readonly alignment: number | null = null,
              public readonly isVolatile: boolean = false) {
    super(new Void(), 'store', [ value, ptr ]);
  }
}
