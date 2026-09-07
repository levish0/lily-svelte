---
title: Design styles
description: Choose Diamond or Aquamarine for your project.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

Lily has named design styles. **Diamond** is the original monochrome design with rounded controls. **Aquamarine** uses soft surfaces, blue actions, and proportions suited to mobile interfaces. Style is separate from light and dark mode.

Use the **style selector in the header** to compare the same examples. Your selection stays with you as you browse. The entire site, including navigation, search, menus, dialogs, and component previews, uses the selected style. Viewport-based block previews remain isolated documents. The Code tab reads the selected registry's actual example source.

<ComponentPreview name="styles-demo" />

## Choose a project style

```bash
npx lily-svelte@latest init --style aquamarine
npx lily-svelte@latest add button input field list-row top bottom-cta
```

The CLI saves the selection in `lily.json`:

```json
{
	"style": "aquamarine"
}
```

This is one field in your existing configuration, not a replacement for the entire file. Subsequent `add` and `update` commands use that style for components and their registry dependencies. Components do not need a style prop. Files remain yours to edit.

Existing configurations without `style` select Diamond and keep their original registry URL. A custom registry can publish additional style indexes under `styles/<name>`; explicit external component URLs continue to refer to that external source.

## Changing an existing project

Changing `style` in the config alone does not convert installed component sources. The CLI refuses a config/CSS style mismatch before changing files.

1. Commit or back up your project.
2. Initialize a separate project with the new style, matching your aliases and TypeScript choice.
3. Add the same components and compare the generated sources and CSS with your project.
4. Merge your own changes into the new sources. Replace the complete managed CSS region and update `lily.json` together.
5. Check your forms, loading states, keyboard interactions, and layouts.

Automatic merging between styles is not supported. `init --overwrite` cannot silently switch an existing project's style, and `update` continues to protect edited CSS regions.

## Aquamarine design scope

Aquamarine is an independent Lily design style. The supplied TDS file was inspected as a design reference. No fonts, icons, illustrations, or other files from the UI kit are distributed. Aquamarine loads the open-source Pretendard Variable v1.3.9 webfont from a pinned CDN URL, with system fallbacks. It is an independent font substitute, not the reference font. Its [SIL OFL 1.1 license](https://github.com/orioncactus/pretendard/blob/v1.3.9/LICENSE) permits embedding. The same declaration is included in installed CSS; self-host the font and retain the license when external font requests are unsuitable.

Button sizes preserve the reference's minimum heights, minimum widths, horizontal padding, radii, and label sizes:

| Lily size        | Minimum height | Minimum width | Horizontal padding | Radius | Label |
| ---------------- | -------------- | ------------- | ------------------ | ------ | ----- |
| `sm`             | 32 px          | 52 px         | 10 px              | 8 px   | 13 px |
| `md`             | 38 px          | 64 px         | 16 px              | 10 px  | 15 px |
| `lg`             | 48 px          | 80 px         | 16 px              | 14 px  | 17 px |
| `default` / `xl` | 56 px          | 96 px         | 28 px              | 16 px  | 17 px |

The reference uses a 1.252 label line-height and a 10 px gap. These are kept rather than rounded to Tailwind defaults. Loading keeps the label's space and keyboard focus; disabled buttons use 30% opacity. Web hover, focus rings, motion, and the spinner artwork are Lily decisions. Press feedback currently uses brightness rather than reproducing the reference's layered overlay.

Box inputs have a 54 px minimum height, 14 px radius, and 17 px text. Aquamarine deliberately omits the reference Box Field’s subtle 1 px stroke: Input (including Password), Input Group, Number Field, and Textarea use filled surfaces, with background changes for focus and validation rather than outlines. Pair invalid fields with an error message. This is a Aquamarine design decision, not an exact reproduction of the reference. Use `variant="line"` for the underline presentation and `aria-invalid` with Field error text for validation. Label/help layout is composed with Field. Switch tracks are 50 × 30 px with a 24 px handle. Tabs use the reference's large 51 px row height. Dialogs retain a 24 px radius and 20 px title; their responsive width and flexible action area are web adaptations.

List Row, Top, and Bottom CTA provide the missing composition primitives. Heights follow their contents; example screen widths are not fixed component widths. List Row separates accessory controls from text so a switch or button does not become nested inside another button.

Cards use a pale gray surface on the white page, with a separate inset surface for contained fields. These borderless layers are a Aquamarine composition choice informed by the supplied screen references; they are not a verified TDS Card specification. Elevated overlays retain their own white surface.

The remaining Lily components have explicit Aquamarine presentation definitions or share layout-only behavior. They are Lily extensions, not claims of complete TDS variant coverage. Dark-mode tokens, desktop menus, tables, calendars, charts beyond the reference's Bar Chart, and responsive layouts require independent design choices. Figma-only compositions such as Keypad, Rating, and mobile navigation are not separately implemented by this release.

## Adding another style

Maintainers register a name and label in `packages/cli/src/styles.ts`, add its CSS in `packages/cli/src/<name>.css`, and define its presentation slots in `docs/src/lib/registry/styles/<name>/*.json`.

The original classes live beside the shared component behavior as Diamond's defaults. A named `lily-*` slot identifies a replaceable presentation literal. The build replaces those literals with the selected definition and removes slot markers from installation output. Missing definitions fail the build rather than substituting another style.

When a design needs different markup, place the override under `styles/<name>/sources/<registry-relative-path>`. Keep behavior shared wherever possible. Generated `registry-styles` sources, preview CSS, and the presentation lookup are build artifacts. The docs-only class helper reads that same lookup for live style changes; installed sources use the ordinary class helper and contain no runtime style selection. Registry build, CLI choices, and the docs selector consume the same style catalog.

<PMAddComp name="button" />

## Composition and density

Aquamarine defaults to the reference's 56px primary action. Use `size="md"` for a 38px toolbar action and `size="sm"` for a 32px inline row action. Icon-only actions use the icon sizes. Diamond's default size stays unchanged.

Search Field adds a 44px search surface with 24px icons, a 12px radius, value binding and an accessible clear action. Checkbox `variant="line"` supplies the independent check mark while retaining form/keyboard handling. Number Field has `sm`, `md`, `lg`, `xl` sizes with separate inset numeric surfaces in Aquamarine; direct numeric input and limits remain available as Lily extensions.

The [Workshop block](/blocks/workshop) uses Top, List Row, Grid List, Tabs and Bottom CTA together. Its content and layout are original examples inspired by the supplied screen references, not an exact reproduction of a reference screen. See [component coverage](/docs/aquamarine-coverage) for the outstanding catalog work.
