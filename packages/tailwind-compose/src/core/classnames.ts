import { cc } from '@src/utilities/combine-classes';
import { generateClassesArray } from '@src/utilities/generate-classes-array';
import type { ComposerFn, Props } from '@types';

export function classnames<P extends Props>(classes: ComposerFn<P>) {
  return (props: P = {} as P) => {
    return cc(generateClassesArray<P>(classes)(props));
  };
}
