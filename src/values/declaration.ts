import { Signature, Type } from '../types';
import { Value } from './base';

export class Declaration extends Value {
  constructor(retTy: Type, params: Type[]) {
    super(new Signature(retTy, params));
  }
}
