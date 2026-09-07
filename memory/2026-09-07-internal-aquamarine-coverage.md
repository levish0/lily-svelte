---
title: Aquamarine coverage
description: Reference coverage and remaining work for the Aquamarine style.
---

Aquamarine is not yet a complete implementation of the TDS catalog. A source file or shared token map alone does not establish component parity. This table covers every supplied documentation URL; partial and missing entries remain implementation work.

Measured values come from the supplied Figma or the live official examples. Existing fonts/icons remain Lily assets. Hover, keyboard focus, responsive web behavior and editable numeric input are Lily additions unless explicitly documented otherwise.

| Reference                             | Lily counterpart                       | Current scope / remaining work                                                         |
| ------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------- |
| badge                                 | Badge                                  | Sizes and six color families implemented; dark states need visual review               |
| board-row                             | Accordion / Collapsible                | Composition only; Board Row-specific layout not implemented                            |
| border                                | Separator                              | Partial; full and inset rules need verification                                        |
| bottom-info                           | Field description / custom composition | Missing dedicated composition                                                          |
| bottom-sheet                          | Drawer                                 | Partial; state and variant comparison pending                                          |
| bubble                                | Tooltip / Popover                      | Missing bubble-specific layout                                                         |
| button                                | Button                                 | 32/38/48/56px sizes and weak colors; layered pressed and dot loading still pending     |
| checkbox                              | Checkbox                               | Circle and line presentation; original icon artwork and disabled motion differ         |
| grid-list                             | GridList                               | 1/2/3 columns, measured gap/padding/surface; interactive example available             |
| highlight                             | None                                   | Missing                                                                                |
| icon-button                           | Button icon sizes                      | Partial; official icon-button variants need mapping                                    |
| list-footer                           | Button composition                     | Dedicated layout missing                                                               |
| list-header                           | Top / text composition                 | Dedicated layout missing                                                               |
| loader                                | Spinner                                | Different artwork; dot and line loader missing                                         |
| menu                                  | DropdownMenu / ContextMenu             | Partial; list/item presentation review pending                                         |
| modal                                 | Dialog / Sheet                         | Partial; full modal composition missing                                                |
| numeric-spinner                       | NumberField                            | Four measured surface sizes; editable input is a Lily extension; number motion differs |
| paragraph                             | Typography / text                      | Dedicated hierarchy API missing                                                        |
| post                                  | Typography / prose                     | Missing                                                                                |
| progress-bar                          | Progress                               | Partial; sizes and animation review pending                                            |
| progress-stepper                      | Stepper                                | Partial; reference-specific stages missing                                             |
| rating                                | None                                   | Missing                                                                                |
| result                                | Empty / Top composition                | Missing result-specific composition                                                    |
| search-field                          | SearchField                            | Measured surface/icon/text sizing and clear action; fixed/takeSpace not implemented    |
| segmented-control                     | SegmentedControl                       | Small/large geometry and radio semantics; motion differs                               |
| skeleton                              | Skeleton                               | Partial; shape and state review pending                                                |
| slider                                | Slider                                 | Partial; ticks and variants review pending                                             |
| stepper                               | Stepper                                | Partial; reference-specific layout review pending                                      |
| switch                                | Switch                                 | 50x30 track / 24px handle; disabled/off variants need review                           |
| tab                                   | Tabs                                   | Navigation and segmented panel choices separated; navigation indicator review pending  |
| table-row                             | Table / ListRow                        | Key-value row composition missing                                                      |
| text-button                           | Button ghost                           | Partial; text size/accessory variants need mapping                                     |
| toast                                 | Sonner                                 | Partial; original composition and states need review                                   |
| tooltip                               | Tooltip                                | Partial; reference dimensions need review                                              |
| top                                   | Top                                    | Title/description/accessory composition; full typography variants pending              |
| Agreement/v3                          | Checkbox / Field                       | V3/V4 agreement composition missing                                                    |
| Agreement/v4                          | Checkbox / Field                       | V3/V4 agreement composition missing                                                    |
| Asset/check-first                     | Snippet / existing icons               | No reference assets redistributed; layout wrapper missing                              |
| Asset/frame                           | Snippet / existing icons               | No reference assets redistributed; layout wrapper missing                              |
| Asset/asset                           | Snippet / existing icons               | No reference assets redistributed; layout wrapper missing                              |
| BottomCTA/check-first                 | BottomCta + Button                     | Single/double composition available; fixed/takeSpace variants missing                  |
| BottomCTA/Single                      | BottomCta + Button                     | Single/double composition available; fixed/takeSpace variants missing                  |
| BottomCTA/Double                      | BottomCta + Button                     | Single/double composition available; fixed/takeSpace variants missing                  |
| BottomCTA/fixed-bottom-cta            | BottomCta + Button                     | Single/double composition available; fixed/takeSpace variants missing                  |
| Chart/bar-chart                       | Chart                                  | Lily charts; TDS Bar Chart-specific variants not implemented                           |
| Dialog/dialog                         | Dialog / AlertDialog                   | Partial; alert/confirm composition and measured states need review                     |
| Dialog/alert-dialog                   | Dialog / AlertDialog                   | Partial; alert/confirm composition and measured states need review                     |
| Dialog/confirm-dialog                 | Dialog / AlertDialog                   | Partial; alert/confirm composition and measured states need review                     |
| Keypad/alphabet-keypad                | None                                   | Missing; secure keypad semantics must not be implied by a visual keypad                |
| Keypad/full-secure-keypad             | None                                   | Missing; secure keypad semantics must not be implied by a visual keypad                |
| Keypad/number-keypad                  | None                                   | Missing; secure keypad semantics must not be implied by a visual keypad                |
| ListRow/list-row-overview             | ListRow                                | Leading/text/trailing and density; full text/asset variants missing                    |
| ListRow/list-row-components           | ListRow                                | Leading/text/trailing and density; full text/asset variants missing                    |
| ListRow/ListRowLegacy/list-row-legacy | ListRow                                | Leading/text/trailing and density; full text/asset variants missing                    |
| TextField/text-field                  | Input / Field / Textarea / InputOTP    | Box/Line partly implemented; split fields and complete label/error states pending      |
| TextField/split-text-field            | Input / Field / Textarea / InputOTP    | Box/Line partly implemented; split fields and complete label/error states pending      |
| TextField/text-area                   | Input / Field / Textarea / InputOTP    | Box/Line partly implemented; split fields and complete label/error states pending      |

## Lily components without a supplied counterpart

Calendar, Date Picker, Range Calendar, Carousel, Command, Code Block, Copy Button, Data Table, Image Cropper, File Drop Zone, Kbd, Menubar, Navigation Menu, Pagination, Phone Input, Resizable, Scroll Area, Select, Sidebar, Tags Input, Table of Contents, Toggle and Hover Card are Lily extensions. Their surfaces, type, spacing and control radii must use Aquamarine conventions, but they are not Figma-specified TDS components. Existing extension maps still need a complete visual audit.

## Deliberate differences

- Box inputs use background states instead of strokes, as requested. The explicit Line input retains an underline.
- Web keyboard focus remains visible; native form submission, binding, disabled behavior and accessible names remain intact.
- System fonts and existing open-source icons are retained. No reference illustrations, logos, fonts or secure-input assets are bundled.
- Example screens demonstrate composition; they are not pixel-identical replicas of the reference screenshots.
