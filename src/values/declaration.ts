import { Signature, Type } from '../types';
import { Value } from './base';

export class Declaration extends Value {
  constructor(signature: Signature) {
    super(signature);
  }
}
