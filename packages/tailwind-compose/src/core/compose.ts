import { construct } from '@src/lib/construct';
import type { Attrs, ComposeFactory, ComposerFn, Props, Target } from '@types';

const Compose = <P extends Props, E = void>(target: Target<P, E>, classes: ComposerFn<P>) => {
  return construct<P, Record<string, unknown>, E>({
    classes,
    target,
  });
};

Object.defineProperty(Compose, 'attrs', {
  value: <A extends Attrs>(attrs: A) => {
    return <P extends Props, E = void>(target: Target<P, E>, classes: ComposerFn<P & A>) => {
      return construct<P, A, E>({
        attrs,
        classes,
        target,
      });
    };
  },
});

const ComposeFactoryProxyInstance = new Proxy(Compose, {
  get(target: typeof Compose, property: string) {
    if (Reflect.has(target, property)) {
      return Reflect.get(target, property);
    }

    const ComposeTag = <P extends Props, E = void>(classes: ComposerFn<P>) => {
      return construct<P, Record<string, unknown>, E>({
        classes,
        target: property as Target<P, E>,
      });
    };

    Object.defineProperty(ComposeTag, 'attrs', {
      value: <A extends Attrs>(attrs: A) => {
        return <P extends Props, E = void>(classes: ComposerFn<P & A>) => {
          return construct<P, A, E>({
            attrs,
            classes,
            target: property as Target<P, E>,
          });
        };
      },
    });

    return ComposeTag;
  },
});

export const compose = ComposeFactoryProxyInstance as ComposeFactory;
