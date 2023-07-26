import { isValidProp } from '@src/utilities/is-valid-prop';

describe('utils/isValidProp', () => {
  it('should return true for valid props', () => {
    const props = ['className', 'data-example', 'id', 'style'];

    props.forEach((prop) => expect(isValidProp(prop)).toBe(true));
  });

  it('should return false for invalid props', () => {
    const props = ['$isPrimary', '$hasBorder', '$withTextColor'];

    props.forEach((prop) => expect(isValidProp(prop)).toBe(false));
  });
});
