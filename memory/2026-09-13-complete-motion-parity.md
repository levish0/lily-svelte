# Component motion parity

## Correction

Supersedes the earlier motion audit: checking missing transition tokens alone overlooked the global Aquamarine transform:none rule and extra ease-out overrides. Aquamarine now uses the original button/link-button press scale of 0.96. All shared UI presentation slots have matching motion classes, including transition properties, duration, easing, animations, and active scale. 53 slot definitions were aligned; component sizes, colors, and layout remain independent. Slider active scale is 1.1 in both styles. Existing reduced-motion overrides remain.

## Validation

Registry generation passed. Regression suite: 11 passed, 1 optional baseline test skipped. Added full-catalog motion token comparison and global CSS press/animation declaration comparison. These checks cover all shared UI slots, not a manually selected list of controls.

Browser press comparisons passed for 11 control types in both styles (22 interactions), including Button, Checkbox, Switch, Tabs, ChoiceGroup, NumberField, Calendar, Accordion, Select, Dialog trigger, and Toggle. Computed transform, transition property, duration, and easing match. Button reaches scale(0.96). Full build and broad E2E were not repeated.
