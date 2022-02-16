import tags from './tags';
import type { ComponentType, ForwardRefExoticComponent, PropsWithoutRef } from 'react';

export type ExtendableObject<T = any> = Record<string, T>;

export type AttrProps = ExtendableObject;

export type Attrs<A = AttrProps> = A;

export type Props = ExtendableObject;

export type Classes<P = Props> = (string | ((props: P) => string | false))[];

export type Component<P = Props> = ForwardRefExoticComponent<PropsWithoutRef<P>>;

export type Target<P = Props> = typeof tags[number] | ComponentType<P> | Component<P>;

export type ComposeFunction = <P = Props>(target: Target<P>, classes: Classes<P>) => Component<P>;

export type TagFunction = <P = Props>(classes: Classes<P>) => Component<P>;

export type WithAttrs = {
  attrs: <A = AttrProps>(attrs: Attrs<A>) => ComposeFunction;
};

export type WithTagAttrs = {
  [key in typeof tags[number]]: TagFunction & {
    attrs: <A = AttrProps>(attrs: Attrs<A>) => TagFunction;
  };
};

export interface ConstructOptions<P = Props, A = AttrProps> {
  attrs: Attrs<A>;
  classes: Classes<P>;
  target: Target<P>;
}

export type Factory = ComposeFunction & WithAttrs & WithTagAttrs;

export const compose: Factory;
