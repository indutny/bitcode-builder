import { Type } from '../types';
import { Value } from './base';

export class Argument extends Value {
  constructor(ty: Type, public readonly index: number) {
    super(ty);
  }
}
