import * as assert from 'assert';

import * as values from '../';
import { Instruction } from './base';
import { getAggrFieldType } from './common';

// TODO(indutny): support more indices?
export class InsertValue extends Instruction {
  constructor(public readonly aggr: values.Value,
              public readonly element: values.Value,
              public readonly index: number) {
    super(aggr.ty, 'insertvalue', [ aggr, element ]);

    const fieldType = getAggrFieldType(aggr.ty, index);
    if (element.ty.isSignature()) {
      assert(element.ty.isEqual(fieldType.toPointer().to),
        'element type doesn\'t match field type in `insertvalue`');
    } else {
      assert(element.ty.isEqual(fieldType),
        'element type doesn\'t match field type in `insertvalue`');
    }
  }
}
