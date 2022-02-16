import construct from '@src/lib/construct';
import type { AttrProps, Attrs, Classes, Factory, Props, Target } from '@types';

export default function create() {
  const Compose = <P = Props>(target: Target<P>, classes: Classes<P>) => {
    return construct({
      attrs: {},
      classes: classes,
      target: target,
    });
  };

  Object.defineProperty(Compose, 'attrs', {
    value: <P = Props, A = AttrProps>(attrs: Attrs) => {
      return (target: Target<P & A>, classes: Classes<P & A>) => {
        return construct({
          attrs: attrs,
          classes: classes,
          target: target,
        });
      };
    },
  });

  const ProxyInstance = new Proxy(Compose, {
    get(target: typeof Compose, property: string) {
      if (Reflect.has(target, property)) {
        return Reflect.get(target, property);
      }

      const ComposeTag = <P = Props>(classes: Classes<P>) => {
        return construct({
          attrs: {},
          classes: classes,
          target: property as Target<P>,
        });
      };

      Object.defineProperty(ComposeTag, 'attrs', {
        value: <P = Props, A = AttrProps>(attrs: Attrs) => {
          return (classes: Classes<P & A>) => {
            return construct({
              attrs: attrs,
              classes: classes,
              target: property as Target<P & A>,
            });
          };
        },
      });

      return ComposeTag;
    },
  });

  return ProxyInstance as Factory;
}
