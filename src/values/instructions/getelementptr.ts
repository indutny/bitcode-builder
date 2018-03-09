import * as assert from 'assert';

import * as values from '../';
import { Instruction } from './base';
import { getAggrFieldType } from './common';

function getElementPtrType(value: values.Value,
                           index?: values.constants.Constant) {
  const ptr = value.ty.toPointer();

  if (index === undefined) {
    return ptr;
  }

  assert(index.isInt(), 'Expected integer constant offset for `extractvalue`');
  return getAggrFieldType(ptr.to, index.toInt().value).ptr();
}

// TODO(indutny): support `inrange`
// TODO(indutny): support more indices?
export class GetElementPtr extends Instruction {
  constructor(public readonly ptr: values.Value,
              public readonly ptrIndex: values.Value,
              public readonly index?: values.constants.Constant,
              public readonly inbounds: boolean = false) {
    super(
      getElementPtrType(ptr, index),
      'getelementptr',
      index === undefined ? [ ptr, ptrIndex ] : [ ptr, ptrIndex, index ]);
  }
}
