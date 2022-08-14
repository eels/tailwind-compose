import cc from '@src/utils/combineClasses';
import generateClassesArray from '@src/utils/generateClassesArray';
import generateDisplayName from '@src/utils/generateDisplayName';
import isValidProp from '@src/utils/isValidProp';
import { createElement, forwardRef } from 'react';
import type { ClassName, ConstructOptions, Props } from '@types';
import type { Ref } from 'react';

export default function construct<P extends Props, A>(options: ConstructOptions<P, A>) {
  const { attrs = {} as A, classes, target } = options;
  const isTargetString = typeof target === 'string';
  const isTargetObject = typeof target === 'object';

  function wrapper() {
    const name = generateDisplayName(target);

    function composed(props: P, ref: Ref<Element>) {
      const constructedProps = Object.assign<ClassName, A, P>({}, attrs, props);
      const constructedPropsKeys = Object.keys(constructedProps);
      const as = constructedProps.as || target;
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

    Object.defineProperty(composed, 'name', { value: name });

    return forwardRef(composed);
  }

  return wrapper();
}
