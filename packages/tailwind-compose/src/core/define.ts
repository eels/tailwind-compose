import { classnames } from '@src/core/classnames';
import { compose } from '@src/core/compose';
import type { DefineConfigOptions } from '@types';

export function define(config?: DefineConfigOptions) {
  return {
    classnames: classnames(config),
    compose: compose(config),
    defineConfig: define,
  };
}
