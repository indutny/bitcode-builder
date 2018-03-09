import * as assert from 'assert';
import { validateName } from '../utils';

import { AttributeList } from '../attribute-list';
import { Linkage } from '../linkage';
import { Type } from '../types';
import { Value } from './base';
import { Constant } from './constants';

export class Global extends Value {
  public attrs: AttributeList = new AttributeList();
  public linkage: Linkage = 'external';
  private privIsConstant: boolean = false;

  constructor(ty: Type, public readonly name: string,
              public readonly init?: Constant) {
    super(ty);
    assert(ty.isPointer(), 'Can\'t declare global with non-pointer type');
    assert(validateName(name), `Invalid characters in Global name: "${name}"`);
    if (init !== undefined) {
      assert(init.ty.isEqual(ty.toPointer().to),
        'Incompatible type of initialization value for global variable');
    }
  }

  public hasConstantValue(): boolean { return this.privIsConstant; }

  public markConstant(): void {
    assert(this.init !== undefined,
      'Can\'t mark global without init value as constant');

    this.privIsConstant = true;
  }
}
