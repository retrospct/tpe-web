import { capitalize } from '../capitalize';

describe('capitalize', () => {
  it('should capitalize a simple string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should return an already capitalized string as is', () => {
    expect(capitalize('World')).toBe('World');
  });

  it('should return an empty string as is', () => {
    expect(capitalize('')).toBe('');
  });
});
