# AGENTS.md

## Critical commands

- `npm run build` — TypeScript check + Vite library build (run before committing)
- `npm run lint` — ESLint (flat config, TS-aware)
- `npm run format` — Prettier with import sorting
- `npm run dev` — Vite dev server on port 1111

No test framework exists. Don't look for tests.

## Gotchas

- **Library, not app.** Builds to ESM+UMD via Vite library mode. React is externalized (peer dep).
- **verbatimModuleSyntax ON.** Always `import type { X }` for type-only imports. Plain `import { X }` will fail tsc.
- **Pre-commit hook only lints JS/JSX.** It skips TS/TSX files for both the `@/` alias check and ESLint. You won't see lint errors on `.ts/.tsx` until CI or manual `npm run lint`.
- **Import order enforced by Prettier, not ESLint.** The `@trivago/prettier-plugin-sort-imports` plugin sorts: third-party → `@/components` → `@/constants` → ... → relative. Run `npm run format` to fix.
- **`motion` is the only production dep.** Use it for animations. React/react-dom are peer deps.
- **CSS comments may be in Spanish.** Don't "fix" them.
- **Path alias `@/`** maps to `./src`. Use `@/components/`, `@/types/`, etc.
- **CSS is injected at runtime.** No separate stylesheet import needed by consumers.
- **Named exports only.** No default exports in components.
- **`alt` is required** on Poster and similar components. Accessibility props are not optional.
