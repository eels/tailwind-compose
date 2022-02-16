import cc from 'classcat';
import generateClassesArray from '@src/utils/generateClassesArray';
import generateDisplayName from '@src/utils/generateDisplayName';
import isValidProp from '@src/utils/isValidProp';
import { createElement, forwardRef } from 'react';
import type { Classes, ConstructOptions, Props, Target } from '@types';
import type { Ref } from 'react';

export default function construct<P = Props>(options: ConstructOptions<P>) {
  const { attrs, classes, target } = options;
  const isTargetString = typeof target === 'string';

  function wrapper() {
    const name = generateDisplayName(target as Target<Props>);

    function composed(props: P, ref: Ref<Element>) {
      const constructedProps = Object.assign({}, attrs, props) as Props;
      const constructedPropsKeys = Object.keys(constructedProps);
      const as = constructedProps.as || target;
      const hasValidAs = typeof as === 'function' || typeof as === 'string';
      const element = hasValidAs ? as : target;
      const classArray = generateClassesArray(classes as Classes<Props>, constructedProps);

      for (const prop of constructedPropsKeys) {
        if (isTargetString && !isValidProp(prop)) {
          delete constructedProps[prop];
        }
      }

      if (constructedProps.className) {
        delete constructedProps.className;
      }

      constructedProps.className = cc(classArray);

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
