import { OPTIONS } from '@src/utilities/options';
import { createElement } from 'react';
import { define } from '@src/core/define';
import { render, screen } from '@testing-library/react';
import type { DefineConfigOptions } from '@types';

describe('core/define', () => {
  const options: DefineConfigOptions = {
    hooks: {
      onDone: (className: string) => className.split(' ').reverse().join(' '),
    },
  };

  afterEach(() => {
    OPTIONS.clear();
  });

  it('should set the provided options in the global storage map', () => {
    define(options);
    expect(OPTIONS.get('default')).toEqual(options);
  });

  it('should return the required property keys', () => {
    expect(Object.keys(define(options))).toEqual(['classnames', 'compose', 'defineConfig']);
  });

  it('should correctly apply the `onDone` hook to the `classnames` method', () => {
    const { classnames } = define(options);
    const classnamesInstance = classnames(() => ['text-black', 'p-4']);

    expect(classnamesInstance()).toBe('p-4 text-black');
  });

  it('should correctly apply the `onDone` hook to the `compose` method', () => {
    const { compose } = define(options);
    const composeInstance = compose.h1(() => ['text-black', 'p-4']);

    render(createElement(composeInstance));
    expect(screen.getByRole('heading').classList.value.split(' ')).toEqual(['p-4', 'text-black']);
  });
});
