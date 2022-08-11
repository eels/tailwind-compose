import tags from './tags';
import type { ComponentType, ForwardRefExoticComponent, PropsWithoutRef } from 'react';

export type ExtendableObject<T = any> = Record<string, T>;

export type Attrs = ExtendableObject;

export type Props = ExtendableObject;

export type ClassName = { className?: string };

export type ConditionTuple<P> = [string, (props: P) => boolean];

export type Conditional<P> = (target: string, condition: (props: P) => boolean) => ConditionTuple;

export type Classes<P extends Props> = (string | ConditionTuple<P>)[];

export type ComposerFn<P extends Props> = (conditional: Conditional<P>) => Classes<P>;

export type Component<P extends Props> = ForwardRefExoticComponent<PropsWithoutRef<P>>;

export type Target<P extends Props> = string | ComponentType<P> | Component<P>;

export type Compose = <P extends Props>(target: Target<P>, classes: ComposerFn<P>) => Component<P>;

export type TagCompose = <P extends Props>(classes: ComposerFn<P>) => Component<P>;

export type WithAttrs = {
  attrs: <A extends Attrs>(attrs: A) => Compose;
};

export type WithTagAttrs = {
  [key in typeof tags[number]]: TagCompose & {
    attrs: <A extends Attrs>(attrs: A) => TagCompose;
  };
};

export type ConstructOptions<P extends Props, A extends Attrs> = {
  attrs?: A;
  classes: ComposerFn<P & A>;
  target: Target<P>;
};

export type ComposeFactory = Compose & WithAttrs & WithTagAttrs;

export function classnames<P extends Props>(classes: ComposerFn<P>): (props?: P) => string;

export const compose: ComposeFactory;
