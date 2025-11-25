# Repository Guidelines

## Project Structure & Module Organization
- `src/index.ts` re-exports the core API; treat it as the canonical entry point.
- `src/core/` contains DOM measurement, connection math, storage helpers, and shared types; add new platform-agnostic logic here.
- `src/react/` wraps the core in React bindings; mirror the core file names when exposing hooks or components.
- `dist/` holds the tsup build artifacts tracked by npm publishing, while `scripts/` houses versioning and release utilities; leave generated files untouched.

## Build, Test, and Development Commands
- `npm run build` (tsup) bundles both ESM and CJS outputs plus declarations; run before publishing.
- `npm run dev` watches the TypeScript sources with tsup for local iteration.
- `npm run typecheck` executes `tsc --noEmit`; use it as a lint gate until runtime tests are added.
- `npm run release` chains the version bump scripts and emits distributable artifacts; ensure `dist/` is clean first.

## Coding Style & Naming Conventions
- TypeScript files use 2-space indentation, ES modules, and named exports; avoid default exports to keep tree-shaking predictable.
- Prefer explicit `type` imports (`import type { Pos }`) and keep interfaces colocated with their consumers in `types.ts` when shared.
- Follow existing filename patterns (`dom.ts`, `connections.ts`) to signal responsibilities; React wrappers should append `Provider`, `Hook`, or `Overlay` for clarity.
- Semicolons are omitted and template literals are used for DOM path strings—match that style to minimize diff noise.

## Testing Guidelines
- There are currently no automated tests; until a harness exists, rely on `npm run typecheck` plus manual verification in a demo React app.
- When introducing tests, place unit specs beside the module (`src/core/storage.test.ts`) and keep names `<feature>.test.ts`.
- Aim for smoke coverage on DOM math and storage persistence before modifying release scripts.

## Commit & Pull Request Guidelines
- Existing history uses short, imperative subjects ("Initial repository setup"); keep messages under 72 characters and elaborate in the body if context is needed.
- Reference related issues in the PR description, describe DOM scenarios you validated, and attach screenshots when UI overlays change.
- Open PRs should list any manual verification steps (`npm run build`, local Storybook, etc.) so reviewers can repeat them quickly.
