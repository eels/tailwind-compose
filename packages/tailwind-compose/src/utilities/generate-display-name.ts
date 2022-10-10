import type { Target } from '@types';

export function generateDisplayName<P, E = void>(target: Target<P, E>) {
  if (typeof target === 'string') {
    return `composed.${target}`;
  }

  type NotStringTarget = Exclude<Target<P, E>, string>;

  const componentName = (<NotStringTarget>target).name;
  const componentStaticName = 'Component';

  return `Composed${componentName || componentStaticName}`;
}
