import { BasicBlock } from './basic-block';
import { Declaration } from './declaration';

export class Func extends Declaration {
  public readonly body: BasicBlock = new BasicBlock(this);
}
