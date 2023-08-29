import { cc } from '@src/utilities/combine-classes';

describe('utils/cc', () => {
  it('should combine a string array', () => {
    expect(cc(['one', 'two', 'three'])).toBe('one two three');
  });

  it('should appropriately handle `undefined` array items', () => {
    expect(cc(['one', 'two', undefined])).toBe('one two');
    expect(cc(['one', undefined, 'two'])).toBe('one two');
  });

  it('should appropriately handle empty string array items', () => {
    expect(cc(['one', 'two', ''])).toBe('one two');
    expect(cc(['one', '', 'two'])).toBe('one two');
  });
});
