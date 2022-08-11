import construct from '@src/lib/construct';
import type { Attrs, ComposeFactory, ComposerFn, Props, Target } from '@types';

const Compose = <P extends Props>(target: Target<P>, classes: ComposerFn<P>) => {
  return construct<P, {}>({
    classes,
    target,
  });
};

const ComposeFactoryProxyInstance = new Proxy(Compose, {
  get(target: typeof Compose, property: string) {
    if (Reflect.has(target, property)) {
      return Reflect.get(target, property);
    }

    Object.defineProperty(target, 'attrs', {
      value: <P extends Props, A extends Attrs>(attrs: A) => {
        return (target: Target<P>, classes: ComposerFn<P & A>) => {
          return construct<P, A>({
            attrs,
            classes,
            target,
          });
        };
      },
    });

    const ComposeTag = <P extends Props>(classes: ComposerFn<P>) => {
      return construct<P, {}>({
        classes,
        target: property as Target<P>,
      });
    };

    Object.defineProperty(ComposeTag, 'attrs', {
      value: <P extends Props, A extends Attrs>(attrs: A) => {
        return (classes: ComposerFn<P & A>) => {
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

export const compose = ComposeFactoryProxyInstance as ComposeFactory;
