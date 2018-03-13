import * as assert from 'assert';

import * as values from '../values';
import { Pass } from './base';

import constants = values.constants;
import instructions = values.instructions;

type LiveSet = Set<values.Value>;
type LiveMap = Map<values.BasicBlock, LiveSet>;

// Verify that all values are declared before their use
export class Verify extends Pass {
  private readonly globals: Set<values.Value> = new Set();

  public run(): void {
    // Add all possible global references
    for (const decl of this.input.declarations) {
      this.globals.add(decl);
    }

    for (const global of this.input.globals) {
      this.globals.add(global);
    }

    for (const fn of this.input.functions) {
      this.globals.add(fn);
    }

    // Calculate liveness map
    for (const fn of this.input.functions) {
      this.visitFunction(fn);
    }
  }

  private visitFunction(fn: constants.Func): void {
    // Create liveness sets
    const live: LiveMap = new Map();
    for (const bb of fn) {
      const liveSet: LiveSet = new Set();
      live.set(bb, liveSet);

      for (const i of bb) {
        if (!i.ty.isVoid()) {
          liveSet.add(i);
        }
      }

      for (const arg of fn.args) {
        liveSet.add(arg);
      }
    }

    // Propagate liveness through successors until stabilized
    let changed = true;
    while (changed) {
      changed = false;

      for (const bb of fn) {
        if (this.propagateBlockLiveness(live, bb)) {
          changed = true;
        }
      }
    }

    // Now that we know which values are alive in each block
    // Walk through instructions and check that every of them
    for (const bb of fn) {
      this.checkBlock(live, bb);
    }
  }

  private propagateBlockLiveness(live: LiveMap, bb: values.BasicBlock)
    : boolean {
    let changed = false;
    const liveSet = live.get(bb)!;
    for (const succ of bb.successors) {
      const liveSucc = live.get(succ)!;

      for (const value of liveSet) {
        let missing = false;

        // Propagate the value only if all predecessors has it
        // (If it's definition dominates)
        for (const pred of succ.predecessors) {
          if (pred === bb) {
            continue;
          }
          if (!live.get(pred)!.has(value)) {
            missing = true;
          }
        }

        if (missing) {
          continue;
        }

        if (!liveSucc.has(value)) {
          liveSucc.add(value);
          changed = true;
        }
      }
    }
    return changed;
  }

  private checkBlock(liveMap: LiveMap, bb: values.BasicBlock): void {
    const liveSet = liveMap.get(bb)!;
    for (const i of bb) {
      if (i instanceof instructions.Phi) {
        const preds = new Set(bb.predecessors);

        for (const edge of i.edges) {
          assert(
            preds.delete(edge.fromBlock),
            'Duplicate or unknown `fromBlock`: ' +
            `"${edge.fromBlock}" of phi in block "${bb}"`);

          const livePred = liveMap.get(edge.fromBlock)!;
          assert(
            livePred.has(edge.value),
            `Incoming value "${edge.value}" doesn't dominate phi "${i}"`);
        }

        assert.strictEqual(preds.size, 0,
          `phi "${i}" doesn't cover all predecessors of block "${bb}"`);
        continue;
      }

      for (const operand of i) {
        if (operand instanceof constants.Declaration) {
          assert(this.globals.has(operand),
            `Found reference to undeclared function: "${operand}"`);
        } else if (operand instanceof values.Global) {
          assert(this.globals.has(operand),
            `Found reference to undeclared global: "${operand}"`);
        } else if (operand instanceof instructions.Instruction) {
          assert(
            liveSet.has(operand),
            `Declaration of "${operand}" ` +
              `doesn't dominate it's use at "${i}"`);
        }
      }
    }
  }
}
