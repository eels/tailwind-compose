import cc from '@src/utils/combine-classes';
import generateClassesArray from '@src/utils/generate-classes-array';
import type { ComposerFn, Props } from '@types';

export function classnames<P extends Props>(classes: ComposerFn<P>) {
  return (props: P = {} as P) => {
    return cc(generateClassesArray<P>(classes)(props));
  };
}
