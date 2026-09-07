# Preview source ownership

## Change

ComponentPreview displays example source exclusively through RegistrySource, which reads the selected style registry. Removed the obsolete rehypeComponentExample transformer, its source formatter, and the unused children prop. The old transformer inserted a second code block after self-closing previews and injected unused snippets into paired previews.

## Constraints

Do not automatically inject example source beside ComponentPreview. Explicit Usage and installation code blocks remain supported by the Markdown highlighting pipeline. No component installation behavior changed.

## Validation

Browser verification passed for Grid List, Button, and List Row in Diamond and Aquamarine: exactly one visible source block before Installation when Code is selected. Svelte autofixer reported no issues. Full build and broad tests were not repeated for this documentation-only removal.
