import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { deepEqual } from './deep-equal';

describe('deepEqual', () => {
  test('primitive values', () => {
    assert.ok(deepEqual(1, 1));
    assert.ok(deepEqual('hello', 'hello'));
    assert.ok(deepEqual(true, true));

    assert.equal(deepEqual(1, '1'), false);
    assert.equal(deepEqual(true, 1), false);
  });

  test('arrays', () => {
    assert.ok(deepEqual([1, 2, 3], [1, 2, 3]));
    assert.ok(deepEqual([1, [2, 3]], [1, [2, 3]]));

    assert.equal(deepEqual([1, 2, 3], [1, 2, 3, 4]), false);
    assert.equal(deepEqual([1, [2, 3]], [1, [2, 4]]), false);
  });

  test('objects', () => {
    const obj1 = { a: 1, b: { c: 2, d: { e: 3 } } };
    const obj2 = { a: 1, b: { c: 2, d: { e: 3 } } };
    const obj3 = { a: 1, b: { c: 2, d: { e: 4 } } };

    assert.ok(deepEqual(obj1, obj2));

    assert.equal(deepEqual(obj1, obj3), false);
  });

  test('objects with different key orders', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { b: 2, a: 1, c: 3 };

    assert.ok(deepEqual(obj1, obj2));
  });

  test('null and undefined values', () => {
    assert.ok(deepEqual(null, null));
    assert.ok(deepEqual(undefined, undefined));
    assert.ok(deepEqual({ a: null }, { a: null }));

    assert.equal(deepEqual(null, undefined), false);
    assert.equal(deepEqual({ a: null }, { a: undefined }), false);
  });

  test('function values', () => {
    const func1 = (): void => {};
    const func2 = (): void => {};

    assert.ok(deepEqual(func1, func1));
    assert.equal(deepEqual(func1, func2), false);
  });
});
