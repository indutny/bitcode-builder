import * as assert from 'assert';

import * as values from '../';
import { Type } from '../../types';

export function getAggrFieldType(aggrTy: Type,
                                 index: values.constants.Constant): Type {
  assert(index.isInt(), 'Expected integer constant offset for `extractvalue`');
  const intIndex = index.toInt().value;

  if (aggrTy.isStruct()) {
    const field = aggrTy.toStruct().getField(intIndex);

    return field.ty;
  } else if (aggrTy.isArray()) {
    const arrayTy = aggrTy.toArray();
    assert(0 <= intIndex && intIndex < arrayTy.length,
      'OOB array index in `extractvalue`');

    return arrayTy.elemType;
  } else {
    throw new Error('Expected aggregate type, but got: ' + aggrTy.typeString);
  }
}
