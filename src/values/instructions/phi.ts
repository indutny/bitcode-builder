import * as assert from 'assert';

import * as values from '../';
import { Type } from '../../types';
import { Instruction } from './base';

export interface IPhiEdge {
  fromBlock: values.BasicBlock;
  value: values.Value;
}

export class Phi extends Instruction {
  constructor(edgeOrTy: IPhiEdge | Type) {
    super(edgeOrTy instanceof Type ? edgeOrTy : edgeOrTy.value.ty, 'phi', []);

    if (!(edgeOrTy instanceof Type)) {
      this.addEdge(edgeOrTy);
    }
  }

  public addEdge(edge: IPhiEdge) {
    assert(this.ty.isEqual(edge.value.ty), 'Type mismatch for Phi edge');

    this.operands.push(edge.fromBlock, edge.value);
  }
}
