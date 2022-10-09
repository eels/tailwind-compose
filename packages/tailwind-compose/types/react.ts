import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

export type WithRef<P, E> = ForwardRefExoticComponent<P & RefAttributes<E>>;

export type WithoutRef<P> = ForwardRefExoticComponent<PropsWithoutRef<P>>;
