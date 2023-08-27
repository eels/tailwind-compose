import { classnames } from 'tailwind-compose';

export const avatar = classnames(() => [
  'relative flex shrink-0 overflow-hidden rounded-full',
  ['h-6 w-6', ({ size }) => size === 'xs'],
  ['h-8 w-8', ({ size }) => size === 'sm'],
  ['h-10 w-10', ({ size }) => size === 'md' || !size],
  ['h-12 w-12', ({ size }) => size === 'lg'],
  ['h-14 w-14', ({ size }) => size === 'xl'],
  ['ring-1', ({ size }) => size === 'xs' || size === 'sm'],
  ['ring-2', ({ size }) => size === 'md' || size === 'lg' || size === 'xl' || size === '2xl'],
]);

export const image = classnames(() => [
  'aspect-square h-full w-full',
  ['border-1.5 border-white', ({ withBorder }) => withBorder],
]);

export const fallback = classnames(() => [
  'flex h-full w-full items-center justify-center rounded-full bg-muted',
  ['text-xs', ({ size }) => size === 'xs'],
  ['text-sm', ({ size }) => size === 'sm'],
  ['text-base', ({ size }) => size === 'md' || !size],
  ['text-lg', ({ size }) => size === 'lg'],
  ['text-xl', ({ size }) => size === 'xl'],
]);
