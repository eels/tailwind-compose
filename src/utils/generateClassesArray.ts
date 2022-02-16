import type { Classes } from '@types';

export default function generateClassesArray(classes: Classes, props: Record<string, any>) {
  return classes.map((name) => (typeof name === 'string' ? name : name(props)));
}
