import { createElement } from 'react';
import { define } from '@src/core/define';
import { render, screen } from '@testing-library/react';
import type { DefineConfigOptions } from '@types';

describe('core/define', () => {
  const config: DefineConfigOptions = {
    hooks: {
      onDone: (className: string) => className.split(' ').reverse().join(' '),
    },
  };

  it('should return the required property keys', () => {
    expect(Object.keys(define(config))).toEqual(['classnames', 'compose', 'defineConfig']);
  });

  it('should correctly apply the `onDone` hook to the `classnames` method', () => {
    const { classnames } = define(config);
    const classnamesInstance = classnames(() => ['text-black', 'p-4']);

    expect(classnamesInstance()).toBe('p-4 text-black');
  });

  it('should correctly apply the `onDone` hook to the `compose` method', () => {
    const { compose } = define(config);
    const composeInstance = compose.h1(() => ['text-black', 'p-4']);

    render(createElement(composeInstance));
    expect(screen.getByRole('heading').classList.value.split(' ')).toEqual(['p-4', 'text-black']);
  });

  it('should allow for multiple different instances with different configurations', () => {
    const alternativeConfig: DefineConfigOptions = {
      hooks: {
        onDone: () => 'text-red-500',
      },
    };

    const { classnames, compose } = define(alternativeConfig);
    const classnamesInstance = classnames(() => ['text-black', 'p-4']);
    const composeInstance = compose.h1(() => ['text-black', 'p-4']);

    define(config);

    render(createElement(composeInstance));
    expect(screen.getByRole('heading').classList.value.split(' ')).toEqual(['text-red-500']);
    expect(classnamesInstance()).toBe('text-red-500');
  });
});
