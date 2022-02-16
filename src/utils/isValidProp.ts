import { ATTRIBUTES } from '@src/store/attributes';

export default function isValidProp(prop: string) {
  const isDOMAttribute = !!ATTRIBUTES[prop];
  const isAriaDataEventProp = /^(([Aa][Rr][Ii][Aa]|[Dd][Aa][Tt][Aa])-.+)|(on[A-Z])/.test(prop);

  return isDOMAttribute || isAriaDataEventProp;
}
