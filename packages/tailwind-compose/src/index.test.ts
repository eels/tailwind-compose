import { classnames as NATIVE_CLASSNAMES } from '@src/core/classnames';
import { compose as NATIVE_COMPOSE } from '@src/core/compose';
import { define as NATIVE_DEFINE } from '@src/core/define';
import { classnames, compose, defineConfig } from '@src/index';

describe('tailwind-compose/entry', () => {
  it('should export all the required package members', () => {
    expect(classnames).toEqual(NATIVE_CLASSNAMES);
    expect(compose).toEqual(NATIVE_COMPOSE);
    expect(defineConfig).toEqual(NATIVE_DEFINE);
  });
});
