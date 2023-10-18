import { toUpperSnakeCase } from './strings';

describe(toUpperSnakeCase.name, () => {
  test('converts simple words', () => {
    const result = toUpperSnakeCase('hello world');
    expect(result).toEqual('HELLO_WORLD');
  });

  test('keeps numbers in the string', () => {
    const result = toUpperSnakeCase('hello world 4');
    expect(result).toEqual('HELLO_WORLD_4');
  });

  test('trims leading and trailing whitespaces', () => {
    const result = toUpperSnakeCase('  hello world  ');
    expect(result).toEqual('HELLO_WORLD');
  });

  test('converts special characters to underscores', () => {
    const result = toUpperSnakeCase('hello,world!');
    expect(result).toEqual('HELLO_WORLD');
  });

  test('converts special characters and spaces to underscores', () => {
    const result = toUpperSnakeCase('hello, world!');
    expect(result).toEqual('HELLO_WORLD');
  });

  test('converts multiple spaces to single underscores', () => {
    const result = toUpperSnakeCase('hello  world');
    expect(result).toEqual('HELLO_WORLD');
  });

  test('returns an empty string when given an empty string', () => {
    const result = toUpperSnakeCase('');
    expect(result).toEqual('');
  });

  test('converts mixed case strings', () => {
    const result = toUpperSnakeCase('Hello World');
    expect(result).toEqual('HELLO_WORLD');
  });
});
