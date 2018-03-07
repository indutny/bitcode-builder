import * as assert from 'assert';

import { AttributeList } from '../attribute-list';
import { Linkage } from '../linkage';
import { Signature } from '../types';
import { Value } from './base';

export type CallingConv =
  'ccc' | 'fastcc' | 'coldcc' | 'webkit_jscc' | 'anyregcc' | 'preserve_mostcc' |
  'preserve_allcc' | 'swiftcc' | 'cxx_fast_tlscc' | 'x86_stdcallcc' |
  'x86_fastcallcc' | 'arm_apcscc' | 'arm_aapcscc' | 'arm_aapcs_vfpcc';

export class Declaration extends Value {
  public readonly returnAttrs: AttributeList = new AttributeList();
  public readonly attrs: AttributeList = new AttributeList();
  public linkage: Linkage = 'external';
  public cconv: CallingConv = 'ccc';

  private readonly paramAttrs: AttributeList[];

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
