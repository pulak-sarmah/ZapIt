import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

import prettierPlugin from 'eslint-plugin-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    rules: {
      'no-undef': 'off',
      'no-console': 'warn',
    },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];
