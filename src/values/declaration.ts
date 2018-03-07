import * as assert from 'assert';

import { AttributeList } from '../attribute-list';
import { CallingConv } from '../calling-conv';
import { Linkage } from '../linkage';
import { Signature } from '../types';
import { Value } from './base';

export class Declaration extends Value {
  public readonly returnAttrs: AttributeList = new AttributeList();
  public readonly attrs: AttributeList = new AttributeList();
  public linkage: Linkage = 'external';
  public cconv: CallingConv = 'ccc';

  private readonly paramAttrs: ReadonlyArray<AttributeList>;

  constructor(signature: Signature, public readonly name: string) {
    super(signature);

    this.paramAttrs = signature.params.map(() => new AttributeList());
  }

  public getParamAttrList(index: number): AttributeList {
    assert(0 <= index && index <= this.paramAttrs.length,
      `Out of bounds parameter index ${index}`);
    return this.paramAttrs[index];
  }
}
