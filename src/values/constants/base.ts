import * as assert from 'assert';

import { Value } from '../base';
import * as constants from './';

export abstract class Constant extends Value {
  public abstract isEqual(to: Constant): boolean;

  public isInt(): boolean {
    return this instanceof constants.Int;
  }

  public isArray(): boolean {
    return this instanceof constants.Array;
  }

  public isStruct(): boolean {
    return this instanceof constants.Struct;
  }

  public isNull(): boolean {
    return this instanceof constants.Null;
  }

  public isUndef(): boolean {
    return this instanceof constants.Undef;
  }

  public toInt(): constants.Int {
    assert(this.isInt(), 'Constant is not an Int instance');
    return this as any;
  }

  public toArray(): constants.Array<Constant> {
    assert(this.isArray(), 'Constant is not an Array instance');
    return this as any;
  }

  public toStruct(): constants.Struct {
    assert(this.isStruct(), 'Constant is not a Struct instance');
    return this as any;
  }

  public toNull(): constants.Null {
    assert(this.isNull(), 'Constant is not a Null instance');
    return this as any;
  }

  public toUndef(): constants.Undef {
    assert(this.isUndef(), 'Constant is not a Undef instance');
    return this as any;
  }
}
