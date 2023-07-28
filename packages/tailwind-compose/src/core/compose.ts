import { construct } from '@src/lib/construct';
import type { ComposeFactory, ComposerFn, Props, Target } from '@types';

const Compose = <P extends Props>(target: Target<P>, classes: ComposerFn<P>) => {
  const compose = construct<P, Record<string, unknown>>({
    classes,
    target,
  });

  Object.defineProperty(compose, 'attrs', {
    value: <A extends Props>(attrs: A) => {
      return construct<P, A>({
        attrs,
        classes: classes as ComposerFn<P & A>,
        target: target as Target<P>,
      });
    },
  });

  return compose;
};

const ComposeFactoryProxyInstance = new Proxy(Compose, {
  get(target: typeof Compose, property: string) {
    if (Reflect.has(target, property)) {
      return Reflect.get(target, property);
    }

    const ComposeTag = <P extends Props>(classes: ComposerFn<P>) => {
      return construct<P, Record<string, unknown>>({
        classes,
        target: property as Target<P>,
      });
    };

    Object.defineProperty(ComposeTag, 'attrs', {
      value: <A extends Props>(attrs: A) => {
        return <P extends Props>(classes: ComposerFn<P & A>) => {
          return construct<P, A>({
            attrs,
            classes,
            target: property as Target<P>,
          });
        };
      },
    });

    return ComposeTag;
  },
});

export const compose = ComposeFactoryProxyInstance as unknown as ComposeFactory;
