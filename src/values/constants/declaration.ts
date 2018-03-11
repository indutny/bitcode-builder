import * as assert from 'assert';

import { AttributeList } from '../../attribute-list';
import { CallingConv } from '../../calling-conv';
import { Linkage } from '../../linkage';
import { Signature } from '../../types';
import { validateName } from '../../utils';
import * as constants from './';

export class Declaration extends constants.Constant {
  public readonly returnAttrs: AttributeList = new AttributeList();
  public readonly attrs: AttributeList = new AttributeList();
  public linkage: Linkage = 'external';
  public cconv: CallingConv = 'ccc';
  public readonly paramAttrs: ReadonlyArray<AttributeList>;

  constructor(signature: Signature, public readonly name: string) {
    super(signature);

    assert(validateName(name),
      `Invalid characters in function name: "${name}"`);
    this.paramAttrs = signature.params.map(() => new AttributeList());
  }

  public isEqual(to: constants.Constant): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isDeclaration()) {
      return false;
    }

    // TODO(indutny): verify cconv, linkage, paramAttrs, etc
    return to.ty.isEqual(this.ty);
  }

  public ref(): constants.Reference {
    return new constants.Reference(this);
  }
}
