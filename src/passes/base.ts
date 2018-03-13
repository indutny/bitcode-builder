import * as values from '../values';

export interface IPassInput {
  declarations: values.constants.Declaration[];
  functions: values.constants.Func[];
  globals: values.Global[];
}

export abstract class Pass {
  constructor(protected readonly input: IPassInput) {
  }

  public abstract run(): void;
}
