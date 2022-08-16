import { construct } from '@src/lib/construct';
import { createElement, createRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ConstructOptions, ExtendableObject } from '@types';
import type { RefObject } from 'react';

type Blank = ExtendableObject<never>;

describe('lib/construct', () => {
  it('should render a basic element', () => {
    const parameters: ConstructOptions<Blank, Blank> = {
      classes: () => ['text-black'],
      target: 'h1',
    };

    render(createElement(construct(parameters)));
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveClass('text-black');
  });

  it('should render a basic element with additional attrs', () => {
    const parameters: ConstructOptions<Blank, { type: string }> = {
      attrs: { type: 'text' },
      classes: () => ['text-black'],
      target: 'input',
    };

    render(createElement(construct(parameters)));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('text-black');
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('should render a basic element without passing non-valid props as attributes', () => {
    const parameters: ConstructOptions<{ noneValidProp: boolean }, { noneValidAttr: boolean }> = {
      attrs: { noneValidAttr: true },
      classes: () => ['text-black'],
      target: 'h1',
    };

    render(createElement(construct(parameters), { noneValidProp: true }));
    expect(screen.getByRole('heading')).not.toHaveAttribute('noneValidProp');
    expect(screen.getByRole('heading')).not.toHaveAttribute('noneValidAttr');
  });

  it('should render the correct element when `as` is supplied', () => {
    const parameters: ConstructOptions<{ 'as': string; 'data-testid': string }, Blank> = {
      classes: () => ['text-black'],
      target: 'h1',
    };

    render(createElement(construct(parameters), { 'as': 'div', 'data-testid': 'heading' }));
    expect(screen.getByTestId('heading')).toBeInTheDocument();
    expect(screen.getByTestId('heading').tagName).toBe('DIV');
    expect(screen.getByTestId('heading')).toHaveClass('text-black');
  });

  it('should allow passed children to be rendered', () => {
    const parameters: ConstructOptions<{ 'as': string; 'data-testid': string }, Blank> = {
      classes: () => [],
      target: 'h1',
    };

    const child = createElement('span', { 'data-testid': 'child' }, 'hello world');

    render(createElement(construct(parameters), undefined, child));
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should successfully forward and update react refs', () => {
    const ref = createRef<Element>();
    const parameters: ConstructOptions<{ ref: RefObject<Element> }, Blank> = {
      classes: () => [],
      target: 'h1',
    };

    const element = createElement(construct(parameters), { ref });

    expect(ref.current).toBeNull();
    render(element);
    expect(typeof ref.current).toBe('object');
  });

  it('should extend any additional `className` value provided via props', () => {
    const parameters: ConstructOptions<{ className: string }, Blank> = {
      classes: () => ['text-black'],
      target: 'h1',
    };

    render(createElement(construct(parameters), { className: 'custom-class' }));
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveClass('text-black custom-class');
  });

  it('should extend any additional `className` value provided via attrs', () => {
    const parameters: ConstructOptions<Blank, { className: string }> = {
      attrs: { className: 'custom-class' },
      classes: () => ['text-black'],
      target: 'h1',
    };

    render(createElement(construct(parameters)));
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveClass('text-black custom-class');
  });

  it('should render an extended component', () => {
    const parameters: ConstructOptions<Blank, Blank> = {
      classes: () => ['text-black'],
      target: 'h1',
    };

    parameters.target = construct(parameters);
    parameters.classes = () => ['underline'];

    render(createElement(construct(parameters)));
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveClass('text-black underline');
  });

  it('should correctly render and pass `className` prop to a non-string target', () => {
    const button = ({ className }: { className: string }) => {
      return createElement('button', { className, disabled: true }, 'click me');
    };

    const parameters: ConstructOptions<{ className: string }, Blank> = {
      classes: () => ['text-black'],
      target: button,
    };

    render(createElement(construct(parameters)));
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('text-black');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should update conditional classes when props update', () => {
    const parameters: ConstructOptions<{ isEnabled: boolean; onClick: () => void }, Blank> = {
      classes: (conditional) => [conditional('underline', ({ isEnabled }) => isEnabled)],
      target: 'button',
    };

    const Wrapper = () => {
      const [isEnabled, setIsEnabled] = useState(false);
      const handleOnClick = () => setIsEnabled((state) => !state);

      return createElement(construct(parameters), { isEnabled, onClick: handleOnClick });
    };

    render(createElement(Wrapper));

    expect(screen.getByRole('button')).not.toHaveClass('underline');

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveClass('underline');
  });
});
