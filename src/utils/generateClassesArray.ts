import type { ComposerFn, Condition, ConditionTarget, Tuple } from '@types';

function conditional<P>(target: ConditionTarget, condition: Condition<P>) {
  return [target, condition] as Tuple<P>;
}

export default function generateClassesArray<P>(composer: ComposerFn<P>) {
  return (props: P = {} as P) => {
    const classes = composer(conditional);
    const entries = classes.reduce<string[]>((collection, value) => {
      const isString = typeof value === 'string';
      const [target, condition] = !isString ? value : [value, () => false];
      const singleTarget = Array.isArray(target) ? target.join(' ') : target;

      const computedValue = isString ? value : singleTarget;
      const computedCondition = isString ? !!value : condition(props);

      return computedCondition ? [...collection, computedValue] : collection;
    }, []);

    return entries;
  };
}
