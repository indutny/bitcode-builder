import * as values from '../';
import { Instruction } from './base';
import { getAggrFieldType } from './common';

function getElementPtrType(value: values.Value,
                           index: values.constants.Constant | null) {
  const ptr = value.ty.toPointer();

  if (index === null) {
    return ptr.to;
  }

  return getAggrFieldType(ptr.to, index);
}

// TODO(indutny): support `inrange`
// TODO(indutny): support more indices?
export class GetElementPtr extends Instruction {
  constructor(public readonly ptr: values.Value,
              public readonly ptrIndex: values.Value,
              public readonly index: values.constants.Constant | null = null,
              public readonly inbounds: boolean = false) {
    super(
      getElementPtrType(ptr, index),
      'getelementptr',
      index === null ? [ ptr, ptrIndex ] : [ ptr, ptrIndex, index ]);
  }
}
