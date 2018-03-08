import * as assert from 'assert';
import * as values from '../../values';

import { Type } from '../base';
import { Field } from './field';

export class Struct extends Type {
  private readonly privFields: Field[] = [];
  private fieldMap: Map<string, Field> = new Map();
  private finalized: boolean = false;

  constructor(public readonly name?: string) {
    super('struct');
  }

  public get typeString(): string {
    // Named struct
    if (this.name !== undefined) {
      this.checkFinalized();
      return `%${this.name}`;
    }

    return this.anonymousTypeString;
  }

  public get anonymousTypeString(): string {
    this.checkFinalized();

    // Anonymous struct
    return '{ ' + this.fields.map((f) => f.ty.typeString).join(', ') + ' }';
  }

  public get fields(): ReadonlyArray<Field> { return this.privFields; }

  public isEqual(to: Type): boolean {
    this.checkFinalized();
    if (this === to) {
      return true;
    }

    if (!to.isStruct()) {
      return false;
    }

    const toStruct = to as Struct;
    toStruct.checkFinalized();
    return toStruct.fields.length === this.fields.length &&
      toStruct.fields.every((field, i) => field.ty.isEqual(this.fields[i].ty));
  }

  public val(map: { [key: string]: values.constants.Constant })
    : values.constants.Struct {
    this.checkFinalized();

    const keys = Object.keys(map);
    assert.strictEqual(keys.length, this.fields.length,
      'Invalid key count in `map` argument of `.val()`');

    const fields = new Array(this.fields.length);
    keys.forEach((key) => {
      const field = this.lookupField(key);
      assert(field.ty.isEqual(map[key].ty),
        `Type mismatch for "${key}" field value`);

      fields[field.index] = map[key];
    });

    return new values.constants.Struct(this, fields);
  }

  public finalize(): void {
    assert(!this.finalized, 'Double finalization');
    this.finalized = true;
  }

  public addField(ty: Type, name: string): Field {
    assert(!this.finalized, 'Can\'t add fields after `.finalize()` call');
    if (this.fieldMap.has(name)) {
      const existing = this.fieldMap.get(name)!;
      assert(existing.ty.isEqual(ty), 'Conflicting field types for: ' + name);
      return existing;
    }

    const add = new Field(ty, name, this.privFields.length);
    this.privFields.push(add);
    this.fieldMap.set(name, add);
    return add;
  }

  public hasField(name: string): boolean {
    return this.fieldMap.has(name);
  }

  public lookupField(name: string): Field {
    assert(this.hasField(name), `Field "${name}" is unknown`);
    return this.fieldMap.get(name)!;
  }

  public getField(index: number): Field {
    assert(0 <= index && index < this.fields.length, 'Invalid field index');
    return this.fields[index];
  }

  protected checkFinalized(): void {
    assert(this.finalized,
      'Please call `.finalize()` on the Struct instance first');
  }
}

export { Field };
