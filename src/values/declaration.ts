import { AttributeList } from '../attribute-list';
import { Signature } from '../types';
import { Value } from './base';

export class Declaration extends Value {
  public readonly returnAttrs: AttributeList = new AttributeList();
  public readonly paramAttrs: AttributeList[];
  public readonly attrs: AttributeList = new AttributeList();

  constructor(signature: Signature, public readonly name: string) {
    super(signature);

    this.paramAttrs = signature.params.map(() => new AttributeList());
  }
}
