import { Type } from '../types';

export abstract class Value {
  constructor(public readonly ty: Type) {
  }
}
