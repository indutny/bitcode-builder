import * as types from '../../types';
import { Constant } from './base';

export type MetadataValue = ReadonlyArray<string | Constant>;

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

    const toMetadata = to as Metadata;
    if (toMetadata.value.length !== this.value.length) {
      return false;
    }

    return toMetadata.value.every((v, i) => {
      const our = this.value[i];
      if (typeof v === 'string') {
        return v === our;
      } else if (v instanceof Constant) {
        return our instanceof Constant && v.isEqual(our);
      } else {
        throw new Error('Unexpected value type!');
      }
    });
  }
}
