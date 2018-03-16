import * as values from '../values';

export interface IPassInput {
  readonly declarations: values.constants.Declaration[];
  readonly functions: values.constants.Func[];
  readonly globals: values.Global[];
}

export abstract class Pass {
  constructor(protected readonly input: IPassInput) {
  }

  public abstract run(): void;
}
