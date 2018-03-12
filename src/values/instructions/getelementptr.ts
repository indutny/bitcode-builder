import * as assert from 'assert';

import * as values from '../';
import { Instruction } from './base';
import { getAggrFieldType } from './common';

function getElementPtrType(value: values.Value, index?: values.Value) {
  const ptr = value.ty.toPointer();

  if (index === undefined) {
    return ptr;
  }

  if (ptr.to.isArray() && !index.isConstant()) {
    return ptr.to.toArray().elemType.ptr();
  }

  const indexConst = index.toConstant();
  assert(indexConst.isInt(),
    'Expected integer constant offset for `getelementptr`');
  return getAggrFieldType(ptr.to, indexConst.toInt().value).ptr();
}

// TODO(indutny): support `inrange`
// TODO(indutny): support more indices?
export class GetElementPtr extends Instruction {
  constructor(public readonly ptr: values.Value,
              public readonly ptrIndex: values.Value,
              public readonly index?: values.Value,
              public readonly inbounds: boolean = false) {
    super(
      getElementPtrType(ptr, index),
      'getelementptr',
      index === undefined ? [ ptr, ptrIndex ] : [ ptr, ptrIndex, index ]);
  }
}
