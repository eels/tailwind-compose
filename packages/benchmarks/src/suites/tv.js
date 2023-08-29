import { tv } from 'tailwind-variants';

export const avatar = tv({
  base: 'relative flex shrink-0 overflow-hidden rounded-full',
  compoundVariants: [
    {
      class: 'ring-1',
      size: ['xs', 'sm'],
    },
    {
      class: 'ring-2',
      size: ['md', 'lg', 'xl', '2xl'],
    },
  ],
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      lg: 'h-12 w-12',
      md: 'h-10 w-10',
      sm: 'h-8 w-8',
      xl: 'h-14 w-14',
      xs: 'h-6 w-6',
    },
  },
});

export const image = tv({
  base: 'aspect-square h-full w-full',
  variants: {
    withBorder: {
      true: 'border-1.5 border-white',
    },
  },
});

export const fallback = tv({
  base: 'flex h-full w-full items-center justify-center rounded-full bg-muted',
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      lg: 'text-lg',
      md: 'text-base',
      sm: 'text-sm',
      xl: 'text-xl',
      xs: 'text-xs',
    },
  },
});
