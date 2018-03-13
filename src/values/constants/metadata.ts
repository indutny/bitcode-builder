import * as types from '../../types';
import { Constant } from './base';

export type MetadataValue = string | Constant | ReadonlyArray<Metadata>;

export class Metadata extends Constant {
  constructor(public readonly value: MetadataValue) {
    super(new types.Metadata());
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
