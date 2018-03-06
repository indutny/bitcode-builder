import * as types from './types';

export class Bitcode {
  constructor(public sourceName: string | null = null) {
  }

  public void(): types.Void {
    return new types.Void();
  }

  public i(width: number): types.Int {
    return new types.Int(width);
  }

  public signature(ret: types.Type, params: types.Type[]): types.Signature {
    return new types.Signature(ret, params);
  }
}
