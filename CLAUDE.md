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

Pre-commit hook (Husky) runs three checks on staged files before every commit:

1. Enforces `@/` alias imports — blocks relative imports that go beyond the same directory (e.g., `../`) in `.js/.jsx` files only (not `.ts/.tsx`)
2. Runs ESLint on staged `.js/.jsx` files only (not `.ts/.tsx`)
3. Runs Prettier on **all** staged files and re-stages them

## Architecture

Each component follows a 4-file pattern with up to 3 optional extras:

- `src/components/ComponentName.tsx` — Implementation, **PascalCase** filename (named export, no default exports)
- `src/types/componentName.ts` — Type definitions, **camelCase** filename (use `Pick<CSSProperties, ...>` for style props)
- `src/constants/componentName.ts` — Default values, **camelCase** filename, `SCREAMING_SNAKE_CASE` constants
- `src/styles/componentName.css` — Static styling, **camelCase** filename (CSS classes, pseudo-elements for effects)
- `src/utils/componentName.ts` — Helper functions, **camelCase** filename (only when the component needs non-trivial logic like calculations or formatting)
- `src/services/componentName.ts` — API/fetch logic, **camelCase** filename (only when the component fetches external data)

Reusable SVG icons live in `src/icons/ComponentName.tsx` (PascalCase, named exports).

All components and their types are re-exported from `src/index.ts`, which is the library entry point. When adding a new component, add its named export **and** its prop types export to `src/index.ts`.

The dev preview app lives in two files — `src/main.tsx` (entry point with `createRoot`) and `src/App.tsx` (preview JSX). Neither is part of the library build. Dev-only styles live in `src/styles/index.css`.

There is no test framework configured. The project has no tests.

## Component Conventions

- Props are destructured in the function body with defaults pulled from the constants file
- Dynamic/user-controlled values use inline styles; all static styling lives in CSS files
- CSS uses semantic class names prefixed with the component name (e.g., `.poster-container`, `.poster-image`). Variant classes use BEM-style modifiers (e.g., `.poster-container--no-frame`, `.poster-container--frame-sm`). CSS comments may be in Spanish
- Style props use a typed subset of `CSSProperties` via `Pick<>`
- Accessibility props like `alt` are required, not optional
- `verbatimModuleSyntax` is enabled in `tsconfig.json` — always use `import type` for type-only imports
- Components that fetch external data (e.g., BundlephobiaWidget) manage their own loading/error states internally
- For cursor-driven interactive effects, set CSS custom properties directly via `element.style.setProperty()` inside a `requestAnimationFrame` callback (see `Poster` with `--rotate-x`, `--rotate-y`, `--x`, `--y`). The CSS then reads these vars with fallbacks (e.g., `var(--rotate-x, 0deg)`). This avoids React re-renders for high-frequency mouse events. Throttle with a `rafRef` + `pendingMouseRef` pattern to deduplicate frames.

## Path Aliases

`@` maps to `./src` — use `@/components/`, `@/constants/`, `@/types/`, `@/styles/`, `@/utils/` for imports. These are configured in both `tsconfig.json` (for TypeScript) and `vite.config.ts` (for bundling).

## Code Style (enforced by Prettier)

- Single quotes, no semicolons, 2-space indent, 80 char print width, no trailing commas
- Import order (enforced by `@trivago/prettier-plugin-sort-imports`): third-party → `@/components/*` → `@/constants/*` → `@/services/*` → `@/styles/*` → `@/types/*` → `@/utils/*` → relative imports, with blank line separation

## Build & Tooling

Vite library mode with Tailwind CSS (`@tailwindcss/vite`) produces the following outputs. Note: Tailwind is available via the Vite plugin, but existing components use CSS puro with semantic classes prefixed by component name — prefer this convention for consistency.

- `dist/smooth-components.js` (ESM)
- `dist/smooth-components.umd.cjs` (UMD, global name: `SmoothComponents`)
- `dist/smooth-components.d.ts` (declarations via `vite-plugin-dts` with rollup types)

React, react-dom, and react/jsx-runtime are externalized (not bundled). They are declared as `peerDependencies` (React 18 or 19). The `motion` library (Framer Motion successor) is a production dependency bundled into the output — use it for animations.

CSS is injected into the DOM at runtime via `vite-plugin-css-injected-by-js`, so consumers don't need a separate CSS import. The `package.json` also exports `./dist/smooth-components.css` as a fallback for consumers who prefer manual CSS loading.

## Publishing

Use the release scripts — they bump the version, build, and publish in one step:

```bash
npm run release:patch   # x.x.X  → stable
npm run release:minor   # x.X.0  → stable
npm run release:major   # X.0.0  → stable
npm run release:prepatch   # x.x.X-0 → published with --tag next
npm run release:preminor   # x.X.0-0 → published with --tag next
npm run release:premajor   # X.0.0-0 → published with --tag next
```

Only the `dist/` directory is included in the published package (`"files": ["dist"]`).
