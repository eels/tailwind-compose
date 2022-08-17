import { compose } from 'tailwind-compose';

// --- Basic Component --------------------------

export const BasicHeadline = compose('h1', () => [
  'text-red-400', //
  'mb-4',
]);

// --- Basic Component via property -------------

export const BasicHeadlineProperty = compose.h1(() => [
  'text-red-800', //
  'mb-4',
]);

// --- Extended Component -----------------------

export const ExtendedHeadline = compose(BasicHeadline, () => [
  'underline', //
]);

// --- Basic Component w/ attrs -----------------

export const BasicEmailField = compose.attrs({ type: 'email' })('input', () => [
  'border', //
  'border-red-400',
  'block',
  'mb-4',
]);

// --- Basic Component w/ attrs via property ----

export const BasicEmailFieldProperty = compose.input.attrs({ type: 'email' })(() => [
  'border', //
  'border-red-800',
  'block',
  'mb-4',
]);

// --- Extended Component w/ attrs --------------

const BasicButton = compose.button(() => [
  'bg-red-400', //
  'block',
  'mb-4',
]);

export const ExtendedButton = compose.attrs({ disabled: true })(BasicButton, () => []);

// --- Conditional Class as string --------------

export const CondButtonString = compose.button((conditional) => [
  'bg-red-400', //
  'block',
  'mb-4',
  conditional('text-white', ({ isActive }) => isActive),
]);

// --- Conditional Class as array --------------

export const CondButtonArray = compose.button((conditional) => [
  'bg-red-800', //
  'block',
  'mb-4',
  conditional(['text-white', 'bg-black'], ({ isActive }) => isActive),
]);
