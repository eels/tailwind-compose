import type { Props, Target } from '@types';

export function generateDisplayName<P extends Props, E = void>(target: Target<P, E>) {
  if (typeof target === 'string') {
    return `composed.${target}`;
  }

  type NotStringTarget = Exclude<Target<P, E>, string>;

  const componentName = (<NotStringTarget>target).name;
  const componentStaticName = 'Component';

  return `Composed${componentName || componentStaticName}`;
}
