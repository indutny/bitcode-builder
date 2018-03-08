import * as assert from 'assert';

import * as values from '../';
import { CallingConv } from '../../calling-conv';
import { Instruction } from './base';

export type CallType = 'normal' | 'tail' | 'musttail' | 'notail';

function getCallType(callee: values.Value) {
  const ty = callee.ty;

  // Calling function or declaration
  if (ty.isSignature()) {
    return ty.toSignature().returnType;
  }

  // A pointer to function or declaration (indirect call)
  const pointee = ty.toPointer().to.toSignature();
  return pointee.returnType;
}

// TODO(indutny): vararg, optimizations, ret attributes
export class Call extends Instruction {
  constructor(public readonly callee: values.Value,
              public readonly args: ReadonlyArray<values.Value>,
              public readonly callType: CallType = 'normal',
              public readonly cconv: CallingConv = 'ccc') {
    super(getCallType(callee), 'call', [ callee ].concat(args));

    if (!callee.isConst()) {
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
