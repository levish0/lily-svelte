import Root, { type AvatarSize } from './avatar.svelte';
import Group, { type AvatarGroupSpacing } from './avatar-group.svelte';
import GroupCount from './avatar-group-count.svelte';
import Badge from './avatar-badge.svelte';

export {
	Root,
	Group,
	GroupCount,
	Badge,
	type AvatarSize,
	type AvatarGroupSpacing,
	//
	Root as Avatar,
	Group as AvatarGroup,
	GroupCount as AvatarGroupCount,
	Badge as AvatarBadge
};
