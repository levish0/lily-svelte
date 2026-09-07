# Style validation and commits

## Scope

This entry supersedes earlier preview and validation notes from today. Diamond remains the default project style. Aquamarine is independently selected at installation and in documentation. Complete external-reference catalog parity is still not claimed; the internal coverage matrix records missing and partial items.

## Decisions and fixes

- Presentation extraction recognizes slot markers at any position in a class literal. Tailwind formatting can move markers to the front; assuming a trailing marker caused production SSR failures for ActionFooter and Workshop. Unrelated identifiers such as the sidebar storage key are preserved.
- ListRow, Top, and both ActionFooter demos no longer add a padded gray stage around the example. Diamond keeps its original preview background. Aquamarine changes the preview surface itself, with an independent dark background.
- Single/double footer actions, basic/custom file upload, default/large choices, and enabled/disabled search examples have separate previews.
- Diamond mobile navigation is full width and left aligned. Its own body overflow lock allows the existing header toggle to close it; the sheet scroll lock is disabled only for this usage because it blocks outside pointer events. Aquamarine retains the sheet behavior.
- File upload custom triggers render Lily Button through a child snippet and preserve keyboard file selection, validation, and style-specific feedback.
- Public examples use English and solid leading icons. Reference brand wording and links were removed from repository-owned text, including internal notes. Original research notes are retained outside the repository.
- Do not disable prerender HTTP errors or silently accept unknown presentation slots.

## Validation

- Production SSR/prerender passed after the slot fix; final packaging verification recorded below.
- Style/config/install regression suite: 8 passed, 1 optional historical-baseline comparison skipped.
- E2E: 17 of 18 passed in the full run; the remaining Diamond mobile close issue was fixed, then that case and both style surface cases passed (3/3).
- Catalog default-preview audit: 363 style/mode/preview combinations, no overflow or unresolved marker failures. This is not complete interaction or reference variant coverage.
- Final ListRow screenshots: transparent outer wrapper with 0px padding in both styles; distinct preview and card surfaces.
- Svelte check: 0 errors, 0 warnings. Prettier passed after excluding generated registry/schema JSON. Full ESLint reported 46 errors and 2 warnings across the repository; it is not a passing gate. Subsequent scoped checks address the edited preview code only.
- English commits separate workspace dependencies, CLI style installation, component presentations, and documentation integration. No push or deployment.

## Final verification

- Latest production build, including prerender and Cloudflare adapter packaging, passed in an isolated workspace snapshot with the same source and generated registry. The original checkout has an output-directory EPERM lock; a cleanup command was rejected by automatic policy review, so the locked output was not deleted.
- The original development server was restarted at http://localhost:5173/.
- Scoped ESLint for presentation generation, preview, mobile navigation, and style selection passed. Repository-wide ESLint remains failing as recorded above.
- Repository-owned text scan found zero occurrences of the requested external brand terms. Dependency directories and Git history were excluded.
- The pre-existing untracked root AGENTS.md was left untouched and uncommitted.
