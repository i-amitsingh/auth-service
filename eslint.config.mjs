// @ts-check

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        ignores: [
            'node_modules',
            'dist',
            'build',
            'eslint.config.mjs',
            'jest.config.cjs',
            'vitest.config.ts',
            'vite.config.ts',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,ts}'],
        rules: {
            'no-console': 'error',
            'dot-notation': 'error',
        },
    },
]);
