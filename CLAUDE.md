# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**smooth-components** is a React component library that provides elegant, animated UI components. It builds as a library (not an app) using Vite in library mode, outputting ESM and UMD bundles with auto-generated TypeScript declarations. CSS is injected via JS at runtime — no separate stylesheet import is needed by consumers.

## Commands

```bash
npm run dev        # Dev server on port 1111
npm run build      # TypeScript check + Vite library build
npm run lint       # ESLint (flat config, TypeScript-aware)
npm run format     # Prettier --write on entire project
npm run preview    # Preview production build
```

Pre-commit hook (Husky) auto-runs `prettier --write .` and `git add -A` before every commit.

## Architecture

Each component follows a 4-file pattern:

- `src/components/ComponentName.tsx` — Implementation, **PascalCase** filename (named export, no default exports)
- `src/types/componentName.d.ts` — Type definitions, **camelCase** filename (use `Pick<CSSProperties, ...>` for style props; note the `.d.ts` extension)
- `src/constants/componentName.ts` — Default values, **camelCase** filename, `SCREAMING_SNAKE_CASE` constants
- `src/styles/componentName.css` — Static styling, **camelCase** filename (CSS classes, pseudo-elements for effects)

All components and their types are re-exported from `src/index.ts`, which is the library entry point. When adding a new component, add its named export **and** its prop types export to `src/index.ts`.

The dev preview app lives in two files — `src/main.tsx` (entry point with `createRoot`) and `src/App.tsx` (preview JSX). Neither is part of the library build. Dev-only styles live in `src/styles/index.css`.

There is no test framework configured. The project has no tests.

## Component Conventions

- Props are destructured in the function body with defaults pulled from the constants file
- Dynamic/user-controlled values use inline styles; all static styling lives in CSS files
- CSS uses semantic class names prefixed with the component name (e.g., `.poster-container`, `.poster-image`). Variant classes use BEM-style modifiers (e.g., `.poster-container--no-frame`, `.poster-container--frame-sm`). CSS comments may be in Spanish
- Style props use a typed subset of `CSSProperties` via `Pick<>`
- Accessibility props like `alt` are required, not optional

## Path Aliases

`@` maps to `./src` — use `@/components/`, `@/constants/`, `@/types/`, `@/styles/` for imports. These are configured in both `tsconfig.json` (for TypeScript) and `vite.config.ts` (for bundling).

## Code Style (enforced by Prettier)

- Single quotes, no semicolons, 2-space indent, 80 char print width, no trailing commas
- Import order (enforced by `@trivago/prettier-plugin-sort-imports`): third-party → `@/*` → `@/assets/*` → `@/components/*` → `@/types/*` → `@/utils/*` → relative imports, with blank line separation

## Build & Tooling

Vite library mode with Tailwind CSS (`@tailwindcss/vite`) produces the following outputs. Note: Tailwind is available via the Vite plugin, but existing components use CSS puro with semantic classes prefixed by component name — prefer this convention for consistency.

- `dist/smooth-components.js` (ESM)
- `dist/smooth-components.umd.cjs` (UMD, global name: `SmoothComponents`)
- `dist/smooth-components.d.ts` (declarations via `vite-plugin-dts` with rollup types)

React, react-dom, and react/jsx-runtime are externalized (not bundled). They are declared as `peerDependencies` (React 18 or 19).

CSS is injected into the DOM at runtime via `vite-plugin-css-injected-by-js`, so consumers don't need a separate CSS import. The `package.json` also exports `./dist/smooth-components.css` as a fallback for consumers who prefer manual CSS loading.

## Publishing

The package is published to npm. After bumping the version in `package.json`, run `npm run build` then `npm publish`. Only the `dist/` directory is included in the published package (`"files": ["dist"]`).
