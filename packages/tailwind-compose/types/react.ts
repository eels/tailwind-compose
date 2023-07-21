import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

interface ComposedProperties {
  toClass: () => string;
}

export type WithRef<P, E> = ForwardRefExoticComponent<P & RefAttributes<E>> & ComposedProperties;

export type WithoutRef<P> = ForwardRefExoticComponent<PropsWithoutRef<P>> & ComposedProperties;
