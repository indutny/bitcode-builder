import * as assert from 'assert';

// TODO(indutny): allocsize
export type Attribute =
  {
    key: 'align' | 'alignstack' | 'dereferenceable' | 'dereferenceable_or_null',
    value: number,
  } |
  {
    key: string,
    value: string,
  } |
  'alwaysinline' | 'byval' | 'inlinehint' | 'inreg' | 'minsize' | 'naked' |
  'nest' | 'noalias' | 'nobuiltin' | 'nocapture' | 'noduplicates' |
  'noimplictfloat' | 'noinline' | 'nonlazybind' | 'noredzone' | 'noreturn' |
  'nounwind' | 'optsize' | 'readnone' | 'readonly' | 'returned' |
  'returns_twice' | 'signext' | 'ssp' | 'sspreq' | 'sspstrong' | 'sret' |
  'sanitize_address' | 'sanitize_thread' | 'sanitize_memory' | 'uwtable' |
  'zeroext' | 'builtin' | 'cold' | 'optnone' | 'inalloca' | 'nonnull' |
  'jumptable' | 'convergent' | 'safestack' | 'argmemonly' | 'swiftself' |
  'swifterror' | 'norecurse' | 'inaccessiblememonly' |
  'inaccessiblememonly_or_argmemonly' | 'writeonly' | 'speculatable' |
  'strictfp' | 'sanitize_hwaddress' |
  string;

export class AttributeList {
  private list: Attribute[] = [];

  public add(attr: Attribute | ReadonlyArray<Attribute>): boolean {
    if (Array.isArray(attr)) {
      let changed = false;
      attr.forEach((sub) => {
        if (this.add(sub)) {
          changed = true;
        }
      });
      return changed;
    }

    // XXX(indutny): `Array.isArray` above doesn't work as a type guard
    const single: Attribute = attr as Attribute;

    if (typeof single === 'string') {
      if (this.list.includes(single)) {
        return false;
      }

    } else {
      const found = this.list.some((entry) => {
        if (typeof entry === 'string') {
          return false;
        }
        if (entry.key !== single.key) {
          return false;
        }

        assert.strictEqual(entry.value, single.value,
          `Conflicting attribute value for "${entry.key}"`);
        return true;
      });

      if (found) {
        return false;
      }
    }

    this.list.push(single);
    return true;
  }

  public delete(attr: Attribute | ReadonlyArray<Attribute>): boolean {
    if (Array.isArray(attr)) {
      let changed = false;
      attr.forEach((sub) => {
        if (this.delete(sub)) {
          changed = true;
        }
      });
      return changed;
    }

    const single = attr as Attribute;
    if (typeof single === 'string') {
      const index = this.list.indexOf(single);
      if (index === -1) {
        return false;
      }
      this.list.splice(index, 1);
      return true;
    }

    let foundAt: number | boolean = false;
    this.list.some((entry, i) => {
      if (typeof entry === 'string') {
        return false;
      }
      if (entry.key !== single.key) {
        return false;
      }
      if (entry.value !== single.value) {
        return false;
      }

      foundAt = i;
      return true;
    });

    if (foundAt === false) {
      return false;
    }

    this.list.splice(foundAt, 1);
    return true;
  }

  public *[Symbol.iterator](): Iterator<Attribute> {
    yield* this.list;
  }
}
