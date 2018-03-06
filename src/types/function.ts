import { Type } from './base';

export class Func extends Type {
  constructor(public readonly ret: Type, public readonly params: Type[]) {
    super();
  }
}
