module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    env: {
      node: true,
      es2021: true,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': 'warn',
    },
  };
  