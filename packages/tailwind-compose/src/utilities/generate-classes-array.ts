import type { ComposerFn, Condition, ConditionTarget, Tuple } from '@types';

export function conditional<P>(target: ConditionTarget, condition: Condition<P>) {
  return [target, condition] as Tuple<P>;
}

export function generateClassesArray<P>(composer: ComposerFn<P>) {
  return (props: P = {} as P) => {
    const classes = composer(conditional);
    const final: string[] = [];

    for (let i = 0, len = classes.length; i < len; i++) {
      const value = classes[i];
      const [target, condition = true] = typeof value !== 'string' ? value : [value];

      const computedValue = typeof target === 'object' ? target : [target];

      if (typeof condition === 'boolean' ? condition : condition(props)) {
        Array.prototype.push.apply(final, computedValue);
      }
    }

    return final;
  };
}
