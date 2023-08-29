import { classnames, compose, defineConfig } from '@src/index';

describe('tailwind-compose/entry', () => {
  it('should export all the required package members', () => {
    expect(typeof classnames).toBe('function');
    expect(typeof compose).toBe('function');
    expect(typeof defineConfig).toBe('function');
  });
});
