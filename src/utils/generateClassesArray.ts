import type { ComposerFn, ConditionTuple } from '@types';

function conditional<P>(target: string, condition: (props: P) => boolean) {
  return [target, condition] as ConditionTuple<P>;
}

export default function generateClassesArray<P>(composer: ComposerFn<P>) {
  return (props: P = {} as P) => {
    const classes = composer(conditional);
    const entries = classes.reduce((collection, value) => {
      const isString = typeof value === 'string';
      const [target, condition] = !isString ? value : [value, () => false];

      const computedValue = isString ? value : target;
      const computedCondition = isString ? !!value : condition(props);

      return computedCondition ? [...collection, computedValue] : collection;
    }, [] as string[]);

    return entries;
  };
}
