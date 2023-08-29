import { defineConfig } from 'tailwind-compose';
import { twMerge } from 'tailwind-merge';
import type { DefineConfigOptions } from 'tailwind-compose';

const config: DefineConfigOptions = {
  hooks: {
    onDone: (cn) => twMerge(cn),
  },
};

export const { classnames, compose } = defineConfig(config);
