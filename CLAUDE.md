# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**smooth-components** is a React component library that provides elegant, animated UI components. It builds as a library (not an app) using Vite in library mode, outputting ESM and UMD bundles with auto-generated TypeScript declarations. CSS is injected via JS at runtime — no separate stylesheet import is needed by consumers.

## Commands

```bash
npm run dev        # Dev server on port 3000
npm run build      # TypeScript check + Vite library build
npm run lint       # ESLint (flat config, TypeScript-aware)
npm run format     # Prettier --write on entire project
npm run preview    # Preview production build
```

Pre-commit hook (Husky) auto-runs `prettier --write .` and `git add -A` before every commit.

## Architecture

Each component follows a 4-file pattern:

- `src/components/ComponentName.tsx` — Implementation (named export, no default exports)
- `src/types/componentName.d.ts` — Type definitions (use `Pick<CSSProperties, ...>` for style props; note the `.d.ts` extension)
- `src/constants/componentName.ts` — Default values as `SCREAMING_SNAKE_CASE` constants
- `src/styles/componentName.css` — Static styling (CSS classes, pseudo-elements for effects)

All components and their types are re-exported from `src/main.ts`, which is the library entry point. When adding a new component, add its export to `src/main.ts`.

`src/App.tsx` is the dev preview app — it is **not** part of the library build.

There is no test framework configured. The project has no tests.

## Component Conventions

- Props are destructured in the function body with defaults pulled from the constants file
- Dynamic/user-controlled values use inline styles; all static styling lives in CSS files
- CSS uses semantic class names prefixed with the component name (e.g., `.poster-container`, `.poster-image`)
- Style props use a typed subset of `CSSProperties` via `Pick<>`
- Accessibility props like `alt` are required, not optional

## Path Aliases

`@` maps to `./src` — use `@/components/`, `@/constants/`, `@/types/`, `@/styles/` for imports. These are configured in both `tsconfig.json` (for TypeScript) and `vite.config.ts` (for bundling).

## Code Style (enforced by Prettier)

- Single quotes, no semicolons, 2-space indent, 80 char print width, no trailing commas
- Import order (enforced by `@trivago/prettier-plugin-sort-imports`): third-party → `@/*` → `@/assets/*` → `@/components/*` → `@/types/*` → `@/utils/*` → relative imports, with blank line separation

## Build & Tooling

Vite library mode with Tailwind CSS (`@tailwindcss/vite`) produces:

- `dist/smooth-components.js` (ESM)
- `dist/smooth-components.umd.cjs` (UMD, global name: `SmoothComponents`)
- `dist/smooth-components.d.ts` (declarations via `vite-plugin-dts` with rollup types)

React, react-dom, and react/jsx-runtime are externalized (not bundled).

## Publishing

The package is published to npm. After bumping the version in `package.json`, run `npm run build` then `npm publish`. Only the `dist/` directory is included in the published package (`"files": ["dist"]`).
