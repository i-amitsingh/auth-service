// @ts-check

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,ts}'],
        ignores: ['node_modules', 'dist', 'build'],
        rules: {
            'no-console': 'error',
            'dot-notation': 'error',
        },
    },
]);
