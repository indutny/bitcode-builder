import { Signature } from '../types';
import { Value } from './base';

export class Declaration extends Value {
  constructor(signature: Signature, public readonly name: string) {
    super(signature);
  }
}
