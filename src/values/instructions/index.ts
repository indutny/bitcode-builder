import { Instruction } from './base';
import { Binop, BinopType } from './binop';
import { Branch } from './branch';
import { Cast, CastType } from './cast';
import { GetElementPtr } from './getelementptr';
import { ICmp, ICmpPredicate } from './icmp';
import { Jump } from './jump';
import { Load } from './load';
import { Phi } from './phi';
import { Ret } from './ret';
import { Store } from './store';
import { ISwitchCase, Switch } from './switch';

export {
  Binop, BinopType, Branch, Cast, CastType, GetElementPtr,
  ICmp, ICmpPredicate, Instruction,
  ISwitchCase, Jump, Load, Phi, Ret, Store, Switch,
};
