import { Instruction } from './base';
import { Binop, BinopType } from './binop';
import { Branch } from './branch';
import { Call, CallType } from './call';
import { Cast, CastType } from './cast';
import { ExtractValue } from './extractvalue';
import { GetElementPtr } from './getelementptr';
import { ICmp, ICmpPredicate } from './icmp';
import { InsertValue } from './insertvalue';
import { Jump } from './jump';
import { Load } from './load';
import { IPhiEdge, Phi } from './phi';
import { Ret } from './ret';
import { Store } from './store';
import { ISwitchCase, Switch } from './switch';

export {
  Binop, BinopType, Branch, Call, CallType, Cast, CastType, ExtractValue,
  GetElementPtr, ICmp, ICmpPredicate, InsertValue, Instruction, IPhiEdge,
  ISwitchCase, Jump, Load, Phi, Ret, Store, Switch,
};
