import * as assert from 'assert';

import { Signature } from '../../types';
import { validateName } from '../../utils';
import { Argument, BasicBlock } from '../../values';
import { Declaration } from './declaration';
import { Metadata } from './metadata';

// TODO(indutny): `.verify()` method
export class Func extends Declaration {
  public readonly args: ReadonlyArray<Argument>;
  public readonly body: BasicBlock = this.createBlock();
  public readonly metadata: Map<string, Metadata> = new Map();

  private readonly paramMap: Map<string, number> = new Map();
  private blockList: ReadonlyArray<BasicBlock> | undefined = undefined;

  constructor(signature: Signature, name: string,
              private readonly paramNames: ReadonlyArray<string>) {
    super(signature, name);
    assert.strictEqual(paramNames.length, signature.params.length,
      'Invalid number of parameter names, doesn\'t match signature');

    paramNames.forEach((paramName, i) => {
      if (this.paramMap.has(paramName)) {
        throw new Error(`Duplicate parameter name: "${paramName}"`);
      }

      assert(validateName(paramName),
        `Invalid characters in parameter name: "${paramName}"`);
      this.paramMap.set(paramName, i);
    });

    this.args = signature.params.map((param, i) => {
      return new Argument(param, i, this.paramNames[i]);
    });
  }

  public toString(): string {
    return `[function name=${this.name}]`;
  }

  public createBlock(name?: string) {
    return new BasicBlock(this, name);
  }

  public getArgument(name: string): Argument {
    assert(this.paramMap.has(name), `Unknown parameter name: "${name}"`);

    const index = this.paramMap.get(name)!;
    return this.args[index];
  }

  public *[Symbol.iterator](): Iterator<BasicBlock> {
    if (this.blockList !== undefined) {
      yield* this.blockList;
      return;
    }

    const visited = new Set();
    const queue = [ this.body ];
    let canCache = true;

    const list = [];
    while (queue.length !== 0) {
      const bb = queue.pop() as BasicBlock;
      if (visited.has(bb)) {
        continue;
      }
      visited.add(bb);

      if (!bb.isTerminated()) {
        canCache = false;
      }
      list.push(bb);
      yield bb;

      // Push successors in reverse order, so that we'll pop the first on
      // next iteration
      for (let i = bb.successors.length - 1; i >= 0; i--) {
        queue.push(bb.successors[i]!);
      }
    }

    if (canCache) {
      this.blockList = list;
    }
  }
}
