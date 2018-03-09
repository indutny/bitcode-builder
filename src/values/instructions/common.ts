import * as assert from 'assert';

import * as values from '../';
import { Type } from '../../types';

export function getAggrFieldType(aggrTy: Type, index: number): Type {
  if (aggrTy.isStruct()) {
    const field = aggrTy.toStruct().getField(index);

    return field.ty;
  } else if (aggrTy.isArray()) {
    const arrayTy = aggrTy.toArray();
    assert(0 <= index && index < arrayTy.length,
      'OOB array index in `extractvalue`');

    return arrayTy.elemType;
  } else {
    throw new Error('Expected aggregate type, but got: ' + aggrTy.typeString);
  }
}

export function checkAlignment(alignment: number): void {
  assert(1 < alignment, 'Alignment must be greater than zero if present');
  assert.strictEqual(alignment, Math.pow(2, Math.floor(Math.log2(alignment))),
    'Alignment must be a power of two if present');
}
