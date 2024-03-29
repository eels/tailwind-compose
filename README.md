<div align="center">
  <h1>
    <br />
    <div>:building_construction:</div>
    <br />
    <div>Tailwind Compose</div>
    <br />
  </h1>
  <br />
  <div>Easily abstract and compose your React Tailwind classes</div>
  <br />
  <a href="https://www.npmjs.com/package/tailwind-compose"><img src="https://img.shields.io/npm/v/tailwind-compose?style=flat-square" /></a>
  <a href="https://coveralls.io/github/eels/tailwind-compose"><img src="https://img.shields.io/coveralls/github/eels/tailwind-compose?label=Coverage&style=flat-square" /></a>
  <a href="https://github.com/eels/tailwind-compose/actions/workflows/codeql-analysis.yml"><img src="https://img.shields.io/github/actions/workflow/status/eels/tailwind-compose/codeql-analysis.yml?brand=main&label=CodeQL&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/tailwind-compose"><img src="https://img.shields.io/npm/dm/tailwind-compose?label=Downloads&style=flat-square" /></a>
  <a href="https://unpkg.com/tailwind-compose@latest/dist/tailwind-compose.module.js"><img src="https://img.badgesize.io/https:/unpkg.com/tailwind-compose@latest/dist/tailwind-compose.module.js?label=Gzip%20Size&style=flat-square&compression=gzip" /></a>
  <br /><br />
  <pre>yarn add <a href="https://www.npmjs.com/package/tailwind-compose">tailwind-compose</a></pre>
  <h1></h1>
</div>

## Motivation

Like many, the first time I saw Tailwind CSS I thought, "Absolutely not". I maintained this view for a while before finally using it in earnest during a large build project. Now I get it. I can admit that Tailwind CSS _is_ good. But I still have issues with the DX.

Even with the smallest of components, I find long lists of class names difficult to manage and quickly understand. After factoring in prop-based style variations, my code always becomes a string-interpolated mess, and I feel stressed. Maybe that's just how my brain works. Or doesn't work in this case.

