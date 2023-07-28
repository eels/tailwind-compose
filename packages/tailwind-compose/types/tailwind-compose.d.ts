import type * as React from 'react';

export type ExtendableObject<T = any> = Record<string, T>;

export type Props = ExtendableObject;

export type BaseObject = Record<string, never>;

// ---

export type Target<P> = string | Exclude<keyof JSX.IntrinsicElements, 'symbol' | 'object'> | React.ComponentType<P> | ComposedComponent<P>;

export interface ComposedComponent<P, A extends BaseObject = BaseObject> extends React.ForwardRefExoticComponent<ExecutionProps & P> {
  attrs: A extends never ? never : (attrs: Attrs<P>) => ComposedComponent<P>;
  defaultProps?: ExecutionProps & Partial<React.PropsWithoutRef<P>>;
  toClass: (props?: P) => string;
  toString: () => string;
}

// ---

export type ComposerFn<P> = (conditional: Conditional<P>) => Classes<P>;

export type Conditional<P> = (target: ConditionTarget, condition: Condition<P>) => Tuple<P>;

export type ConditionTarget = string | string[];

export type Condition<P> = (props: P) => boolean;

export type Tuple<P> = [ConditionTarget, Condition<P>];

export type Classes<P> = (string | Tuple<P>)[];

// ---

export type Attrs<P extends Props = Props> = Partial<P> | ((props: P) => Partial<P>);

export type PolymorphicAttributeProps<T, P extends Props = Props> = JSX.LibraryManagedAttributes<T, JSX.IntrinsicElements[T] & P>;

// ---

export interface StyledCompose {
  <T extends keyof JSX.IntrinsicElements, P extends Props = Props>(target: T, classes: ComposerFn<PolymorphicAttributeProps<T, P>>): ComposedComponent<PolymorphicAttributeProps<T, P>>;
  <P extends Props = Props, PP extends Props = Props>(target: ComposedComponent<P>, classes: ComposerFn<P & PP>): ComposedComponent<P & PP>;
  <P extends Props = Props>(target: string, classes: ComposerFn<P>): ComposedComponent<Partial<JSX.ElementChildrenAttribute> & P>;
  <P extends Props = Props>(target: Target<P>, classes: ComposerFn<P>): ComposedComponent<P>;
}

export interface StyledTagCompose<T> {
  <P extends Props = Props>(classes: ComposerFn<P>): ComposedComponent<PolymorphicAttributeProps<T, P>, never>;
  <P extends Props = Props>(classes: ComposerFn<P>): ComposedComponent<P, never>;
  attrs: <P extends Props = Props>(attrs: Attrs<PolymorphicAttributeProps<T, P>>) => StyledTagCompose<T>;
}

export type WithStyledTagAttrs = {
  [key in keyof JSX.IntrinsicElements]: StyledTagCompose<key>;
};

export type ComposeFactory = StyledCompose & WithStyledTagAttrs;

// ---

export interface ConstructOptions<P, A> {
  attrs?: A;
  classes: ComposerFn<P & A>;
  target: Target<P>;
}

export interface ExecutionProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType;
}

export interface ClassName {
  className?: string;
}

// ---

export const compose: ComposeFactory;

export function classnames<P extends Props>(classes: ComposerFn<P>): (props?: P) => string;
