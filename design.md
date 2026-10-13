# Design System Foundations

Source of truth: Figma file **"Agency Height Design System"**
(`fileKey: 8UNCVujwLVpdKGFk7woC53`), pulled directly via the Figma MCP
server (`get_variable_defs`, and the Plugin API through `use_figma` for
data the Variables API doesn't expose — effect styles and prototype
reactions). Every value below was read from the file, not invented. Where
a section has no corresponding Figma data, that is stated explicitly
rather than filled in with a guess.

Figma exposes exactly **5 variable collections**, each with a single mode
(this file defines one theme — there is no light/dark mode data in
Figma's variables):

| Collection | Variables | Modes |
|---|---|---|
| `_colors_primitives` | 139 | 1 |
| `Tokens` (semantic) | 60 | 1 |
| `Typography` | 26 | 1 |
| `spacing` | 10 | 1 |
| `radius` | 5 | 1 |

These map onto this repo's `src/index.css` (see [cross-check](#cross-check-against-this-repos-tokens) below).

---

## Color primitives

Raw palette from the `_colors_primitives` collection, grouped by family exactly as Figma groups them.

### Neutrals

| Token | Value | Usage/notes |
|---|---|---|
| `neutral-1` | `#ffffff` | |
| `neutral-2` | `#fafafa` | |
| `neutral-3` | `#f5f7fc` | |
| `neutral-4` | `#e6e9f0` | |
| `neutral-5` | `#dbdfeb` | |
| `neutral-6` | `#d1d6e5` | |
| `neutral-7` | `#b8becf` | |
| `neutral-8` | `#a0a7b9` | |
| `neutral-9` | `#8990a3` | |
| `neutral-10` | `#717789` | |
| `neutral-11` | `#5a5f70` | |
| `neutral-12` | `#191919` | |

### Brand

| Token | Value | Usage/notes |
|---|---|---|
| `brand-1` | `#f8f9ff` | |
| `brand-2` | `#edefff` | |
| `brand-3` | `#e1e5ff` | |
| `brand-4` | `#caceff` | |
| `brand-5` | `#b3b8f5` | |
| `brand-6` | `#a1a6e8` | |
| `brand-7` | `#9094db` | |
| `brand-8` | `#7f82ce` | |
| `brand-9` | `#6f71c1` | |
| `brand-10` | `#5c5dad` | |
| `brand-11` | `#4b4999` | |
| `brand-12` | `#2e2b68` | |
| `brand-a20` | `rgba(111,113,193,0.20)` | alpha variant |
| `brand-a30` | `rgba(111,113,193,0.30)` | alpha variant |
| `brand-a50` | `rgba(111,113,193,0.50)` | alpha variant |
| `brand-a60` | `rgba(111,113,193,0.60)` | alpha variant |

### Error Red

| Token | Value | Usage/notes |
|---|---|---|
| `error-red-1` | `#fffafa` | |
| `error-red-2` | `#fff8f7` | |
| `error-red-3` | `#ffe6e4` | |
| `error-red-4` | `#ffb5ae` | |
| `error-red-5` | `#ff8078` | |
| `error-red-6` | `#f36960` | |
| `error-red-7` | `#e65147` | |
| `error-red-8` | `#d9352c` | |
| `error-red-9` | `#cc0000` | |
| `error-red-10` | `#aa0a06` | |
| `error-red-11` | `#890e09` | |
| `error-red-12` | `#63121c` | |
| `error-red-a20` | `rgba(204,0,0,0.20)` | alpha variant |

### Info Blue

| Token | Value |
|---|---|
| `info-blue-1` | `#f7feff` |
| `info-blue-2` | `#effaff` |
| `info-blue-3` | `#dbeafe` |
| `info-blue-4` | `#b6cffd` |
| `info-blue-5` | `#93b4fb` |
| `info-blue-6` | `#78a1f8` |
| `info-blue-7` | `#5d8df4` |
| `info-blue-8` | `#4279f0` |
| `info-blue-9` | `#2563eb` |
| `info-blue-10` | `#2159e1` |
| `info-blue-11` | `#1d4ed8` |
| `info-blue-12` | `#172554` |

### Primary Red

| Token | Value | Usage/notes |
|---|---|---|
| `primary-red-1` | `#fffafb` | Not referenced by any token in the `Tokens` collection — appears unused/legacy in the Figma file itself. |
| `primary-red-2` | `#feeaeb` | |
| `primary-red-3` | `#f2d8d9` | |
| `primary-red-4` | `#f8b9b7` | |
| `primary-red-5` | `#fa9995` | |
| `primary-red-6` | `#f88882` | |
| `primary-red-7` | `#f6766f` | |
| `primary-red-8` | `#f3635b` | |
| `primary-red-9` | `#f04d46` | |
| `primary-red-10` | `#dc3932` | |
| `primary-red-11` | `#c8221b` | |
| `primary-red-12` | `#96201b` | |

### Secondary Blue

| Token | Value | Usage/notes |
|---|---|---|
| `secondary-blue-1` | `#dee9fc` | |
| `secondary-blue-2` | `#cad9f3` | |
| `secondary-blue-3` | `#b0c0e8` | |
| `secondary-blue-4` | `#97a8dc` | |
| `secondary-blue-5` | `#7f90d0` | |
| `secondary-blue-6` | `#6878c4` | |
| `secondary-blue-7` | `#5160a7` | |
| `secondary-blue-8` | `#3c498a` | |
| `secondary-blue-9` | `#2d2e67` | This is the actual color behind the semantic "Primary" role — see semantic table below. |
| `secondary-blue-10` | `#262758` | |
| `secondary-blue-11` | `#1f2542` | |
| `secondary-blue-12` | `#0c121d` | |
| `secondary-blue-700` | `#17253a` | Irregular numbering (breaks the 1–12 pattern) |
| `secondary-blue-800` | `#0e1725` | Irregular numbering |

### Success Green

| Token | Value |
|---|---|
| `success-green-1` | `#f2fff2` |
| `success-green-2` | `#ebffeb` |
| `success-green-3` | `#d4fad4` |
| `success-green-4` | `#b0f2b5` |
| `success-green-5` | `#89e996` |
| `success-green-6` | `#7ddf8c` |
| `success-green-7` | `#71d483` |
| `success-green-8` | `#65ca79` |
| `success-green-9` | `#58c070` |
| `success-green-10` | `#4aa56d` |
| `success-green-11` | `#3d8a68` |
| `success-green-12` | `#265c56` |

### Tertiary Blue

| Token | Value |
|---|---|
| `tertiary-blue-1` | `#f9fdff` |
| `tertiary-blue-2` | `#f3fafe` |
| `tertiary-blue-3` | `#ecf4f9` |
| `tertiary-blue-4` | `#d6e7f2` |
| `tertiary-blue-5` | `#c1dbeb` |
| `tertiary-blue-6` | `#a5cae2` |
| `tertiary-blue-7` | `#88bad9` |
| `tertiary-blue-8` | `#6ca0bf` |
| `tertiary-blue-9` | `#5086a6` |
| `tertiary-blue-10` | `#336d8d` |
| `tertiary-blue-11` | `#135575` |
| `tertiary-blue-12` | `#003d5e` |

### Warning Yellow

| Token | Value |
|---|---|
| `warning-yellow-1` | `#fffeee` |
| `warning-yellow-2` | `#fffee4` |
| `warning-yellow-3` | `#fcf2cf` |
| `warning-yellow-4` | `#fbeaad` |
| `warning-yellow-5` | `#fbe288` |
| `warning-yellow-6` | `#fbdb74` |
| `warning-yellow-7` | `#fbd55e` |
| `warning-yellow-8` | `#face42` |
| `warning-yellow-9` | `#fac712` |
| `warning-yellow-10` | `#f4b30d` |
| `warning-yellow-11` | `#ed9f07` |
| `warning-yellow-12` | `#b67a08` |

### Black (alpha) / White (alpha)

| Token | Value | Usage/notes |
|---|---|---|
| `black-alpha-8` | `rgba(0,0,0,0.08)` | |
| `black-alpha-12` | `rgba(0,0,0,0.12)` | |
| `black-alpha-16` | `rgba(0,0,0,0.16)` | |
| `black-alpha-24` | `rgba(0,0,0,0.24)` | |
| `black-alpha-40` | `rgba(0,0,0,0.40)` | |
| `black-alpha-56` | `rgba(0,0,0,0.56)` | |
| `black-alpha-64` | `rgba(0,0,0,0.64)` | |
| `black-alpha-72` | `rgba(0,0,0,0.72)` | |
| `black-alpha-90` | `rgba(0,0,0,0.90)` | |
| `white` | `#ffffff` | opaque |
| `white-alpha-2` | `rgba(255,255,255,0.02)` | |
| `white-alpha-4` | `#ffffff` (opaque, alpha 1) | **This is exactly what Figma defines** — alpha 1, not 0.04. Not a transcription error on our end. |
| `white-alpha-6` | `rgba(255,255,255,0.06)` | |
| `white-alpha-8` | `rgba(255,255,255,0.08)` | |
| `white-alpha-10` | `rgba(255,255,255,0.10)` | |
| `white-alpha-12` | `rgba(255,255,255,0.12)` | |
| `white-alpha-16` | `rgba(255,255,255,0.16)` | |
| `white-alpha-24` | `rgba(255,255,255,0.24)` | |
| `white-alpha-40` | `rgba(255,255,255,0.40)` | |
| `white-alpha-56` | `rgba(255,255,255,0.56)` | |
| `white-alpha-64` | `rgba(255,255,255,0.64)` | |
| `white-alpha-72` | `rgba(255,255,255,0.72)` | |
| `white-alpha-80` | `rgba(255,255,255,0.80)` | |
| `white-alpha-88` | `rgba(255,255,255,0.88)` | |

---

## Color semantic tokens

From the `Tokens` collection — every one of these is a Figma **alias** onto a primitive above, not an independent value. "Value" below shows the resolved primitive.

### Border

| Token | Aliases | Value |
|---|---|---|
| `border-default` | `neutral-6` | `#d1d6e5` |
| `border-disabled` | `neutral-4` | `#e6e9f0` |
| `border-focus` | `brand-9` | `#6f71c1` |
| `border-hover` | `neutral-8` | `#a0a7b9` |

### Brand

| Token | Aliases | Value |
|---|---|---|
| `brand-bg` | `brand-3` | `#e1e5ff` |
| `brand-bg-hover` | `brand-4` | `#caceff` |
| `brand-border` | `brand-6` | `#a1a6e8` |
| `brand-contrast` | `neutral-1` | `#ffffff` |
| `brand-icon` | `brand-11` | `#4b4999` |
| `brand-solid` | `brand-9` | `#6f71c1` |
| `brand-solid-hover` | `brand-10` | `#5c5dad` |
| `brand-text` | `brand-11` | `#4b4999` |

### Error

| Token | Aliases | Value |
|---|---|---|
| `error-bg` | `error-red-3` | `#ffe6e4` |
| `error-bg-hover` | `error-red-4` | `#ffb5ae` |
| `error-border` | `error-red-6` | `#f36960` |
| `error-contrast` | `neutral-1` | `#ffffff` |
| `error-icon` | `error-red-11` | `#890e09` |
| `error-solid` | `error-red-9` | `#cc0000` |
| `error-solid-hover` | `error-red-10` | `#aa0a06` |
| `error-text` | `error-red-11` | `#890e09` |

### Info

| Token | Aliases | Value |
|---|---|---|
| `info-bg` | `info-blue-3` | `#dbeafe` |
| `info-bg-hover` | `info-blue-4` | `#b6cffd` |
| `info-border` | `info-blue-6` | `#78a1f8` |
| `info-contrast` | `neutral-1` | `#ffffff` |
| `info-icon` | `info-blue-11` | `#1d4ed8` |
| `info-solid` | `info-blue-9` | `#2563eb` |
| `info-solid-hover` | `info-blue-10` | `#2159e1` |
| `info-text` | `info-blue-11` | `#1d4ed8` |

### Primary

| Token | Aliases | Value | Notes |
|---|---|---|---|
| `primary-bg` | `secondary-blue-1` | `#dee9fc` | Resolves to the **Secondary Blue** family, not Brand or Primary Red. |
| `primary-bg-hover` | `secondary-blue-2` | `#cad9f3` | |
| `primary-border` | `secondary-blue-6` | `#6878c4` | |
| `primary-contrast` | `neutral-1` | `#ffffff` | |
| `primary-icon` | `secondary-blue-9` | `#2d2e67` | |
| `primary-solid` | `secondary-blue-9` | `#2d2e67` | |
| `primary-solid-hover` | `secondary-blue-10` | `#262758` | |
| `primary-text` | `secondary-blue-9` | `#2d2e67` | |

### Success

| Token | Aliases | Value |
|---|---|---|
| `success-bg` | `success-green-3` | `#d4fad4` |
| `success-bg-hover` | `success-green-4` | `#b0f2b5` |
| `success-border` | `success-green-6` | `#7ddf8c` |
| `success-contrast` | `neutral-1` | `#ffffff` |
| `success-icon` | `success-green-11` | `#3d8a68` |
| `success-solid` | `success-green-9` | `#58c070` |
| `success-solid-hover` | `success-green-10` | `#4aa56d` |
| `success-text` | `success-green-11` | `#3d8a68` |

### Surface

| Token | Aliases | Value |
|---|---|---|
| `surface-base` | `neutral-1` | `#ffffff` |
| `surface-highlight` | `neutral-3` | `#f5f7fc` |
| `surface-subtle` | `neutral-2` | `#fafafa` |

### Text

| Token | Aliases | Value |
|---|---|---|
| `text-blue` | `secondary-blue-700` | `#17253a` |
| `text-light` | `neutral-2` | `#fafafa` |
| `text-primary` | `neutral-12` | `#191919` |
| `text-secondary` | `neutral-11` | `#5a5f70` |
| `text-tertiary` | `neutral-9` | `#8990a3` |

### Warning

| Token | Aliases | Value |
|---|---|---|
| `warning-bg` | `warning-yellow-3` | `#fcf2cf` |
| `warning-bg-hover` | `warning-yellow-4` | `#fbeaad` |
| `warning-border` | `warning-yellow-6` | `#fbdb74` |
| `warning-contrast` | `neutral-12` | `#191919` |
| `warning-icon` | `warning-yellow-11` | `#ed9f07` |
| `warning-solid` | `warning-yellow-9` | `#fac712` |
| `warning-solid-hover` | `warning-yellow-10` | `#f4b30d` |
| `warning-text` | `warning-yellow-11` | `#ed9f07` |

**No `secondary`, `chart`, or `sidebar` semantic roles exist in Figma** — these are shadcn/ui concepts with no Figma counterpart in this file.

---

## Spacing primitives

From the `spacing` collection — 10 steps, named `0`–`9` (a step index, not a pixel value).

| Token (step) | Value |
|---|---|
| `space-0` | `0px` |
| `space-1` | `4px` |
| `space-2` | `8px` |
| `space-3` | `12px` |
| `space-4` | `16px` |
| `space-5` | `24px` |
| `space-6` | `32px` |
| `space-7` | `44px` |
| `space-8` | `52px` |
| `space-9` | `64px` |

Note the scale is **not** a flat 4px/8px multiple past step 4 — it jumps 16→24→32→44→52→64, not 16→20→24→28→32.

---

## Typography

From the `Typography` collection — primitives only. (Named text styles like `Heading/H5`, `Label/Small`, `Paragraph/Small` are Figma **Text Styles**, a separate feature from Variables, and are not included here since the request scoped this to variable collections.)

**Font family**

| Token | Value |
|---|---|
| `font-family-sans` | `Instrument Sans` |

**Font size scale**

| Token | Value |
|---|---|
| `font-size-11` | `11px` |
| `font-size-12` | `12px` |
| `font-size-13` | `13px` |
| `font-size-14` | `14px` |
| `font-size-16` | `16px` |
| `font-size-18` | `18px` |
| `font-size-20` | `20px` |
| `font-size-24` | `24px` |
| `font-size-28` | `28px` |
| `font-size-36` | `36px` |
| `font-size-44` | `44px` |

**Font weight scale**

| Token | Value |
|---|---|
| `font-weight-regular` | `400` |
| `font-weight-medium` | `500` |
| `font-weight-semibold` | `600` |
| `font-weight-bold` | `700` |

**Line-height scale**

| Token | Value |
|---|---|
| `line-height-16` | `16px` |
| `line-height-18` | `18px` |
| `line-height-20` | `20px` |
| `line-height-24` | `24px` |
| `line-height-26` | `26px` |
| `line-height-28` | `28px` |
| `line-height-36` | `36px` |
| `line-height-40` | `40px` |
| `line-height-52` | `52px` |
| `line-height-64` | `64px` |

**Letter-spacing:** *not defined.* No letter-spacing variables exist in the `Typography` collection (26 variables total = 1 family + 11 sizes + 4 weights + 10 line-heights, with nothing left over). The Text Styles observed elsewhere in the file (e.g. `Heading/H5`) do carry a `letterSpacing: 0` field, but that is style-level metadata, not a variable — stated here rather than fabricated as a token.

---

## Border radius scale

From the `radius` collection — 5 values, one flat scale (Figma does not separate "primitive" vs "semantic" radius — this is the only radius data in the file).

| Token | Value |
|---|---|
| `radius-none` | `0px` |
| `radius-sm` | `6px` |
| `radius-md` | `8px` |
| `radius-lg` | `10px` |
| `radius-full` | `999px` |

---

## Shadows / elevation

**Not part of Figma's Variables system** — Figma has no shadow/elevation variable collection. This data comes from the file's **local Effect Styles** instead (read via the Plugin API, `figma.getLocalEffectStylesAsync()` — 16 styles total, all confirmed, none fabricated).

### Active-system styles

| Style | Layers | Notes |
|---|---|---|
| `Elevation/Card` | `0 1px 2px -1px rgba(0,0,0,.08)`, `0 0 0 1px rgba(0,0,0,.16)` | |
| `Elevation/Card-Hover` | `0 2px 10px -1px rgba(0,0,0,.08)`, `0 1px 2px -1px rgba(0,0,0,.16)`, `0 0 0 1px rgba(0,0,0,.12)` | |
| `Elevation/Tooltip` | `0 4px 8px rgba(0,0,0,.08)`, `0 2px 4px rgba(0,0,0,.08)`, `0 0 0 1px rgba(0,0,0,.08)` | **Not currently applied** to this repo's `Tooltip` component — see cross-check. |
| `Elevation/Flyout` | `0 8px 16px rgba(0,0,0,.08)`, `0 4px 8px rgba(0,0,0,.08)`, `0 0 0 1px rgba(0,0,0,.08)` | Intended for popover/menu surfaces (Select, DropdownMenu) — **not currently applied**, see cross-check. |
| `Elevation/AI` | `0 -6px 18px -4px rgba(225,81,255,.47)`, `0 2px 3px -1px rgba(113,77,255,.48)`, `0 0 0 4px rgba(113,77,255,.11)` | Purple/magenta glow — looks like a special "AI feature" treatment, not a general elevation level. |
| `Elevation/Borders/Base` | `0 1px 2px rgba(0,0,0,.08)`, `0 0 0 1px rgba(0,0,0,.16)` | Default resting border/shadow for inputs-style controls. |
| `Elevation/Borders/Focus` | `0 0 0 4px rgba(111,113,193,.3)`, `0 0 0 1px #6f71c1`, `0 1px 2px rgba(111,113,193,.5)` | 3-layer. **Distinct from `Borders/Active`** — see cross-check, we used Active's values for our focus rings. |
| `Elevation/Borders/Active` | `0 0 0 3px rgba(111,113,193,.2)`, `0 0 0 1px #6f71c1` | 2-layer. This is what this repo's `FOCUS_RING` pattern (Button/Input/Select) currently implements. |
| `Elevation/Borders/Error` | `0 0 0 4px rgba(204,0,0,.2)`, `0 0 0 1px #cc0000` | Error-state focus ring — matches what this repo's `Input`/`Select` error state already implements. |
| `Elevation/Borders/Shadow` | `0 0 0 1px #5c5dad`, `0 1px 2px rgba(111,113,193,.6)` | |

### Legacy styles (named "old" in the file)

| Style | Layers |
|---|---|
| `Elevation - old/100` | `0 0 4px rgba(35,42,64,0)` (alpha 0 — effectively invisible) |
| `Elevation - old/200` | `0 1px 4px rgba(35,42,64,.2)` |
| `Elevation - old/300` | `0 2px 8px rgba(35,42,64,.2)` |
| `Elevation - old/400` | `0 4px 16px rgba(35,42,64,.2)` |
| `Elevation - old/500` | `0 6px 24px rgba(35,42,64,.2)` |
| `Elevation - old/900` | `0 4px 32px rgba(35,42,64,.1)`, `0 8px 16px rgba(35,42,64,.16)` |

These are explicitly labeled "old" in Figma itself — likely superseded by the `Elevation/*` set above, kept here for completeness rather than fabricated as current.

No grid styles exist in the file (`getLocalGridStylesAsync()` returned 0).

---

## Breakpoints

**Not defined in Figma.** There is no breakpoint/responsive-width variable collection or style in this file — Figma frames are fixed-width canvases, not responsive containers, and nothing in the 5 variable collections encodes viewport widths. This repo currently relies on Tailwind's default breakpoint scale plus one hand-written `@media (max-width: 1024px)` rule in `index.css` for heading/font-size overrides — that 1024px value is not sourced from Figma.

---

## Opacity / state tokens

**No abstract opacity scale** (e.g. a generic `opacity-25/50/75` set) exists in Figma or this repo. What Figma *does* define is opacity baked directly into specific color primitives — already captured in the [Color primitives](#color-primitives) tables above:

- `black-alpha-8` through `black-alpha-90` (9 steps)
- `white-alpha-2` through `white-alpha-88` (13 steps)
- `brand-a20`/`a30`/`a50`/`a60`
- `error-red-a20`

**State changes (hover/focus/disabled/pressed) are modeled as distinct solid semantic colors, not opacity multipliers on a base color** — e.g. `primary-solid-hover` is a different flat color (`#262758`) from `primary-solid` (`#2d2e67`), not `primary-solid` at reduced/increased opacity. The one exception found in Figma's own Button inspection: **hover and pressed use the identical `*-solid-hover` token** — there is no separate "pressed" color distinct from "hover" anywhere in the file.

This repo mixes both approaches: most components (Button, Badge, Alert) use the Figma solid-color-swap pattern; Checkbox/RadioGroup's `disabled:opacity-50` is a generic Tailwind opacity utility, not a Figma-sourced value (used because Figma's disabled-checked color didn't cleanly match any existing token — see cross-check).

---

## Z-index scale

**Not defined in Figma** (Figma has no z-index concept — only layer order) **and not defined as tokens in this repo either.** Components that need stacking (`Select`, `DropdownMenu`, `Tooltip` content) use a hardcoded Tailwind `z-50` utility class directly, with no `--z-*` variable backing it. Flagged as an absent category on both sides, not a mismatch.

---

## Motion

### Duration tokens

**Not present as Figma Variables** — Figma has no numeric "duration" variable type. However, real duration values do exist, attached to **prototype reactions** (interaction wiring) on frames/components in the **Onboarding Flow** page. Read via the Plugin API (`node.reactions`) across 213 reactive nodes on that page — 10 distinct duration+easing+trigger combinations found, all reported exactly as returned, none rounded or invented:

| Duration | Occurrences | Typical use |
|---|---|---|
| `150ms` | 28 | A less-common hover variant (smaller/icon-only components) |
| `200ms` | 158 (148 hover + 10 click) | **The dominant value** — nearly all hover micro-interactions use this |
| `250ms` | 1 | Single outlier, one specific button ("Yes, I'm sure") |
| `300ms` | 48 | Dominant click-triggered transition duration (modal reveals, in-place state changes, auto-dismiss) |
| `800ms` | 1 | Single outlier — an auto-timeout dismiss on a "Welcome modal" frame |

If naming these as tokens, `fast = 150ms`, `base = 200ms`, `slow = 300ms` cleanly covers 234 of the 236 timed reactions (241 reactions total on this page, 5 of which are instant `CLOSE` actions with no duration); the `250ms` and `800ms` values look like one-off authoring choices rather than an intentional 5-step scale — worth confirming with design before codifying them.

### Easing curves

Figma reports only its **built-in named presets** here — no `CUSTOM_CUBIC_BEZIER` or spring curves were found on this page, so no literal cubic-bezier coordinates are available to report (reporting invented bezier numbers for these would violate "don't fabricate"):

| Curve | Figma type | Used for |
|---|---|---|
| Ease out | `EASE_OUT` | Every hover micro-interaction; most click-triggered dissolves/reveals |
| Ease in-out | `EASE_IN_AND_OUT` | Click-triggered `SMART_ANIMATE` state changes (9 occurrences) |

### Common transition patterns

Sourced from the same 213-node reaction scan, grouped by trigger → action:

| Trigger | Action | Transition | Duration | Easing | What it's for |
|---|---|---|---|---|---|
| `ON_HOVER` | Swap to hover variant | `SMART_ANIMATE` | 200ms (148×) / 150ms (28×) | Ease out | Button/component hover state (color, elevation) |
| `ON_CLICK` | Navigate/reveal | `DISSOLVE` | 300ms (32×) / 200ms (10×) / 250ms (1×) | Ease out | Crossfade into a new screen or modal |
| `ON_CLICK` | In-place state change | `SMART_ANIMATE` | 300ms (9×) | Ease in-out | Expand/collapse or selection change within the same frame |
| `ON_CLICK` | Close | *(instant)* | — | — | Modal/dialog dismiss (Close/Cancel buttons) — no animation |
| `ON_CLICK` | Slide in new content | `MOVE_IN` | 300ms (5×) | Ease out | Panel/content entrance |
| `AFTER_TIMEOUT` | Auto-dismiss | `DISSOLVE` | 300ms (2×) / 800ms (1×) | Ease out | Toast-style "Welcome modal — You're good to go" auto-advance |

### Reduced-motion notes

**Figma has no concept of `prefers-reduced-motion`** — this is a web accessibility feature with no design-tool equivalent, so nothing here is Figma-sourced; it's general engineering guidance only:

- Hover `SMART_ANIMATE` transitions (color/elevation swaps) should collapse to an instant or near-instant (~0ms) change — they're decorative, not informational.
- `DISSOLVE`/`MOVE_IN` transitions between screens or modals should still occur (the state change itself carries information) but should shorten toward ~0–50ms rather than fully disable, so users aren't left disoriented by an instant, unannounced content swap.
- The `AFTER_TIMEOUT` auto-dismiss pattern should not be shortened or skipped — its timing is about giving the user time to read, not decoration.

---

## Cross-check against this repo's tokens

This repo's `src/index.css` was built directly from this same Figma file in an earlier pass, so most values already match by construction. Verified matches and flagged gaps:

**Matches (no action needed):**
- All 139 color primitives, all 60 semantic tokens, and all 5 radius values in `src/index.css` are byte-for-byte the same as Figma's.
- Font family (`Instrument Sans`), font-size/weight/line-height primitives in `src/index.css` match Figma exactly.
- `Elevation/Borders/Error` is correctly implemented (repo's `Input`/`Select` error-state focus ring matches this style's values).

**Flagged mismatches / gaps:**

1. **Focus ring uses the wrong effect style.** This repo's shared `FOCUS_RING` (used by `Button`, `Input`, `Select`, `Checkbox`, `RadioGroup`) implements `Elevation/Borders/Active` (`0 0 0 3px rgba(111,113,193,.2)` + `0 0 0 1px #6f71c1`). Figma actually defines a **separate, heavier** `Elevation/Borders/Focus` style (3 layers, `spread 4` at 30% opacity instead of `spread 3` at 20%, plus an extra soft drop shadow). The repo conflated "focus" and "active/pressed" into one ring; Figma treats them as two different effect styles.
2. **No shadow/elevation tokens exist in code at all.** None of `Elevation/Card`, `Card-Hover`, `Tooltip`, or `Flyout` have been ported to `src/index.css` as CSS variables. Concretely: this repo's `Tooltip` component has no shadow applied (Figma wants `Elevation/Tooltip`, a 3-layer shadow), and `Select`/`DropdownMenu` popover surfaces use Tailwind's generic `shadow-md` + `ring-1 ring-foreground/10` instead of Figma's `Elevation/Flyout`.
3. **No motion tokens exist in code at all.** `src/index.css` defines zero `--duration-*` or `--ease-*` variables. Components rely on Tailwind's default `transition-colors`/`transition-all` (150ms, default easing) — this happens to loosely match Figma's least-common `150ms` hover variant, but not the dominant `200ms` hover pattern (148 of 235 recorded reactions) or the `300ms` click-transition pattern.
4. **Radius scale is extended beyond Figma.** `src/index.css` adds `--radius-xl/2xl/3xl/4xl` (scaled multiples of `radius-lg`) that don't exist in Figma's `radius` collection — added only so certain shadcn components have a larger radius to fall back to. Intentional, not an error.
5. **Spacing scale is deliberately not wired into Tailwind's utility classes.** `src/index.css` defines `--space-0` through `--space-9` matching Figma exactly, but does **not** override Tailwind's own numeric `p-*`/`gap-*` scale, because steps 5–9 diverge (Figma: 24/32/44/52/64 vs Tailwind's defaults: 20/24/28/32/36) and overriding them would silently change spacing everywhere else in the app. Intentional, not an error.
6. **`secondary`, `chart-1..5`, and `sidebar-*` shadcn slots are left as shadcn's original (non-Figma) defaults** — there is no Figma data for these, by explicit prior decision.
7. **Checkbox/RadioGroup disabled-checked states use a generic `opacity-50`** rather than a Figma-sourced color, because Figma's actual disabled-checked color didn't exactly match any existing semantic or primitive token.
8. **Dark mode:** Figma's variable collections are single-mode (no dark data). This repo's dark-mode CSS overrides were removed in an earlier pass for exactly this reason — there was nothing in Figma to source them from.

---

## Naming conventions

Tokens in this system follow a **`category-role[-scale]`** pattern, mirroring Figma's own grouping:

- **Primitives** are `category-family-step`, e.g. `color-brand-9`, `color-neutral-6`, `radius-md`, `font-size-16`. The step is either a numeric scale position (`1`–`12` for colors, `0`–`9` for spacing) or a semantic size label (`sm`/`md`/`lg`) for radius — never an arbitrary pixel value baked into the name.
- **Semantic tokens** are `category-role[-state]`, e.g. `color-primary-solid`, `color-primary-solid-hover`, `color-border-focus`, `color-text-secondary`. The `role` names an intended *purpose* (surface, text, border, brand, primary, success/warning/error/info), never a specific hue — a semantic token's value can be repointed to a different primitive without renaming it.
- **State suffixes** (`-hover`, `-solid-hover`, `-bg-hover`) are appended, not prefixed — `role-bg` / `role-bg-hover`, not `hover-role-bg`.
- Semantic tokens **must** alias a primitive rather than hardcode a new color — every one of the 60 tokens in the `Tokens` collection does this today; a new semantic token that hardcodes a raw hex value would break this pattern.
- When a category has no semantic layer (spacing, radius, typography all ship as primitives only in this file), don't invent one artificially — extend the primitive scale instead of fabricating a parallel semantic set.
- If Figma later adds collections this doc doesn't cover (a second mode for dark theme, a motion-token collection, a breakpoint collection), re-run the same `get_variable_defs`/`getLocalVariableCollectionsAsync()` extraction rather than hand-writing new values, and update both this file and `src/index.css` together so they can't drift apart.
