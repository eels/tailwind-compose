import type { ComposerFn, Condition, ConditionTarget, Tuple } from '@types';

export function conditional<P>(target: ConditionTarget, condition: Condition<P>) {
  return [target, condition] as Tuple<P>;
}

export function generateClassesArray<P>(composer: ComposerFn<P>) {
  return (props: P = {} as P) => {
    const classes = composer(conditional);
    const entries = classes.reduce<string[]>((collection, value) => {
      const isString = typeof value === 'string';
      const [target, condition] = !isString ? value : [value, () => true];
      const isTargetArray = Array.isArray(target);

      const computedValue = isTargetArray ? target : [target];
      const computedCondition = condition(props);

      return computedCondition ? collection.concat(computedValue) : collection;
    }, []);

    return entries;
  };
}
