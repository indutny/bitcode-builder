import * as assert from 'assert';

import * as values from '../values';
import { Pass } from './base';

import constants = values.constants;
import instructions = values.instructions;
import BasicBlock = values.BasicBlock;
import Func = constants.Func;

type ReachableSet = Set<BasicBlock>;
type ReachableMap = Map<BasicBlock, ReachableSet>;

type LiveSet = Set<values.Value>;
type LiveMap = Map<BasicBlock, LiveSet>;

// Verify that all values are declared before their use
export class Verify extends Pass {
  private readonly globals: Map<string, values.Value> = new Map();

  public run(): void {
    // Add all possible global references
    for (const decl of this.input.declarations) {
      if (this.globals.has(decl.name)) {
        assert(decl.ty.isEqual(this.globals.get(decl.name)!.ty),
          `Conflicting type for declaration with name: "${decl.name}"`);
        continue;
      }
      this.globals.set(decl.name, decl);
    }

    for (const global of this.input.globals) {
      if (this.globals.has(global.name)) {
        assert(global.ty.isEqual(this.globals.get(global.name)!.ty),
          `Conflicting type for global with name: "${global.name}"`);
        continue;
      }
      this.globals.set(global.name, global);
    }

    for (const fn of this.input.functions) {
      if (this.globals.has(fn.name)) {
        assert(fn.ty.isEqual(this.globals.get(fn.name)!.ty),
          `Conflicting type for function with name: "${fn.name}"`);
        continue;
      }
      this.globals.set(fn.name, fn);
    }

    // Calculate liveness map
    for (const fn of this.input.functions) {
      this.visitFunction(fn);
    }
  }

  private visitFunction(fn: Func): void {
    const reachable = this.computeReachable(fn);
    const live = this.computeLiveness(reachable, fn);

    // Now that we know which values are alive in each block
    // Walk through instructions and check that every of them
    for (const bb of fn) {
      this.checkBlock(live, bb);
    }
  }

  // Private API

  private computeReachable(fn: Func): ReachableMap {
    const reachable: ReachableMap = new Map();
    for (const bb of fn) {
      reachable.set(bb, new Set([ bb ]));
    }

    let changed = true;
    while (changed) {
      changed = false;

      for (const bb of fn) {
        if (this.propagateReachable(reachable, bb)) {
          changed = true;
        }
      }
    }

    return reachable;
  }

  private propagateReachable(reachable: ReachableMap, bb: BasicBlock): boolean {
    let changed = false;

    const reachSet = reachable.get(bb)!;
    for (const pred of bb.predecessors) {
      for (const predReach of reachable.get(pred)!) {
        if (!reachSet.has(predReach)) {
          reachSet.add(predReach);
          changed = true;
        }
      }
    }
    return changed;
  }

  private computeLiveness(reachable: ReachableMap, fn: Func): LiveMap {
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
    }

    // Propagate liveness through successors until stabilized
    let changed = true;
    while (changed) {
      changed = false;

      for (const bb of fn) {
        if (this.propagateBlockLiveness(live, reachable, bb)) {
          changed = true;
        }
      }
    }

    return live;
  }

  private propagateBlockLiveness(live: LiveMap, reachable: ReachableMap,
                                 bb: BasicBlock): boolean {
    let changed = false;
    const liveSet = live.get(bb)!;
    for (const succ of bb.successors) {
      const liveSucc = live.get(succ)!;

      const dominated = succ.predecessors.every((pred) => {
        return reachable.get(pred)!.has(bb);
      });

      for (const value of liveSet) {
        let missing = false;

        if (!dominated) {
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
        }

        if (!liveSucc.has(value)) {
          liveSucc.add(value);
          changed = true;
        }
      }
    }
    return changed;
  }

  private checkBlock(liveMap: LiveMap, bb: BasicBlock): void {
    const liveSet = liveMap.get(bb)!;
    for (const i of bb) {
      if (i instanceof instructions.Phi) {
        const preds = new Set(bb.predecessors);

        for (const edge of i.edges) {
          assert(
            preds.delete(edge.fromBlock),
            'Duplicate or unknown `fromBlock`: ' +
            `"${edge.fromBlock}" of phi in block "${bb}"`);

          // We're interested only in instructions
          if (!(edge.value instanceof instructions.Instruction)) {
            continue;
          }

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
          assert(this.globals.has(operand.name),
            `Found reference to undeclared function: "${operand}"`);
          assert(this.globals.get(operand.name)!.ty.isEqual(operand.ty),
            `Found conflicting reference to function: "${operand}"`);

        } else if (operand instanceof values.Global) {
          assert(this.globals.has(operand.name),
            `Found reference to undeclared global: "${operand}"`);
          assert(this.globals.get(operand.name)!.ty.isEqual(operand.ty),
            `Found conflicting reference to global: "${operand}"`);

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
