import type { Classes, Props } from '@types';

export default function generateClassesArray(classes: Classes, props: Props): (string | false)[] {
  return classes.reduce((array, name) => {
    if (typeof name === 'string') {
      return [...array, name];
    }

    const computed = name(props);
    const isBooleanOrString = typeof computed === 'string' || typeof computed === 'boolean';

    if (isBooleanOrString) {
      return [...array, computed];
    }

    return [...array, ...generateClassesArray(computed, props)];
  }, [] as (string | false)[]);
}
