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

Pre-commit hook (Husky) auto-runs Prettier on all files before every commit.

## Architecture

Each component follows a 4-file pattern:

- `src/components/ComponentName.tsx` — Implementation (named export, no default exports)
- `src/types/componentName.d.ts` — Type definitions (use `Pick<CSSProperties, ...>` for style props)
- `src/constants/componentName.ts` — Default values as `SCREAMING_SNAKE_CASE` constants
- `src/styles/componentName.css` — Static styling (CSS classes, pseudo-elements for effects)

All components are re-exported from `src/main.ts`, which is the library entry point.

`src/App.tsx` is the dev preview app — it is **not** part of the library build.

## Component Conventions

- Props are destructured in the function body with defaults pulled from the constants file
- Dynamic/user-controlled values use inline styles; all static styling lives in CSS files
- CSS uses semantic class names prefixed with the component name (e.g., `.poster-container`, `.poster-image`)
- Style props use a typed subset of `CSSProperties` via `Pick<>`
- Accessibility props like `alt` are required, not optional

## Path Aliases

`@` maps to `./src` — use `@/components/`, `@/constants/`, `@/types/`, `@/styles/` for imports.

## Code Style (enforced by Prettier)

- Double quotes, semicolons, 2-space indent, 120 char print width, ES5 trailing commas
- Import order (enforced by `@trivago/prettier-plugin-sort-imports`): third-party → `@/assets` → `@/constants` → `@/components` → `@/types` → relative imports, with blank line separation

## Build Output

Vite library mode produces:

- `dist/smooth-components.js` (ESM)
- `dist/smooth-components.umd.cjs` (UMD, global name: `SmoothComponents`)
- `dist/smooth-components.d.ts` (declarations via `vite-plugin-dts` with rollup types)

React and react-dom are externalized (not bundled).
