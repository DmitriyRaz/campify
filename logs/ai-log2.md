# Campify – AI Log 2

A business application built with Domain-Scoped Vertical Slice Architecture.

## Development Session Log – Linting & Formatting Setup

This session focused on setting up development hygiene tools including ESLint and Prettier, streamlining manual formatting while intentionally omitting pre-commit automation (Husky/lint-staged) to maintain simplicity during the early build phase.

---

## 1. Linting & Formatting Setup

### ✅ Installed Dev Dependencies

Used the following command to install ESLint, Prettier, and related plugins:

```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier \
eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y \
@typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### ✅ Prettier Configuration

Created a `.prettierrc` file in the root of the project:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

### ✅ ESLint Configuration

Chose to **keep the default** `eslint.config.mjs` (Next.js Flat Config style), which uses:

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
```

No additional plugins or rules were added at this stage to keep the config minimal.

### ✅ Updated `package.json` Scripts

Added scripts for manual linting and formatting:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "eslint . --ext .ts,.tsx --fix",
  "format": "prettier --write ."
}
```

### ❌ Skipped Husky/lint-staged

- Decided to **skip pre-commit automation** (Husky & lint-staged) for now
- Uninstalled them to keep the dev environment lean:

```bash
npm uninstall husky lint-staged
```

--- 

## Summary

- Established linting and formatting foundation using ESLint and Prettier
- Retained Next.js default ESLint Flat Config (`eslint.config.mjs`)
- Enabled manual code hygiene via `npm run lint` and `npm run format`
- Removed unnecessary Git hook tooling for now

This setup keeps the project clean without introducing extra tooling friction during early development.

