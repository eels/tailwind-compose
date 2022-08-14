export default function cc(classes: (string | undefined)[]) {
  let final = '';

  for (let i = 0; i < classes.length; i++) {
    const item = classes[i];

    if (item && item.trim() !== '') {
      final += (final && ' ') + item.trim();
    }
  }

  return final;
}
