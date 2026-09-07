# Preview background scope

## Correction

Supersedes the global Aquamarine preview background decision in the previous style validation note. ComponentPreview uses the original page background by default in both styles. The explicit surface="inset" option is selected only by ListRow, Top, and ActionFooter documentation examples to contrast their elevated screens in Aquamarine. Diamond is unchanged. Do not introduce a padded stage around examples or apply the inset background to the entire component catalog.

## Validation

Browser checks passed for GridList, Button, ListRow, Top, and ActionFooter in both styles (10 combinations). Aquamarine GridList and Button use white; elevated screen examples use the inset surface. Diamond remains on its original background. No horizontal preview overflow. The GridList screenshot was visually reviewed. Full build and repository-wide lint were not repeated for this presentation-only correction.
