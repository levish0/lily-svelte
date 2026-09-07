# Documentation UI

- Use Lily components for interactive controls in documentation pages, toolbars, previews, and examples. Do not introduce native selects, inputs, textareas, or buttons directly at these call sites.
- If Lily lacks a needed control, implement a reusable Lily component first and use it from the documentation UI.
- This rule concerns component consumption. Lily component internals must retain semantic HTML elements and the form, keyboard, focus, and accessibility behavior they provide.
- Style selectors must use Lily Select and participate in the documented style-selection workflow.
