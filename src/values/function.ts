import { Signature } from '../types';
import { BasicBlock } from './basic-block';
import { Declaration } from './declaration';

export class Func extends Declaration {
  public readonly body: BasicBlock = new BasicBlock(this);

  constructor(signature: Signature, name: string,
              public readonly paramNames: string[]) {
    super(signature, name);
  }
}
