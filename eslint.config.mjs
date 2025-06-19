import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    'node_modules',
    'tsconfig.json',
    'package.json',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    'dist',
    'build',
    'coverage',
    '.next',
    '.nuxt',
    '.output',
    '.vercel',
    '.cache',
    '.vscode',]),
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
