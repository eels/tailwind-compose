import { cc } from '@src/utilities/combine-classes';
import { createElement, forwardRef } from 'react';
import { generateClassesArray } from '@src/utilities/generate-classes-array';
import { generateDisplayName } from '@src/utilities/generate-display-name';
import { isValidProp } from '@src/utilities/is-valid-prop';
import type { Attrs, ClassName, ConstructOptions as Options, Props } from '@types';
import type { Ref } from 'react';

export function construct<P extends Props, A extends Attrs>(options: Options<P, A>) {
  const { attrs = {} as A, classes, target } = options;

  function constructClassOutput(props: P = {} as P) {
    const constructedAttrs = typeof attrs === 'function' ? attrs(props) : attrs;
    const constructedProps = Object.assign<ClassName, A, P>({}, constructedAttrs, props);
    const constructedPropsKeys = Object.keys(constructedProps);
    const classArray = generateClassesArray(classes)(constructedProps);
    const classOutput = cc([...classArray, constructedProps.className]);

    return {
      classOutput,
      constructedProps,
      constructedPropsKeys,
    };
  }

  function composed(props: P, ref: Ref<Element>) {
    const { classOutput, constructedProps, constructedPropsKeys } = constructClassOutput(props);
    const as = constructedProps.as;
    const isValidAs = typeof as === 'function' || typeof as === 'object' || typeof as === 'string';

    constructedProps.className = classOutput;

    if (typeof target === 'string') {
      for (let i = 0, len = constructedPropsKeys.length; i < len; ++i) {
        if (!isValidProp(constructedPropsKeys[i])) {
          delete constructedProps[constructedPropsKeys[i]];
        }
      }
    }

    return createElement(
      isValidAs && typeof target !== 'object' ? as : target,
      Object.assign({}, constructedProps, ref ? { ref } : {}),
      constructedProps.children ?? null,
    );
  }

  Object.defineProperty(composed, 'name', {
    value: generateDisplayName(target),
  });

  return Object.assign(forwardRef(composed), {
    toClass: (props?: P) => constructClassOutput(props).classOutput,
  });
}
