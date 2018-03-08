import * as assert from 'assert';

import { AttributeList } from '../attribute-list';
import { Linkage } from '../linkage';
import { Type } from '../types';
import { Value } from './base';

export class Global extends Value {
  public attrs: AttributeList = new AttributeList();
  public linkage: Linkage = 'external';

  constructor(ty: Type, public readonly name: string,
              public readonly init?: Value) {
    super(ty);
    assert(ty.isPointer(), 'Can\'t declare global with non-pointer type');
    if (init !== undefined) {
      assert(init.ty.isEqual(ty.toPointer().to),
        'Incompatible type of initialization value for global variable');
    }
  }
}
