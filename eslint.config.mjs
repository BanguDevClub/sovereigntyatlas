import js from '@eslint/js';
import tsPlugin from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  ...tsPlugin.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'src/data/**',
      '.agents/**',
      '.grok/**',
      'scripts/**'
    ]
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ]
    }
  }
];

