import type { Props, Target } from '@types';

export default function generateDisplayName<P extends Props>(target: Target<P>) {
  if (typeof target === 'string') {
    return `composed.${target}`;
  }

  const componentName = (<Function>target).name;
  const componentStaticName = 'Component';

  return `Composed${componentName || componentStaticName}`;
}
