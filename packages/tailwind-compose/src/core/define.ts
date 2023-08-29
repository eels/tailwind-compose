import { OPTIONS } from '@src/utilities/options';
import { classnames } from '@src/core/classnames';
import { compose } from '@src/core/compose';
import type { DefineConfigOptions } from '@types';

export function define(options: DefineConfigOptions) {
  return (
    OPTIONS.set('default', options) && {
      classnames,
      compose,
      defineConfig: define,
    }
  );
}
