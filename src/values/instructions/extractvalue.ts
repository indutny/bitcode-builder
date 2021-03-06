import * as values from '../';
import { Instruction } from './base';
import { getAggrFieldType } from './common';

// TODO(indutny): support more indices?
export class ExtractValue extends Instruction {
  constructor(public readonly aggr: values.Value,
              public readonly index: number) {
    super(getAggrFieldType(aggr.ty, index), 'extractvalue', [ aggr ]);
  }
}
