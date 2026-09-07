# Agent Instructions

- Work autonomously within the user's requested scope. Ask only when requirements are genuinely ambiguous or a decision would materially change behavior, architecture, or scope.
- Inspect and follow the repository's existing architecture, conventions, code style, naming, and file structure before making changes.
- Keep code organized by responsibility. Functions, types, modules, and files should have clear roles and live where they naturally belong.
- Use explicit, descriptive names for variables, functions, types, files, and modules. Avoid vague names and unnecessary abbreviations.
- Prefer clear, direct implementations over unnecessary abstractions, compatibility layers, configuration, or cleverness.
- Fix root causes rather than adding temporary workarounds.
- Do not modify, revert, reformat, or clean up unrelated user changes.
- Validate changes with the relevant tests, type checks, linting, formatting, or builds. Never claim validation that was not performed.
- Commit completed changes in coherent logical units. Keep unrelated changes separate and write concise English commit messages.
- Do not rewrite existing commits or use destructive Git operations unless explicitly requested.

## Memory Workflow

Update `memory/` before the final response when a completed milestone materially changes architecture, public APIs, schemas, configuration, tooling, deployment, major features, or assumptions a future agent needs to know.

### Naming

`memory/YYYY-MM-DD-<version-or-scope>.md`

Keep `memory/README.md` as the index and use `memory/TEMPLATE.md` as the required structure when present.

### Content Rules

- Record durable facts needed to resume work: what changed, key decisions, constraints, and validation status.
- If validation was skipped or failed, record exactly what was not verified and why.
- Do not store secrets, credentials, or irrelevant conversation history.
- Do not edit unrelated memory entries. Add a correction or superseding entry when an older entry is no longer accurate.
