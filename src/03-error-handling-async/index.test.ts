import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'Hello, world!';
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
  });
});
