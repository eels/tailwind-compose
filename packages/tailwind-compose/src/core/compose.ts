import { construct } from '@src/lib/construct';
import type { ComposeFactory, ComposerFn, Props, Target } from '@types';

const Compose = <P extends Props>(target: Target<P>, classes: ComposerFn<P>) => {
  return Object.assign(construct<P, Record<string, unknown>>({ classes, target }), {
    attrs: <A extends Props>(attrs: A) => {
      return construct<P, A>({ attrs, classes: classes as ComposerFn<P & A>, target });
    },
  });
};

export const compose = new Proxy(Compose, {
  get(target: typeof Compose, property: string) {
    if (Reflect.has(target, property)) {
      return Reflect.get(target, property);
    }

    return Object.assign(
      <P extends Props>(classes: ComposerFn<P>) => {
        return construct<P, Record<string, unknown>>({ classes, target: property as Target<P> });
      },
      {
        attrs: <A extends Props>(attrs: A) => {
          return <P extends Props>(classes: ComposerFn<P & A>) => {
            return construct<P, A>({ attrs, classes, target: property as Target<P> });
          };
        },
      },
    );
  },
}) as unknown as ComposeFactory;
