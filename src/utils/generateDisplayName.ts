import type { Target } from '@types';

export default function generateDisplayName(target: Target) {
  if (typeof target === 'string') {
    return `composed.${target}`;
  }

  // const componentDisplayName = (<Exclude<Target, string>>target).displayName;
  const componentName = (<Function>target).name;
  const componentStaticName = 'Component';

  return `Composed${componentName || componentStaticName}`;
}
