import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "error",
      "no-duplicate-case": 'error',
      "no-duplicate-imports": 'error',
      "no-empty-pattern": 'error',
      "no-fallthrough": 'error',
      "no-useless-assignment": 'error',
      "consistent-return": 'error',
      "curly": 'error',
      "max-params": ['error', { max: 3 }],
      "no-console": 'warn',
      "no-else-return": 'error',
      "no-empty": 'error',
      "no-empty-function": 'error',
      "no-inline-comments": 'error',
      "no-magic-numbers": 'error',
      "no-nested-ternary": 'error',
      "no-redeclare": 'error',
      "no-useless-catch": 'error',
      "sort-imports": 'error',
      "sort-keys": 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
