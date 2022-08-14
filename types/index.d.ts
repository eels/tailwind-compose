import tags from './tags';
import type { ComponentType, ForwardRefExoticComponent, PropsWithoutRef } from 'react';

export type ExtendableObject<T = any> = Record<string, T>;

export type Attrs = ExtendableObject;

export type Props = ExtendableObject;

export type ClassName = { className?: string };

export type ConditionTarget = string | string[];

export type Condition<P> = (props?: P) => boolean;

export type Tuple<P> = [ConditionTarget, Condition<P>];

export type Conditional<P> = (target: ConditionTarget, condition: Condition<P>) => Tuple<P>;

export type Classes<P> = (string | Tuple<P>)[];

export type ComposerFn<P> = (conditional: Conditional<P>) => Classes<P>;

export type Component<P> = ForwardRefExoticComponent<PropsWithoutRef<P>>;

export type Target<P> = string | ComponentType<P> | Component<P>;

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
