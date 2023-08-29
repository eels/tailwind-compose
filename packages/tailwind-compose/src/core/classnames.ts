import { cc } from '@src/utilities/combine-classes';
import { generateClassesArray } from '@src/utilities/generate-classes-array';
import type { ComposerFn, Props } from '@types';

export function classnames<P extends Props>(classes: ComposerFn<P>) {
  return (props?: P) => cc(generateClassesArray<P>(classes)(props ?? <P>{}));
}
