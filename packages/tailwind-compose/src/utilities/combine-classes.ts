import type { DefineConfigOptions } from '@types';

export function cc(classes: (string | undefined)[], options?: DefineConfigOptions) {
  let final = '';

  for (let i = 0, len = classes.length; i < len; ++i) {
    if (classes[i]) {
      final && (final += ' ');
      final += classes[i];
    }
  }

  return options?.hooks?.onDone?.(final) ?? final;
}
