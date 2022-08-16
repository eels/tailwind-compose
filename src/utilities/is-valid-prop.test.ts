import htmlAttributes from 'html-attributes';
import svgAttributes from 'svg-attributes';
import { isValidProp } from '@src/utilities/is-valid-prop';
import { reactAttributes } from '@src/lib/attributes';

describe('utils/isValidProp', () => {
  it('should return true for valid html props', () => {
    Object.keys(htmlAttributes).forEach((prop) => expect(isValidProp(prop)).toBe(true));
  });

  it('should return true for valid svg props', () => {
    Object.keys(svgAttributes).forEach((prop) => expect(isValidProp(prop)).toBe(true));
  });

  it('should return true for valid react props', () => {
    Object.keys(reactAttributes).forEach((prop) => expect(isValidProp(prop)).toBe(true));
  });

  it('should return false for invalid props', () => {
    const props = ['isPrimary', 'hasBorder', 'withTextColor'];

    props.forEach((prop) => expect(isValidProp(prop)).toBe(false));
  });
});
