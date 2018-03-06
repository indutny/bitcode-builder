import { Func as TyFunc } from '../types';
import { Value } from './base';

export class Func extends Value {
  constructor(ty: TyFunc) {
    super(ty);
  }
}
