import construct from '@src/lib/construct';
import { compose } from '@src/core/compose';

jest.mock('@src/lib/construct');

describe('core/compose', () => {
  const tags = ['a', 'body', 'div', 'html', 'h1', 'main', 'span'] as const;

  beforeEach(() => {
    (construct as jest.Mock).mockImplementation(() => jest.fn());
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
    expect(construct).toHaveBeenCalledWith({ classes, target });
  });

  it('should call `construct` with the appropriate options (base `attrs`)', () => {
    const attrs = {};
    const classes = () => [];
    const target = 'div';

    compose.attrs(attrs)(target, classes);
    expect(construct).toHaveBeenCalledWith({ attrs, classes, target });
  });

  it('should call `construct` with the appropriate options (dynamic property)', () => {
    const classes = () => [];
    const target = 'div';

    compose.div(classes);
    expect(construct).toHaveBeenCalledWith({ classes, target });
  });

  it('should call `construct` with the appropriate options (dynamic property `attrs`)', () => {
    const attrs = {};
    const classes = () => [];
    const target = 'div';

    compose.div.attrs(attrs)(classes);
    expect(construct).toHaveBeenCalledWith({ attrs, classes, target });
  });
});
