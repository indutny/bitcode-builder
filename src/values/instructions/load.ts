import * as assert from 'assert';

import * as values from '../';
import { Instruction } from './base';
import { checkAlignment } from './common';

// TODO(indutny): separate instruction for atomic load?
export class Load extends Instruction {
  constructor(public readonly ptr: values.Value,
              public readonly alignment?: number,
              public readonly isVolatile: boolean = false) {
    super(ptr.ty.toPointer().to, 'load', [ ptr ]);

    if (alignment !== undefined) {
      checkAlignment(alignment);
    }
  }
}
