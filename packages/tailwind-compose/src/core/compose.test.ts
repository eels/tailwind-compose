import { compose } from '@src/core/compose';
import { construct } from '@src/lib/construct';

jest.mock('@src/lib/construct');

describe('core/compose', () => {
  const tags = ['a', 'body', 'div', 'html', 'h1', 'main', 'span'] as const;
  const mockConstruct = construct as jest.Mock;

  beforeEach(() => {
    mockConstruct.mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(compose).toBeInstanceOf(Function);
  });

  it('should have an `attrs` property', () => {
    expect(compose).toHaveProperty('attrs');
  });

  it('should have a series of dynamic properties', () => {
    for (const tag of tags) {
      expect(compose).toHaveProperty(tag);
    }
  });

  it('should have a series of dynamic properties with their own `attrs` property', () => {
    for (const tag of tags) {
      expect(compose[tag]).toHaveProperty('attrs');
    }
  });

  it('should call `construct` with the appropriate options (base)', () => {
    const classes = () => [];
    const target = 'div';

    compose(target, classes);
    expect(mockConstruct).toHaveBeenCalledWith({ classes, target });
  });

  it('should call `construct` with the appropriate options (base `attrs`)', () => {
    const attrs = {};
    const classes = () => [];
    const target = 'div';

    compose(target, classes).attrs(attrs);
    expect(mockConstruct).toHaveBeenCalledWith({ attrs, classes, target });
  });

  it('should call `construct` with the appropriate options (dynamic property)', () => {
    const classes = () => [];
    const target = 'div';

    compose.div(classes);
    expect(mockConstruct).toHaveBeenCalledWith({ classes, target });
  });

  it('should call `construct` with the appropriate options (dynamic property `attrs`)', () => {
    const attrs = {};
    const classes = () => [];
    const target = 'div';

    compose.div.attrs(attrs)(classes);
    expect(mockConstruct).toHaveBeenCalledWith({ attrs, classes, target });
  });

  it('should access native property on proxy', () => {
    expect(compose.name).toBe('Compose');
  });
});
