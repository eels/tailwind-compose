import cc from 'classcat';
import generateClassesArray from '@src/utils/generateClassesArray';
import type { ComposerFn, Props } from '@types';

export function classnames<P extends Props>(classes: ComposerFn<P>) {
  return (props: P = {} as P) => {
    return cc(generateClassesArray<P>(classes)(props));
  };
}
