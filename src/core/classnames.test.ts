import cc from '@src/utils/combine-classes';
import generateClassesArray from '@src/utils/generate-classes-array';
import { classnames } from '@src/core/classnames';

jest.mock('@src/utils/combine-classes');
jest.mock('@src/utils/generate-classes-array');

describe('core/classnames', () => {
  beforeEach(() => {
    (cc as jest.Mock).mockImplementation(() => jest.fn());
    (generateClassesArray as jest.Mock).mockImplementation(() => jest.fn(() => jest.fn()));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function', () => {
    const classes = () => [];
    const classnamesInstance = classnames(classes);

    expect(classnamesInstance).toBeInstanceOf(Function);
  });

  it('should call the `cc` and `generateClassesArray` functions', () => {
    const classes = () => [];
    const props = {};
    const classnamesInstance = classnames(classes);

    const mockGenerateClassesArrayReturnValue: string[] = [];
    const mockGenerateClassesArrayPropCurry = jest.fn(() => mockGenerateClassesArrayReturnValue);
    const mockGenerateClassesArray = jest.fn(() => mockGenerateClassesArrayPropCurry);

    (generateClassesArray as jest.Mock).mockImplementation(mockGenerateClassesArray);

    classnamesInstance(props);
    expect(generateClassesArray).toHaveBeenCalledWith(classes);
    expect(mockGenerateClassesArrayPropCurry).toHaveBeenCalledWith(props);
    expect(cc).toHaveBeenCalledWith(mockGenerateClassesArrayReturnValue);
  });

  it('should use an empty props object if none is provided', () => {
    const classes = () => [];
    const classnamesInstance = classnames(classes);

    const mockGenerateClassesArrayPropCurry = jest.fn();
    const mockGenerateClassesArray = jest.fn(() => mockGenerateClassesArrayPropCurry);

    (generateClassesArray as jest.Mock).mockImplementation(mockGenerateClassesArray);

    classnamesInstance();
    expect(mockGenerateClassesArrayPropCurry).toHaveBeenCalledWith({});
  });
});
