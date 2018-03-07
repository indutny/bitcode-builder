import { Signature } from '../types';
import { BasicBlock } from './basic-block';
import { Declaration } from './declaration';

export class Func extends Declaration {
  public readonly body: BasicBlock = this.createBlock();

  constructor(signature: Signature, name: string,
              public readonly paramNames: string[]) {
    super(signature, name);
  }

  public createBlock(name: string | null = null) {
    return new BasicBlock(this, name);
  }
}
