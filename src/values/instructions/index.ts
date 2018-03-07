import { Instruction } from './base';
import { Binop, BinopType } from './binop';
import { Branch } from './branch';
import { Cast, CastType } from './cast';
import { ICmp, ICmpPredicate } from './icmp';
import { Jump } from './jump';
import { Phi } from './phi';
import { Ret } from './ret';

export {
  Binop, BinopType, Branch, Cast, CastType, ICmp, ICmpPredicate, Jump,
  Instruction, Phi, Ret,
};
