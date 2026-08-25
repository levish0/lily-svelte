---
'lily-svelte': minor
---

Make the design system a managed region, so `update` can actually update it.

**Breaking:** the lily block in your stylesheet is rewritten with begin/end markers the first time you run `lily update`. If you edited it, the CLI stops and shows you what differs rather than replacing it.

lily writes its whole design system — tokens, base rules, `.link`, the custom variants, the keyframes — straight into your stylesheet so you own it. The catch was that it only ever knew "is a lily block present", so once one existed it was skipped forever: every later improvement to the tokens reached new projects only. `init` even claimed the file "will be overwritten" while doing nothing of the sort.

The block is now delimited and carries a digest of what the CLI wrote:

```css
/* lily design system v0.5.0 — managed by the lily CLI; yours to edit.
   … <sha256> */
…
/* end lily design system */
```

That gives `update` three honest answers: the block still matches what lily shipped, so replace it; it does not, so leave it alone and print the difference; or there is nothing there, so add it. The end marker also means CSS you write _after_ the block is no longer swallowed — before, the region ran to the end of the file.

`init` is unchanged in behaviour: it still only adds the block when there is none. Its prompt no longer says the file will be overwritten.
