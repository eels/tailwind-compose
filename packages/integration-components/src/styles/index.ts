import * as React from 'react';
import { classnames, compose } from '../tailwind-compose.config';

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

export const BasicEmailField = compose('input', () => [
  'border', //
  'border-red-400',
  'block',
  'mb-4',
]).attrs({ type: 'email' });

// --- Basic Component w/ attrs via property ----

export const BasicEmailFieldProperty = compose.input.attrs({ type: 'email' })(() => [
  'border', //
  'border-red-800',
  'block',
  'mb-4',
]);

// --- Extended Component w/ attrs --------------

export const BasicButton = compose.button(() => [
  'bg-red-400', //
  'block',
  'mb-4',
]);

export const ExtendedButton = compose(BasicButton, () => []).attrs({ disabled: true });

// --- Conditional Class as string Component ----

export const CondButtonString = compose.button((conditional) => [
  'bg-red-400', //
  'block',
  'mb-4',
  conditional('text-white', ({ $isActive }) => $isActive),
]);

// --- Conditional Class as array Component -----

export const CondButtonArray = compose.button((conditional) => [
  'bg-red-800', //
  'block',
  'mb-4',
  conditional(['text-white', 'bg-black'], ({ $isActive }) => $isActive),
]);

// --- Basic ClassNames -------------------------

export const BasicClassNamesHeadline = classnames(() => [
  'text-red-400', //
  'mb-4',
]);

// --- Conditional ClassNames as string ---------

export const CondClassNamesButtonString = classnames((conditional) => [
  'bg-red-400', //
  'block',
  'mb-4',
  conditional('text-white', ({ $isActive }) => $isActive),
]);

// --- Conditional ClassNames as array ----------

export const CondClassNamesButtonArray = classnames((conditional) => [
  'bg-red-800', //
  'block',
  'mb-4',
  conditional(['text-white', 'bg-black'], ({ $isActive }) => $isActive),
]);

// --- Execution hooks --------------------------

export const HookedHeadline = compose.h1(() => [
  'text-red-800', //
  'text-red-900',
  'mb-4',
]);

export const HookedClassNamesHeadline = classnames(() => [
  'text-red-800', //
  'text-red-900',
  'mb-4',
]);

// --- Typescript type tests --------------------

interface ExampleProps {
  $isTestProp: boolean;
  className?: string;
}

interface WebComponent {
  id: string;
}

function MockComponent({ className }: ExampleProps) {
  return React.createElement('div', { className });
}

export const ExampleComponentA = compose('input', () => []);
export const ExampleComponentB = compose(ExampleComponentA, () => []);
export const ExampleComponentC = compose('my-component', () => []);
export const ExampleComponentD = compose(MockComponent, () => []);
export const ExampleComponentE = compose.input(() => []);

export const ExampleComponentF = compose<'input', ExampleProps>('input', () => []);
export const ExampleComponentG = compose(ExampleComponentF, () => []);
export const ExampleComponentH = compose<WebComponent>('my-component', () => []);
export const ExampleComponentI = compose.input<ExampleProps>(() => []);

export const ExampleComponentJ = compose('input', () => []).attrs({ type: 'text' });
export const ExampleComponentK = compose(ExampleComponentJ, () => []).attrs({ type: 'email' });
export const ExampleComponentL = compose('my-component', () => []).attrs({ type: 'text' });
export const ExampleComponentM = compose(MockComponent, () => []).attrs({ $isTestProp: true });
export const ExampleComponentN = compose.input.attrs({})(() => []);

export const ExampleComponentO = compose<'input', ExampleProps>('input', () => []).attrs({});
export const ExampleComponentP = compose(ExampleComponentF, () => []).attrs({});
export const ExampleComponentQ = compose<WebComponent>('my-component', () => []).attrs({});
export const ExampleComponentS = compose.input.attrs<ExampleProps>({})<ExampleProps>(() => []);

export const ExampleComponentZ = ExampleComponentA.toClass({ $isTestProp: true });
