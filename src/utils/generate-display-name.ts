import type { Props, Target } from '@types';

export default function generateDisplayName<P extends Props>(target: Target<P>) {
  if (typeof target === 'string') {
    return `composed.${target}`;
  }

  type NotStringTarget = Exclude<Target<P>, string>;

  const componentName = (<NotStringTarget>target).name;
  const componentStaticName = 'Component';

  return `Composed${componentName || componentStaticName}`;
}
