import * as types from '../../types';
import { Constant } from './base';

export class Int extends Constant {
  constructor(ty: types.Int, public readonly value: number) {
    super(ty);
  }
}
