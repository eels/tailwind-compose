import generateDisplayName from './generate-display-name';

describe('utils/generateDisplayName', () => {
  it('should generate an appropriate name from a string target', () => {
    expect(generateDisplayName('div')).toBe('composed.div');
    expect(generateDisplayName('span')).toBe('composed.span');
  });

  it('should generate an appropriate name from a target without a `name` property', () => {
    expect(generateDisplayName(() => null)).toBe('ComposedComponent');
  });

  it('should generate an appropriate name from a target with a `name` property', () => {
    const target = () => null;

    Object.defineProperty(target, 'name', { value: 'MyTarget' });

    expect(generateDisplayName(target)).toBe('ComposedMyTarget');
  });
});
