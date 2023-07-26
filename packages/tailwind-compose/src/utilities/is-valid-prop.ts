export function isValidProp(prop: string) {
  return !prop.startsWith('$') && prop !== 'as';
}
