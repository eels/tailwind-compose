import generateClassesArray, { conditional } from './generate-classes-array';

describe('utils/conditional', () => {
  it('should return a tuple', () => {
    const condition = () => true;

    expect(conditional('bg-white', condition)).toEqual(['bg-white', condition]);
  });
});

describe('utils/generateClassesArray', () => {
  it('should return a callable function', () => {
    const classes = ['bg-black', 'text-lg', 'p-4'];
    const composedClasses = generateClassesArray(() => classes);

    expect(typeof composedClasses).toBe('function');
  });

  it('should return a class array from the provided basic string array', () => {
    const classes = ['bg-black', 'text-lg', 'p-4'];
    const composedClasses = generateClassesArray(() => classes);

    expect(composedClasses()).toEqual(classes);
  });

  it('should pass the `conditional` function to the compose callback', () => {
    const classes = ['bg-black', 'text-lg', 'p-4'];
    const callback = jest.fn(() => classes);
    const composedClasses = generateClassesArray(callback);

    composedClasses();

    expect(callback).toHaveBeenCalledWith(conditional);
  });

  it('should conditionally compose a single string class value', () => {
    interface ExampleProps {
      value: boolean;
    }

    const composedClasses = generateClassesArray<ExampleProps>((conditional) => {
      return ['bg-black', conditional('p-4', ({ value }) => value)];
    });

    expect(composedClasses({ value: true })).toEqual(['bg-black', 'p-4']);
    expect(composedClasses({ value: false })).toEqual(['bg-black']);
  });

  it('should conditionally compose an array of string class values', () => {
    interface ExampleProps {
      value: boolean;
    }

    const composedClasses = generateClassesArray<ExampleProps>((conditional) => {
      return ['bg-black', conditional(['p-4', 'text-white'], ({ value }) => value)];
    });

    expect(composedClasses({ value: true })).toEqual(['bg-black', 'p-4', 'text-white']);
    expect(composedClasses({ value: false })).toEqual(['bg-black']);
  });
});
