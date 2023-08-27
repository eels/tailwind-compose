export function cc(classes: (string | undefined)[]) {
  let final = '';

  for (let i = 0, len = classes.length; i < len; i++) {
    const item = classes[i];

    if (item) {
      final && (final += ' ');
      final += item;
    }
  }

  return final;
}
