import { construct } from '@src/lib/construct';
import type { ComposeFactory, ComposerFn, DefineConfigOptions, Props, Target } from '@types';

export function compose(config?: DefineConfigOptions) {
  const Compose = <P extends Props>(target: Target<P>, classes: ComposerFn<P>) => {
    return Object.assign(construct<P, Record<string, unknown>>({ classes, target }), {
      attrs: <A extends Props>(attrs: A) => {
        return construct<P, A>({
          attrs,
          classes: classes as ComposerFn<P & A>,
          config,
          target,
        });
      },
    });
  };

  return new Proxy(Compose, {
    get(target: typeof Compose, property: string) {
      if (Reflect.has(target, property)) {
        return Reflect.get(target, property);
      }

      return Object.assign(
        <P extends Props>(classes: ComposerFn<P>) => {
          return construct<P, Record<string, unknown>>({
            classes,
            config,
            target: property as Target<P>,
          });
        },
        {
          attrs: <A extends Props>(attrs: A) => {
            return <P extends Props>(classes: ComposerFn<P & A>) => {
              return construct<P, A>({
                attrs,
                classes,
                config,
                target: property as Target<P>,
              });
            };
          },
        },
      );
    },
  }) as unknown as ComposeFactory;
}
