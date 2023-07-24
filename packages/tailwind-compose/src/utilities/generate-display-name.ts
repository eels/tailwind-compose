import type { Target } from '@types';

export function generateDisplayName<P>(target: Target<P>) {
  if (typeof target === 'string') {
    return `composed.${target}`;
  }

  type NotStringTarget = Exclude<Target<P>, string>;

  const componentName = (<NotStringTarget>target).name;
  const componentStaticName = 'Component';

  return `Composed${componentName || componentStaticName}`;
}
