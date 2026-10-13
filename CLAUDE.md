# CLAUDE.md

## Stack (actual, as of now)
- Frontend: React 19 + Vite 8, plain JS/JSX (no TypeScript configured — `@types/react` is dev-only for editor intellisense). Path alias `@/*` → `src/*` is configured in both `vite.config.js` (resolve.alias) and `jsconfig.json` (for editor intellisense) — required by shadcn.
- Styling: Tailwind CSS v4 via `@tailwindcss/vite` plugin. v4 is CSS-first — there is **no `tailwind.config.js`**; theme/config lives in `src/index.css` via `@import 'tailwindcss'` and `@theme inline`.
- UI components: shadcn/ui is initialized (`components.json`, style `radix-nova`, base color `neutral`, Radix primitives, Lucide icons). Deps: `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `tw-animate-css`, `@fontsource-variable/geist`. First component (`button`) and `src/lib/utils.js` (the `cn()` helper) already exist. Add more with `npx shadcn@latest add <component>` — they land in `src/components/ui/`.
- Backend: none exists yet. Task description says "Node backend" but there is no server code, no `server/` or `api/` directory, and no backend deps in `package.json`. Treat backend as greenfield — ask/decide on structure when the first backend work actually comes up.
- Lint: `oxlint`, config at root `.oxlintrc.json` (react + oxc plugins). `.gitignore` also lives at root.
- No test framework is configured anywhere in the repo.
- Not a git repo (no `.git`) — don't assume git commands work.
- `src/index.css` token map: pre-existing brand tokens (`--text`, `--text-h`, `--bg`, `--code-bg`, `--brand`, `--brand-bg`, `--brand-border`, `--social-bg`, `--shadow`, font vars) coexist with shadcn's semantic tokens (`--background`, `--foreground`, `--primary`, `--accent`, `--border`, etc.). They were originally named `--accent`/`--accent-bg`/`--accent-border` and collided with shadcn's own `--accent` (different meaning: brand purple vs. neutral hover bg) — renamed to `--brand*` to resolve it. `--border` was kept merged into shadcn's token since both served the same "divider color" purpose with near-identical values.
- Dark mode is currently OS-driven only (`@media (prefers-color-scheme: dark)` on `:root`, no toggle UI). shadcn's convention is a `.dark` class toggle (`@custom-variant dark (&:is(.dark *))` is already set up for this). Both the media-query block and a `.dark` class block exist in `index.css` with matching values — the media query is what's live today; the `.dark` class block is inert until a theme toggle is built, at which point wire it up (e.g. `next-themes` or a simple class-on-`<html>` state) rather than duplicating values again.

## Commands
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run oxlint
- No test command exists.

## Folder layout
```
src/
  main.jsx          # entrypoint, mounts <App/>
  App.jsx           # current root component (still default Vite template content — placeholder, not real app UI yet)
  App.css           # component-scoped CSS (Vite template leftover, uses --brand* tokens now)
  index.css         # Tailwind import, shadcn base import, CSS custom properties (brand + shadcn semantic tokens), @theme inline, @layer base
  lib/utils.js      # shadcn's cn() helper (clsx + tailwind-merge)
  components/ui/    # shadcn components (currently: button.jsx)
  assets/           # images/logos
public/             # static files served as-is (favicon.svg, icons.svg)
index.html          # Vite HTML entry
vite.config.js      # plugins: @vitejs/plugin-react, @tailwindcss/vite; resolve.alias '@' -> src
jsconfig.json       # '@/*' path mapping for editor intellisense
components.json     # shadcn config (style, aliases, base color, icon lib)
```
Compose app-level components in `src/components/` (create as needed), above/alongside `src/components/ui/`. Shared hooks go in `src/hooks/` (aliased in `components.json`, not created yet).

## Hard rules — UI
- Build UI **only** with shadcn/ui components and Radix UI primitives. Never install or use another component library — no MUI, Ant Design, Chakra, Mantine, Bootstrap, NextUI, Headless UI, etc.
- If shadcn doesn't have a needed component, compose it from Radix primitives + Tailwind. Don't pull in a new dependency and don't hand-roll from scratch when a Radix primitive covers it.
- Don't rebuild what shadcn already provides (Button, Dialog, Dropdown, Tabs, Form controls, etc.) — extend or compose the existing component instead of writing a parallel one.
- Styling stays in Tailwind utility classes and shadcn's `cva` variants. Avoid separate `.css`/`.scss` files unless there's genuinely no other option (e.g. the existing global tokens in `index.css`, or a case Tailwind can't express).
- Existing brand CSS custom properties in `src/index.css` (`--text`, `--bg`, `--brand`, etc., with a dark-mode override block) predate Tailwind and are still in use alongside shadcn's semantic tokens — see the token-map note above. Don't reintroduce a new `--accent`/`--border`-style name collision; check both token sets before adding one.

## Workflow: Building from Figma
Goal is a fully interactive prototype, not static screens.

1. **Inspect first.** Before writing any code, walk the Figma file's pages/frames/flows and summarize what screens and flows exist, including the states shown (empty, loading, error, success). Present that summary before building.
2. **Cover everything.** Every screen and every flow in the file gets built, including all states shown for each screen.
3. **Wire real interaction, not decoration.** Routing, modals, tabs, multi-step forms, dropdowns, and every interactive element shown should actually work end to end — clicking through the prototype should feel like using a real app, not paging through screenshots.
4. **Match the design closely** on layout, spacing, typography, color, and interaction states (hover/focus/active/disabled) — but prefer a prototype that feels real and fully navigable over pixel-perfect polish on any single screen.
5. **Use realistic placeholder data** and local component state for anything dynamic (lists, form inputs, toggles, counters, etc.) — no lorem-ipsum-only static content where real interaction is implied.
6. **Ambiguous interactions:** when the static design doesn't specify behavior, make a sensible UX call and explicitly note the assumption (in the response, not silently).
7. Use the `figma-*` skills (figma-design-to-code, figma-generate-design, figma-use, etc.) and the Figma MCP tools for reading designs — don't hand-transcribe from screenshots alone if MCP access to the file is available.
8. All resulting UI still follows the Hard rules above — shadcn/Radix + Tailwind only, compose don't duplicate.
