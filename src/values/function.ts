import { Function as TyFunction } from '../types';
import { Value } from './base';

export class Function extends Value {
  constructor(type: TyFunction) {
    super(type);
  }
}
