import { OPTIONS } from '@src/utilities/options';

export function cc(classes: (string | undefined)[]) {
  let final = '';

  for (let i = 0, len = classes.length; i < len; ++i) {
    if (classes[i]) {
      final && (final += ' ');
      final += classes[i];
    }
  }

  return OPTIONS.get('default')?.hooks?.onDone?.(final) ?? final;
}
