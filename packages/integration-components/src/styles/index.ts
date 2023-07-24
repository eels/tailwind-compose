import * as React from 'react';
import { classnames, compose } from 'tailwind-compose';

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

export const BasicEmailFieldProperty = compose.input.attrs({ type: 'button' })(() => [
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

export const ExtendedButton = compose.attrs({ disabled: true })(BasicButton, () => []);

// --- Conditional Class as string Component ----

export const CondButtonString = compose.button((conditional) => [
  'bg-red-400', //
  'block',
  'mb-4',
  conditional('text-white', ({ isActive }) => isActive),
]);

// --- Conditional Class as array Component -----

export const CondButtonArray = compose.button((conditional) => [
  'bg-red-800', //
  'block',
  'mb-4',
  conditional(['text-white', 'bg-black'], ({ isActive }) => isActive),
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
  conditional('text-white', ({ isActive }) => isActive),
]);

// --- Conditional ClassNames as array ----------

export const CondClassNamesButtonArray = classnames((conditional) => [
  'bg-red-800', //
  'block',
  'mb-4',
  conditional(['text-white', 'bg-black'], ({ isActive }) => isActive),
]);

// --- Typescript type tests --------------------

interface ExampleProps {
  className?: string;
  isTestProp: boolean;
}

interface WebComponent {
  id: string;
}

function MockComponent({ className }: ExampleProps) {
  return React.createElement('div', { className });
}

const ExampleComponentA = compose<'input', ExampleProps>('input', () => []);
const ExampleComponentB = compose(ExampleComponentA, () => []);
const ExampleComponentC = compose<WebComponent>('my-component', () => []);
const ExampleComponentD = compose(MockComponent, () => []);
const ExampleComponentE = compose.input<ExampleProps>(() => []);
const ExampleComponentF = compose.input.attrs({ type: 'text' })(() => []);

const ExampleComponentZ = ExampleComponentA.toClass({ isTestProp: true });

(() => [
  ExampleComponentA,
  ExampleComponentB,
  ExampleComponentC,
  ExampleComponentD,
  ExampleComponentE,
  ExampleComponentF,
  ExampleComponentZ,
])();
