import { OPTIONS } from '@src/utilities/options';

describe('utils/options', () => {
  it('should be map instance', () => {
    expect(OPTIONS.constructor === Map).toBe(true);
  });
});
