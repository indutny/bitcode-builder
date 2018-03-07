import { Value } from './values';

export class Metadata {
  constructor(public readonly value: ReadonlyArray<string | Value | Metadata>) {
  }
}
