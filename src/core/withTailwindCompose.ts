import cc from 'classcat';
import generateClassesArray from '@src/utils/generateClassesArray';
import type { Classes, Props } from '@types';

export default function withTailwindCompose<P = Props>(classes: Classes<P>, props?: P) {
  return cc(generateClassesArray(classes as Classes<Props>, props ?? {}));
}
