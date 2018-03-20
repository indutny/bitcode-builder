import * as assert from 'assert';

import * as types from '../../types';
import { Constant } from './base';

export type MetadataValue = string | Constant | ReadonlyArray<Metadata>;

export class Metadata extends Constant {
  private privSelfReference: boolean = false;
  private privDistinct: boolean = false;

  constructor(public readonly value: MetadataValue) {
    super(new types.Metadata());
  }

  public get selfReference(): boolean { return this.privSelfReference; }
  public get distinct(): boolean { return this.privDistinct; }

  public addSelfReference(): this {
    assert(Array.isArray(this.value),
      'Can\'t add self-reference to non-tuple metadata');
    this.privSelfReference = true;
    return this;
  }

  public markDistinct(): this {
    assert(Array.isArray(this.value),
      'Can\'t have distinct non-tuple metadata');
    this.privDistinct = true;
    return this;
  }

  public isEqual(to: Constant): boolean {
    if (this === to) {
      return true;
    }

    if (!to.isMetadata()) {
      return false;
    }

    const toValue = (to as Metadata).value;
    if (typeof toValue === 'string') {
      return toValue === this.value;
    }

    if (toValue instanceof Constant) {
      return this.value instanceof Constant && toValue.isEqual(this.value);
    }

    // `toValue` is an Array
    if (!Array.isArray(this.value)) {
      return false;
    }

    if (toValue.length !== this.value.length) {
      return false;
    }

    return toValue.every((subValue, index) => {
      return subValue.isEqual((this.value as Metadata[])[index]);
    });
  }

  public toString(): string {
    // TODO(indutny): print more
    return '[metadata]';
  }
}
