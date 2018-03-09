import * as assert from 'assert';

import * as values from '../';
import { CallingConv } from '../../calling-conv';
import { Signature } from '../../types';
import { Instruction } from './base';

export type CallType = 'normal' | 'tail' | 'musttail' | 'notail';

function getCalleeType(callee: values.Value): Signature {
  const ty = callee.ty;

  // Calling function or declaration
  if (ty.isSignature()) {
    return ty.toSignature();
  }

  // A pointer to function or declaration (indirect call)
  return ty.toPointer().to.toSignature();
}

// TODO(indutny): vararg, optimizations, ret attributes
export class Call extends Instruction {
  public readonly calleeSignature: Signature;

  constructor(public readonly callee: values.Value,
              public readonly args: ReadonlyArray<values.Value>,
              public readonly callType: CallType = 'normal',
              public readonly cconv: CallingConv = 'ccc') {
    super(getCalleeType(callee).returnType, 'call', [ callee ].concat(args));

    // TODO(indutny): de-duplicate it
    this.calleeSignature = getCalleeType(callee);
    if (!callee.isConstant()) {
      return;
    }

    const constCallee = callee as values.constants.Constant;
    if (constCallee.isDeclaration()) {
      const calleeFn = constCallee as values.constants.Declaration;
      assert.strictEqual(this.cconv, calleeFn.cconv,
        'Calling convention mismatch');
    }
  }
}
