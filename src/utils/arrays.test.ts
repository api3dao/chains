import { hasUniqueObjects } from './arrays';

describe(hasUniqueObjects.name, () => {
  test('returns true for an empty array', () => {
    const items: any[] = [];
    expect(hasUniqueObjects(items, 'id')).toBe(true);
  });

  test('returns false for duplicates based on specified field', () => {
    const items = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 1, name: 'C' },
    ];
    expect(hasUniqueObjects(items, 'id')).toBe(false);
  });

  test('returns true if no duplicates based on specified field', () => {
    const items = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
    ];
    expect(hasUniqueObjects(items, 'id')).toBe(true);
  });

  test('returns true for an array with a single element', () => {
    const items = [{ id: 1, name: 'A' }];
    expect(hasUniqueObjects(items, 'id')).toBe(true);
  });

  test('throws an error for a non-existing field', () => {
    const items = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];
    expect(() => hasUniqueObjects(items, 'nonExistingField')).toThrow('unknown field:nonExistingField on array item');
  });

  test('returns false for duplicates in non-primary field', () => {
    const items = [
      { id: 1, name: 'A' },
      { id: 2, name: 'A' },
    ];
    expect(hasUniqueObjects(items, 'name')).toBe(false);
  });

  test('throws an error given an array of primitives', () => {
    const items = [1, 2, 3, 1];
    expect(() => hasUniqueObjects(items as any, 'id')).toThrow('unknown field:id on array item');
  });

  test('throws an error given an array of different object structures', () => {
    const items = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, 3];
    expect(() => hasUniqueObjects(items, 'id')).toThrow('unknown field:id on array item');
  });
});
