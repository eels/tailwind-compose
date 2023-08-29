import { cc } from '@src/utilities/combine-classes';
import { generateClassesArray } from '@src/utilities/generate-classes-array';
import type { ComposerFn, DefineConfigOptions, Props } from '@types';

export function classnames(config?: DefineConfigOptions) {
  return <P extends Props>(classes: ComposerFn<P>) => {
    return (props?: P) => cc(generateClassesArray<P>(classes)(props ?? <P>{}), config);
  };
}
