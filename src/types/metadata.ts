import * as values from '../values';
import { Type } from './base';

export class Metadata extends Type {
  constructor() {
    super('metadata');
  }

  public ptr(): never { throw new Error('Can\'t create pointer to metadata'); }

  public isEqual(to: Type): boolean {
    return this === to || to.isMetadata();
  }

  public val(value: values.constants.MetadataValue): values.constants.Metadata {
    return new values.constants.Metadata(value);
  }
}
