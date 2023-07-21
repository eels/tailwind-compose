import { cc } from '@src/utilities/combine-classes';
import { createElement, forwardRef } from 'react';
import { generateClassesArray } from '@src/utilities/generate-classes-array';
import { generateDisplayName } from '@src/utilities/generate-display-name';
import { isValidProp } from '@src/utilities/is-valid-prop';
import type { Attrs, ClassName, ConstructOptions, Props } from '@types';
import type { Ref } from 'react';

export function construct<P extends Props, A extends Attrs, E>(options: ConstructOptions<P, A, E>) {
  const { attrs = {} as A, classes, target } = options;
  const isTargetString = typeof target === 'string';
  const isTargetObject = typeof target === 'object';

  function wrapper() {
    const name = generateDisplayName(target);

    function composed(props: P, ref: Ref<Element>) {
      const constructedProps = Object.assign<ClassName, A, P>({}, attrs, props);
      const constructedPropsKeys = Object.keys(constructedProps);
      const as = constructedProps.as;
      const hasValidAs = ['function', 'object', 'string'].includes(typeof as);
      const element = hasValidAs && !isTargetObject ? as : target;
      const componentClassNames = constructedProps.className;
      const classArray = generateClassesArray(classes)(constructedProps);

      for (let i = 0; i < constructedPropsKeys.length; i++) {
        const prop = constructedPropsKeys[i];

        if (isTargetString && !isValidProp(prop)) {
          delete constructedProps[prop];
        }
      }

      constructedProps.className = cc([...classArray, componentClassNames]);

      const propsRefObject = ref ? { ref } : {};
      const propsToForward = Object.assign({}, constructedProps, propsRefObject);
      const children = constructedProps.children ?? null;

      return createElement(element, propsToForward, children);
    }

    Object.defineProperty(composed, 'name', {
      value: name,
    });

    const component = forwardRef(composed);

    Object.defineProperty(component, 'toClass', {
      value: () => {
        const constructedProps = Object.assign<ClassName, A, P>({}, attrs, {} as P);
        const componentClassNames = constructedProps.className;
        const classArray = generateClassesArray(classes)(constructedProps);

        return cc([...classArray, componentClassNames]);
      },
    });

    return component;
  }

  return wrapper() as ReturnType<typeof wrapper> & { toClass: () => string };
}