Of course, there are already [solutions to this out there](#alternative-packages), and `tailwind-compose` is just my take on it. Taking what I love about the well-established `styled` API, it aims to be a [tiny](https://bundlephobia.com/package/tailwind-compose) drop-in tool for making your brain and your components feel okay.

Maybe it's the right solution for you too, or maybe it's not, and that's okay.


## Contents

- [Example](#example)
- [Conditional Styles / Component Variants](#conditional-styles--component-variants)
  - [Transient Props](#transient-props)
- [Extending Components](#extending-components)
- [Using `as`](#using-as)
- [Using `attrs`](#using-attrs)
- [`tailwind-compose` Without Tailwind CSS](#tailwind-compose-without-tailwind-css)
- [No React? No Problem!](#no-react-no-problem)
- [Execution Hooks](#execution-hooks)
  - [Example with `tailwind-merge`](#example-with-tailwind-merge)
- [TypeScript Support](#typescript-support)
- [Tailwind CSS Intellisense](#tailwind-css-intellisense)
  - [Visual Studio Code](#visual-studio-code)
  - [Neovim](#neovim)
  - [WebStorm](#webstorm)
- [API Reference](#api-reference)
  - [compose](#compose)
  - [compose.attrs](#composeattrs)
  - [compose.toClass](#composetoclass)
  - [classnames](#classnames)
  - [defineConfig](#defineconfig)
  - [composer](#composer)
  - [attrsFactory](#attrsfactory)
  - [conditional](#conditional)
  - [condition](#condition)
- [Browser Support](#browser-support)
- [Badge](#badge)
- [Contributing](#contributing)
- [Alternative Packages](#alternative-packages)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Example

```jsx
import React from 'react';
import { compose } from 'tailwind-compose';

// Create a <Wrapper> React component that implements the following
// Tailwind CSS classes and renders as a <section> html element
const Wrapper = compose.section(() => [
  'bg-orange-100',
  'p-16',
]);

// Create a <Title> React component that implements the following
// Tailwind CSS classes and renders as a <h1> html element
const Title = compose.h1(() => [
  'text-center',
  'text-2xl',
  'text-rose-400',
  'font-serif',
  'font-bold',
  'my-4',
]);

// Use them like regular React components – except they're styled!
function Application() {
  return (
    <Wrapper>
      <Title>Hello World, this is my first composed component!</Title>
    </Wrapper>
  );
}
```

This is what you'll see in your browser:

![Tailwind Compose example usage](https://github.com/eels/tailwind-compose/assets/86960670/08c785a7-20cb-4200-a585-4185b0de405e)

[Open in CodeSandbox](https://codesandbox.io/p/sandbox/distracted-framework-q9m9ks?file=%2Fsrc%2Fcomponents%2Fapplication.jsx%3A14%2C15)

## Conditional Styles / Component Variants

When creating your composed components, you may need to apply certain classes only when the component has a specific prop state. To achieve this, the composer callback accepts a function as its only argument (named here `conditional`) that takes both a class and a callback that must return a value that evaluates to either `true` or `false` based on the component's available props.

If the expression is `true`, the class is added; if it is `false`, it is not. Simple!

See the [conditional](#conditional) API Reference for more details.

```jsx
const Button = compose.button((conditional) => [
  'bg-red-500',
  'text-red-50',
  conditional('text-xl', ({ $isLarge }) => $isLarge),
]);

<Button />
// outputs <button class="bg-red-500 text-red-50">

<Button $isLarge />
// outputs <button class="bg-red-500 text-red-50 text-xl">
```

Alternatively, you can use the shorthand Tuple syntax and omit the call to the `conditional` function.

```jsx
const Button = compose.button(() => [
  'bg-red-500',
  'text-red-50',
  ['text-xl', ({ $isLarge }) => $isLarge],
]);
```

The `conditional` function can also instead take an array of classes, which can be combined with other `conditional` definitions to build up a series of variant states that your component can take on.

```jsx
const Button = compose.button((conditional) => [
  conditional(
    [
      'bg-red-500',
      'text-red-50',
    ],
    ({ $isSecondary }) => !$isSecondary
  ),
  conditional(
    [
      'bg-blue-500',
      'text-blue-50',
    ],
    ({ $isSecondary }) => $isSecondary
  ),
]);

<Button />
// outputs <button class="bg-red-500 text-red-50">

<Button $isSecondary />
// outputs <button class="bg-blue-500 text-blue-50">
```

### Transient Props

To prevent props that are only meant to be consumed by your composed components from being passed to the underlying React node or rendered to the DOM element, you can prefix them with a dollar sign (`$`), turning them into a transient prop.

In the above example, `$isSecondary` is not rendered to the final DOM element.

## Extending Components

As you start to build out your component library, you may wish to use a component but slightly change or build upon its styling. While you could use conditional classes and props to do this, depending on how many alterations you make, this could quickly become unmaintainable.

To simplify the process, you can just extend an existing composed component and supply it with a list of additional classes you wish to attach, resulting in a new component that is the best of both worlds.

```jsx
const Button = compose.button(() => [
  'bg-red-500',
  'text-red-50',
]);
// outputs <button class="bg-red-500 text-red-50">

const BorderedButton = compose(Button, () => [
  'border',
  'border-red-700'
]);
// outputs <button class="bg-red-500 text-red-50 border border-red-700">
```

This also works for custom components, as long as they pass the `className` prop to a DOM element.

```jsx
function CustomButton({ children, className }) {
  return <button className={className}>{children}</button>;
}

const ComposedCustomButton = composed(CustomButton, () => [
  'bg-red-500',
  'text-red-50',
]);

<ComposedCustomButton />
// outputs <button class="bg-red-500 text-red-50">
```

You can also pass extra classes to individual component instances at runtime via the `className` prop.

```jsx
<Button className='border border-red-700' />
// outputs <button class="bg-red-500 text-red-50 border border-red-700">
```

## Using `as`

All composed components are polymorphic, meaning you are able to alter the way they render after they have been created by using the `as` prop. This keeps all the styling that has been applied to a component but just switches out what is ultimately being rendered (be it a different HTML element or a different custom component).

```jsx
const Button = compose.button(() => [ ... ]);

// This component will render as a `div` element instead of a `button`
<Button as='div' />
```

## Using `attrs`

Occasionally, you may know ahead of time if your component will always use the same static prop values, such as an input element having a set `type` property. By using the `attrs` method, you can implicitly set any static prop values that should be passed down to every instance of your component.

Furthermore, you can also use the `attrs` method to attach default values for your dynamic transient props.

```jsx
const TextField = compose.input.attrs({ $hasIcon: false, type: 'text' })(() => [ ... ]);

// This will render with the `type` attribute implicitly set
// from the original declaration
<TextField />

// You can also locally override any attributes that are defined above
<TextField $hasIcon={true} type='email' />
```

```jsx
// For extended components, you can define attributes in the same way
const EmailField = styled(TextField, () => [ ... ]).attrs({ type: 'email' });
```

The `attrs` method also accepts a callback function that receives the props that the composed component will receive. The return value of this function will be merged into the resulting props.

```jsx
const Button = compose.button.attrs((props) => ({ $size: props.$size }))(() => [ ... ]);

```

## `tailwind-compose` Without Tailwind CSS

Despite the name, `tailwind-compose` can be used entirely without Tailwind CSS. At its core, `tailwind-compose` is just a string concatenation library meaning, you can use any utility-first CSS framework of choice or even just your own classes!

```jsx
import styles from './styles.css';

const Button = compose.button(() => [
  styles.button,
  'our-custom-class',
  'whatever-you-want-to-concatenate'
]);

<Button />
// outputs <button class="button_1234567890 our-custom-class whatever-you-want-to-concatenate">
```

## No React? No Problem!

While primarily designed to be used within React-based projects, `tailwind-compose` also exports its underlying string concatenation functionality as a standalone method. This means you can bring `tailwind-compose` into projects of all flavours and retain all of its great features.

```jsx
import { classnames } from 'tailwind-compose';

const button = classnames((conditional) => [
  'bg-red-500',
  'text-red-50',
  conditional('text-xl', ({ isLarge }) => isLarge),
]);

button();
// outputs "bg-red-500 text-red-50"

button({ isLarge: true });
// outputs "bg-red-500 text-red-50 text-xl"
```

## Execution Hooks

Inspired by [Joe Bell](https://github.com/joe-bell)'s work on [cva](https://github.com/joe-bell/cva).

`tailwind-compose` allows you to perform additional custom logic to the concatenated class string by defining a global event handler for the `onDone` event. This can be particularly useful if you want to combine `tailwind-compose` with a utility function such as [`tailwind-merge`](https://github.com/dcastil/tailwind-merge).

### Example with `tailwind-merge`

```jsx
// tailwind-compose.config.ts

import { DefineConfigOptions, defineConfig } from 'tailwind-compose';
import { twMerge } from 'tailwind-merge';

const config: DefineConfigOptions = {
  hooks: {
    onDone: (className) => twMerge(className),
  },
};

export const { classname, compose } = defineConfig(config);
```

```jsx
// components/button.ts

import { classnames, compose } from '../tailwind-compose.config';

const button = classnames(() => [
  'bg-orange-100',
  'bg-red-500',
]);

const Button = compose.button(() => [
  'bg-orange-100',
  'bg-red-500',
]);

button();
// outputs "bg-red-500"

<Button />
// outputs <button class="bg-red-500">
```

## TypeScript Support

`tailwind-compose` has first-class type definition support, making it super easy to get started with your TypeScript project.

Any composed component that you create will infer the underlying base HTML element and attach the appropriate attribute types to it. This means your IDE's Intellisense can autocomplete all available props against your component, ensuring you or your peers are never in the dark.

```jsx
const MyInput = compose.input(() => [ ... ]);

// Returns the following TypeScript type:
// ComposedComponent<
//    React.ClassAttributes<HTMLInputElement> & React.InputElementAttributes<HTMLInputElement> &
//    Props
// >
```

If you want to ensure that any custom props are type-safe, you can pass your Type Assertions in the following way:

```jsx
interface ButtonProps {
  $size: 'small' | 'large';
}

const Button = compose.button<ButtonProps>(() => [ ... ]);
// OR
const Button = compose<'button', ButtonProps>('button', () => [ ... ]);

// Oops! This will throw a type error because the `size` prop has not been defined
<Button />

// Life in beautiful type-safe harmony
<Button $size='small' />
```

Additionally, extended components have their types transferred to your newly created composed variant.

```jsx
interface ExampleComponentProps {
  className?: string;
  icon: 'tick' | 'cross';
  large: boolean;
}

function ExampleComponent({ className, icon, large }: ExampleProps) {
  return (
    <div className={className}>
      <Icon icon={icon} large={large} />
    </div>
  );
}

const ComposedExampleComponent = composed(ExampleComponent, () => [ ... ]);

// Returns the following TypeScript type:
// ComposedComponent<ExampleComponentProps>
```

## Tailwind CSS Intellisense

You can enable autocompletion for `tailwind-compose` using the following steps below:

### Visual Studio Code

1. [Install the "Tailwind CSS IntelliSense" Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).
1. Add the following to your [settings.json](https://code.visualstudio.com/docs/getstarted/settings):

```json
{
  "tailwindCSS.experimental.classRegex": [
    [
      "(?:classnames|compose).+\\[((?:.|\n)*?)\\]\\)",
      "[\"'`](.*?)[\"'`]"
    ]
  ],
}
```

### Neovim

1. [Install the Tailwind CSS Language Server extension](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss).
1. Add the following configuration:

```lua
lspconfig.tailwindcss.setup({
  settings = {
    tailwindCSS = {
      experimental = {
        classRegex = {
          {
            "(?:classnames|compose).+\\[((?:.|\n)*?)\\]\\)",
            "[\"'`](.*?)[\"'`]"
          },
        },
      },
    },
  },
})
```

### WebStorm

1. Check the version. Available for [WebStorm 2023.1](https://www.jetbrains.com/webstorm/whatsnew/2023-1/#version-2023-1-tailwind-css-configuration) and later.
1. Open the settings and go to [Languages and Frameworks | Style Sheets | Tailwind CSS](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_configuration).
1. Add the following to your Tailwind CSS configuration:

```json
{
  "experimental": {
    "classRegex": [
      "(?:classnames|compose).+\\[((?:.|\n)*?)\\]\\)",
      "[\"'`](.*?)[\"'`]"
    ]
  }
}
```

## API Reference

#### `compose`

```jsx
/**
 * Create a composed component from a variable target
 * @param   {string | ComposedComponent | React.ComponentType} element
 * @param   {composer} composer
 * @returns {ComposedComponent}
 */
const Component = compose(element, composer);
```

```jsx
/**
 * Create a composed component from a set element
 * @param   {composer} composer
 * @returns {ComposedComponent}
 */
const Component = compose.div(composer);
```

#### `compose.attrs`

```jsx
/**
 * Create a composed component from a variable target w/ defined static attributes
 * @param   {object | attrsFactory} attributes
 * @param   {string | ComposedComponent | React.ComponentType} element
 * @param   {composer} composer
 * @returns {ComposedComponent}
 */
const Component = compose(element, composer).attrs(attributes);
```

```jsx
/**
 * Create a composed component from a set element w/ defined static attributes
 * @param   {object | attrsFactory} attributes
 * @param   {composer} composer
 * @returns {ComposedComponent}
 */
const Component = compose.div.attrs(attributes)(composer);
```

#### `compose.toClass`

```jsx
const Component = compose(element, composer);
// OR
const Component = compose.div(composer);

/**
 * Create a composed classlist from an existing composed component
 * @param   {object=} props
 * @returns {string}
 */
const classlist = Component.toClass(props);
```

#### `classnames`

```jsx
/**
 * Create a composed classlist
 * @param   {composer} composer
 * @returns {string}
 */
const Component = classnames(composer);
```

#### `defineConfig`

```jsx
/**
 * Generate a set of `tailwind-compose` functions with custom configurations
 * @param   {object} config
 * @param   {object} config.hooks.onDone
 * @returns {object}
 */
const { classnames, compose } = defineConfig(config);
```

---

#### `composer`

```jsx
/**
 * Callback to create a composed classlist
 * @callback composer
 * @param    {conditional=} conditional
 * @returns  {string[]}
 */
const composer = (conditional) => classes;
```

#### `attrsFactory`

```jsx
/**
 * Callback to create an attributes object
 * @callback attrsFactory
 * @param    {object=} props
 * @returns  {object}
 */
const attrsFactory = (props) => props;
```

#### `conditional`

```jsx
/**
 * Syntactic sugar to compose a conditional classlist tuple
 * @param    {string | string[]} target
 * @param    {condition} condition
 * @returns  {[string | string[], condition]}
 */
const conditional = conditional(target, condition);
```

#### `condition`

```jsx
/**
 * Callback to evaluate whether a given condition is truthy
 * @callback condition
 * @param    {object=} props
 * @returns  {boolean}
 */
const condition = (props) => boolean;
```

## Browser Support

`tailwind-compose` should work in all major modern browsers out-of-the-box (Chrome, Edge, Firefox, Safari).

To add support for browsers IE 11 and older, ensure you add polyfills for the following features:

- [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#polyfill)
- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## Badge

Sing loud and proud! Let the world know that you're using `tailwind-compose`.

[![styled with: tailwind-compose](https://img.shields.io/badge/styled%20with-%F0%9F%8F%97%EF%B8%8F%20tailwind--compose-blue?style=flat-square)](https://github.com/eels/tailwind-compose)

```
[![styled with: tailwind-compose](https://img.shields.io/badge/styled%20with-%F0%9F%8F%97%EF%B8%8F%20tailwind--compose-blue?style=flat-square)](https://github.com/eels/tailwind-compose)
```

## Contributing

Thanks for taking the time to contribute! Before you get started, please take a moment to read through our [contributing guide](https://github.com/eels/tailwind-compose/blob/main/.github/CONTRIBUTING.md). The two focus areas for `tailwind-compose` right now are increasing performance and fixing potential bugs.

However, all issues and PRs are welcome!

## Alternative Packages

This package was primarily designed to meet my own personal goals for working with Tailwind CSS and may not be the right solution for you and your project. If that is the case, here's a short list of alternative packages to consider that may better suit your needs if `tailwind-compose` is not for you.

- [clb](https://github.com/crswll/clb)
- [clsx](https://github.com/lukeed/clsx)
- [cva](https://github.com/joe-bell/cva)
- [twnd](https://github.com/rosswaycaster/twnd)

## License

MIT - see the [LICENSE.md](https://github.com/eels/tailwind-compose/blob/main/LICENSE.md) file for details.

## Acknowledgments

- Originally inspired by parts of the [styled-components](https://github.com/styled-components/styled-components) API
- With additional optimisation inspiration from the 1KB alternative, [goober](https://github.com/cristianbote/goober)
