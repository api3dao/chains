module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['plugin:@api3/eslint-plugin-commons/universal', 'plugin:@api3/eslint-plugin-commons/jest'],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
  },
  rules: {
    // TypeScript
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/camelcase': 0,

    // eslint-plugin-import
    'import/namespace': [2, { allowComputed: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index', 'object', 'type'],
        pathGroups: [{ pattern: 'mock-utils', group: 'builtin', patternOptions: { matchBase: true, nocomment: true } }],
      },
    ],

    // ESLint
    'no-console': 0,
    'no-useless-escape': 0,
    semi: 2,
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],

    // Jest
    'jest/no-conditional-in-test': 0,

    // Unicorn
    'unicorn/prefer-string-replace-all': 0,
    'unicorn/prefer-type-error': 0,

    // Lodash
    'lodash/prefer-lodash-typecheck': 0,
    'lodash/prefer-noop': 0,
  },
};
