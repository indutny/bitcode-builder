import { AttributeList } from '../../attribute-list';
import { CallingConv } from '../../calling-conv';
import { Linkage } from '../../linkage';
import { Signature } from '../../types';
import { Constant } from './base';

export class Declaration extends Constant {
  public readonly returnAttrs: AttributeList = new AttributeList();
  public readonly attrs: AttributeList = new AttributeList();
  public linkage: Linkage = 'external';
  public cconv: CallingConv = 'ccc';
  public readonly paramAttrs: ReadonlyArray<AttributeList>;

  constructor(signature: Signature, public readonly name: string) {
    super(signature);

    this.paramAttrs = signature.params.map(() => new AttributeList());
  }

  public isEqual(to: Constant): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isDeclaration()) {
      return false;
    }

    // TODO(indutny): verify cconv, linkage, paramAttrs, etc
    return to.ty.isEqual(this.ty);
  }
}
