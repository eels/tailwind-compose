import { cc } from '@src/utilities/combine-classes';
import { classnames } from '@src/core/classnames';
import { generateClassesArray } from '@src/utilities/generate-classes-array';

jest.mock('@src/utilities/combine-classes');
jest.mock('@src/utilities/generate-classes-array');

describe('core/classnames', () => {
  const mockCC = cc as jest.Mock;
  const mockGenerateClassesArray = generateClassesArray as jest.Mock;

  beforeEach(() => {
    mockCC.mockImplementation(() => jest.fn());
    mockGenerateClassesArray.mockImplementation(() => jest.fn(() => jest.fn()));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function', () => {
    const classes = () => [];
    const classnamesInstance = classnames()(classes);

    expect(classnamesInstance).toBeInstanceOf(Function);
  });

  it('should call the `cc` and `generateClassesArray` functions', () => {
    const classes = () => [];
    const props = {};
    const classnamesInstance = classnames()(classes);

    const mockReturnValue: string[] = [];
    const mockGenerateClassesArrayPropCurry = jest.fn(() => mockReturnValue);

    mockGenerateClassesArray.mockImplementation(
      jest.fn(() => {
        return mockGenerateClassesArrayPropCurry;
      }),
    );

    classnamesInstance(props);
    expect(generateClassesArray).toHaveBeenCalledWith(classes);
    expect(mockGenerateClassesArrayPropCurry).toHaveBeenCalledWith(props);
    expect(cc).toHaveBeenCalledWith(mockReturnValue, undefined);
  });

  it('should use an empty props object if none is provided', () => {
    const classes = () => [];
    const classnamesInstance = classnames()(classes);

    const mockGenerateClassesArrayPropCurry = jest.fn();

    mockGenerateClassesArray.mockImplementation(
      jest.fn(() => {
        return mockGenerateClassesArrayPropCurry;
      }),
    );

    classnamesInstance();
    expect(mockGenerateClassesArrayPropCurry).toHaveBeenCalledWith({});
  });
});
