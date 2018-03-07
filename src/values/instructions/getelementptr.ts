import * as assert from 'assert';

import * as values from '../';
import { Instruction } from './base';

// TODO(indutny): support `inrange`
export class GetElementPtr extends Instruction {
  constructor(public readonly ptr: values.Value,
              public readonly ptrIndex: values.Value,
              public readonly index: values.Value | null = null,
              public readonly inbounds: boolean = false) {
    super(
      index === null ? ptr.ty.toPointer() : ptr.ty.toPointer().to.ptr(),
      'getelementptr',
      index === null ? [ ptr, ptrIndex ] : [ ptr, ptrIndex, index ]);
  }
}
