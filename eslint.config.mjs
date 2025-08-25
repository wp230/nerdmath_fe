import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  {
    rules: {
      // TypeScript 관련 규칙 완화
      '@typescript-eslint/no-explicit-any': 'warn', // error → warn
      '@typescript-eslint/no-require-imports': 'warn', // error → warn
      '@typescript-eslint/no-unused-vars': 'warn', // error → warn

      // React 관련 규칙 완화
      'react-hooks/exhaustive-deps': 'warn', // error → warn

      // Next.js 관련 규칙 완화
      '@next/next/no-img-element': 'warn', // error → warn
    },
  },
];

export default eslintConfig;
