import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { toUpperSnakeCase } from './strings';

describe('toUpperSnakeCase', () => {
  test('converts simple words', () => {
    const result = toUpperSnakeCase('hello world');
    assert.equal(result, 'HELLO_WORLD');
  });

  test('keeps numbers in the string', () => {
    const result = toUpperSnakeCase('hello world 4');
    assert.equal(result, 'HELLO_WORLD_4');
  });

  test('trims leading and trailing whtestespaces', () => {
    const result = toUpperSnakeCase('  hello world  ');
    assert.equal(result, 'HELLO_WORLD');
  });

  test('converts special characters to underscores', () => {
    const result = toUpperSnakeCase('hello, world!');
    assert.equal(result, 'HELLO_WORLD');
  });

  test('converts multiple spaces to single underscores', () => {
    const result = toUpperSnakeCase('hello  world');
    assert.equal(result, 'HELLO_WORLD');
  });

  test('returns an empty string when given an empty string', () => {
    const result = toUpperSnakeCase('');
    assert.equal(result, '');
  });

  test('converts mixed case strings', () => {
    const result = toUpperSnakeCase('Hello World');
    assert.equal(result, 'HELLO_WORLD');
  });
});
