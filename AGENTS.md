# AGENTS.md

React component library built with Vite **library mode** — not an app. No test framework. See `CLAUDE.md` for the full architecture reference; this file is the agent-relevant subset.

## Commands

- `npm run dev` — dev preview server on port 1111
- `npm run build` — runs `tsc -b` (typecheck) **then** `vite build`. Typecheck failures fail the build; there is no standalone typecheck script
- `npm run lint` — ESLint over the whole repo (flat config, TypeScript-aware)
- `npm run format` — Prettier over the whole repo (the commit hook only formats staged files)
- No tests exist. Verify changes with `npm run build && npm run lint`

## What ships vs what doesn't

- Entrypoint is `src/index.ts`. Every new component **and** its prop types must be re-exported here or consumers can't use them
- `src/main.tsx` + `src/App.tsx` are the dev preview only — never part of the library build
- Skeleton components in `src/components/skeletons/` are internal — do not export from `src/index.ts`
- `dist/` is the only published content (`"files": ["dist"]`). Vite copies `public/` into `dist/` even in library mode, so anything placed there (favicon, logos) ships to npm — don't add preview assets to `public/`

## Per-component file pattern

Each component: `src/components/ComponentName.tsx` (PascalCase, **named export, no default**), plus `src/types/componentName.ts`, `src/constants/componentName.ts`, `src/styles/componentName.css` (camelCase). Add `src/utils/` only for non-trivial logic, `src/services/` only for external fetches. Reusable icons in `src/icons/`, animated icons with imperative handles in `src/assets/animatedIcons/`.

## Conventions (agent-missable)

- `verbatimModuleSyntax` is on — type-only imports **must** use `import type`
- `@` aliases `./src` (`@/components/`, `@/types/`, …). Import order is enforced by Prettier plugin: third-party → `@/components` → `@/constants` → `@/services` → `@/styles` → `@/types` → `@/utils` → relative, blank-line separated
- Style: single quotes, no semicolons, no trailing commas, 80 col
- Tailwind is installed (`@tailwindcss/vite`) but unused — write plain CSS with `.component-name`-prefixed semantic classes, BEM-style `--modifier` variants
- `motion` is the animation library (bundled prod dep); React/react-dom are externalized peer deps (18 || 19)
- Dynamic values via inline styles; static styling in CSS files. Props default from the constants file
- Cursor-driven effects: set CSS custom properties via `element.style.setProperty()` inside a `requestAnimationFrame` callback (see `Poster`'s `--rotate-x` pattern) — do not use React state for mouse-move frequency updates. Throttle with `rafRef` + `pendingMouseRef`
- CSS is injected at runtime by `vite-plugin-css-injected-by-js` — consumers import no stylesheet
- CSS comments may be in Spanish — don't rewrite or translate them

## Pre-commit hook (Husky) quirks

The hook is **not a full safety net**:

- Alias-import rule and ESLint only run on staged `.js/.jsx` files — `.ts/.tsx` are skipped. The repo has no `.js/.jsx` sources, so the hook's lint/alias checks never fire. Always run `npm run lint` yourself
- Prettier runs on **all** staged files and re-stages them — expect files to be reformatted at commit time
- `package-lock.json` is gitignored (untracked) — lockfile changes never appear in `git status`

## Publishing

Use release scripts — they bump version, build, and publish in one step (`npm run release:patch` → stable; `release:pre*` → `--tag next`). Don't hand-run `npm publish`; it skips the version bump.
