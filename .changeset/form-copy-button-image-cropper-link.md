---
'lily-svelte': minor
---

Add `form`, `copy-button`, `image-cropper` and `link`, and extend `field` with `Set`, `Legend` and `Separator`.

- **New component: `form`** — [Formsnap](https://formsnap.dev) + [Superforms](https://superforms.rocks) bindings for lily's `Field` parts. `Form.Field`, `Form.Fieldset`, `Form.Legend`, `Form.Control`, `Form.Label`, `Form.Description`, `Form.FieldErrors`, `Form.ElementField` and `Form.Button` render the matching `Field` part and only add form state, so a `Form.Label` looks exactly like a `FieldLabel`. `formsnap` and `sveltekit-superforms` are installed with the component.
- **New component: `copy-button`** — a `Button` that writes `text` to the clipboard and swaps its icon to a check (or a cross on failure) for `delay` ms. Built on the new **`use-clipboard`** hook, which is installed alongside it and can be used on its own.
- **New component: `image-cropper`** — pick a file, crop it in a `Dialog` (round or rect, any aspect), and get the result back through `bind:src` / `onCropped`; `getFileFromUrl` turns it into a `File` for upload. Includes a `Zoom` slider on top of pinch and wheel. Built on `svelte-easy-crop`.
- **New component: `link`** — an anchor styled with the `.link` underline animation from the base stylesheet. External `href`s open in a new tab with `rel="noopener noreferrer"` automatically; `external`, `target` and `rel` override it.
- **`field` gains `FieldSet`, `FieldLegend` and `FieldSeparator`** — a `<fieldset>` / `<legend>` pair for grouping controls, and a divider with an optional label on the line.
