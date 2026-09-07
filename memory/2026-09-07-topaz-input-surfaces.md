# Topaz input surfaces

## Decision

The user prefers soft, borderless filled input controls in Topaz. This explicitly supersedes literal Figma stroke matching for this presentation. Preserve the measured component proportions.

The locally decoded reference Field instance 50817:11919 has a visible 1px inside stroke at 10% opacity. The previous Topaz implementation used a solid border token; Input Group and Number Field rings were Lily extensions.

## Changes

- Removed Box Input borders and Input Group/Number Field rings. Password inherits Input styling.
- Input, Input Group, Number Field, and Textarea use background changes for focus; Input/Textarea invalid styling uses danger-tinted backgrounds and text. Consumers should provide error messages.
- Explicit Input variant="line" retains its underline. This decision does not remove structural separators everywhere.
- Documented the intentional difference in the styles documentation.

## Validation

- Registry generation passed on retry after a transient Windows file-open failure at static/schema.json.
- Browser inspection verified Input and Password have 0px borders and no shadows in light and dark modes; focus background changes and value entry work. Light-mode screenshot inspected.
- No new type/API changes; full type check and full suite were not rerun for this class-only change.
