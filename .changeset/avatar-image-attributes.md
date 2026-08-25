---
'lily-svelte': minor
---

Give `avatar` the image attributes it was hiding.

`srcset`, `sizes`, `loading`, `crossorigin` and `referrerpolicy` are now props on `Avatar`, passed
through to the underlying `<img>` — `restProps` lands on the wrapper, so there was no way to reach
them before. `loading` was hardcoded to `lazy`, which meant the avatars above the fold always
popped in late, and without `srcset` every avatar was soft on a 2x display. Both are worst exactly
where avatars are most common: a list of them.

```svelte
<Avatar
	src={user.avatar}
	srcset="{user.avatar} 1x, {user.avatar2x} 2x"
	loading="eager"
	alt={user.name}
/>
```
