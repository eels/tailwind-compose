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

## Contents

- [Example](#example)
- [TypeScript Support](#typescript-support)
- [Tailwind CSS Intellisense](#tailwind-css-intellisense)
  - [Visual Studio Code](#visual-studio-code)
  - [Neovim](#neovim)
  - [WebStorm](#webstorm)
- [API Reference](#api-reference)
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
  "bg-orange-100",
  "p-16",
]);

// Create a <Title> React component that implements the following
// Tailwind CSS classes and renders as a <h1> html element
const Title = compose.h1(() => [
  "text-center",
  "text-2xl",
  "text-rose-400",
  "font-serif",
  "font-bold",
  "my-4",
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

## TypeScript Support

`tailwind-compose` has first-class type definition support, making it super easy to get started with your TypeScript project.

Any composed component that you create will infer the underlying base HTML element and attach to it the appropriate attribute types. This means your IDE's Intellisense can autocomplete all available props against your component, ensuring you or your peers are never in the dark.

```jsx
const MyInput = compose.input(() => [ ... ]);
// OR
const MyInput = compose('input', () => [ ... ]);

// Returns the following TypeScript type:
// ComposedComponent<
//    React.ClassAttributes<HTMLInputElement> & React.InputElementAttributes<HTMLInputElement> &
//    Props
// >
```

If you want to ensure that any custom props are type-safe, you can pass your Type Assertions in the following way:

```jsx
interface ButtonProps {
  size: 'small' | 'large';
}

const Button = compose.button<ButtonProps>(() => [ ... ]);
// OR
const Button = compose<'button', ButtonProps>('button', () => [ ... ]);

// Oops! This will throw a type error because the `size` prop has not been defined
<Button />

// Life in beautiful type-safe harmony
<Button size='small' />
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

You can enable autocompletion for `tailwind-compose` using the following steps below.

### Visual Studio Code

1. [Install the "Tailwind CSS IntelliSense" Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
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

1. [Install the Tailwind CSS Language Server extension](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)
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

1. Check the version. Available for [WebStorm 2023.1](https://www.jetbrains.com/webstorm/whatsnew/2023-1/#version-2023-1-tailwind-css-configuration) and later
1. Open the settings and go to [Languages and Frameworks | Style Sheets | Tailwind CSS](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_configuration)
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
 *
 * @param   {string | ComposedComponent | React.ComponentType} element
 * @param   {composer} composer
 * @returns {ComposedComponent}
 */
const Component = compose(element, composer);
```

```jsx
/**
 *
 * @param   {composer} composer
 * @returns {ComposedComponent}
 */
const Component = compose.div(composer);
```

#### `classnames`

```jsx
/**
 *
 * @param   {composer} composer
 * @returns {string}
 */
const Component = classnames(composer);
```

---

#### `composer`

```jsx
/**
 *
 * @callback composer
 * @param    {conditional=} conditional
 * @returns  {string[]}
 */
const composer = (conditional) => classes;
```

#### `conditional`

```jsx
/**
 *
 * @param    {string | string[]} target
 * @param    {condition} condition
 * @returns  {[string | string[], condition]}
 */
conditional(target, condition);
```

#### `condition`

```jsx
/**
 *
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

Sing loud and proud! Let the world know that you're using `tailwind-compose`

[![styled with: tailwind-compose](https://img.shields.io/badge/styled%20with-%F0%9F%8F%97%EF%B8%8F%20tailwind--compose-blue?style=flat-square)](https://github.com/eels/tailwind-compose)

```
[![styled with: tailwind-compose](https://img.shields.io/badge/styled%20with-%F0%9F%8F%97%EF%B8%8F%20tailwind--compose-blue?style=flat-square)](https://github.com/eels/tailwind-compose)
```

## Contributing

Thanks for taking the time to contribute! Before you get started, please take a moment to read through our [contributing guide](https://github.com/eels/tailwind-compose/blob/main/.github/CONTRIBUTING.md). The two focus areas for `tailwind-compose` right now is increasing performance and fixing potential bugs.

However, all issues and PRs are welcome!

## Alternative Packages

This package was primarily designed to meet my own personal goals for working with Tailwind CSS and may not be the right solution for you and your project. If that is the case, here's a short list of alternative packages to consider that may better suit your needs if `tailwind-compose` is not for you.

- [clb](https://github.com/crswll/clb)
- [clsx](https://github.com/lukeed/clsx)
- [cva](https://github.com/joe-bell/cva)
- [twnd](https://github.com/rosswaycaster/twnd)

## License

MIT - see the [LICENSE.md](https://github.com/eels/tailwind-compose/blob/main/LICENSE.md) file for details

## Acknowledgments

- Originally inspired by parts of the [styled-components](https://github.com/styled-components/styled-components) API
- With additional optimisation inspiration from the 1KB alternative - [goober](https://github.com/cristianbote/goober)
