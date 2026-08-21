<script lang="ts">
	import { Avatar, AvatarBadge } from '$lib/registry/ui/avatar';
</script>

<div class="flex flex-wrap items-center gap-3">
	<Avatar size="sm" src="/levish_avatar.png" alt="lily">
		<AvatarBadge class="bg-emerald-500" />
	</Avatar>
	<Avatar src="/levish_avatar.png" alt="lily">
		<AvatarBadge class="bg-emerald-500" />
	</Avatar>
	<Avatar size="lg" fallback="LL" alt="Levi Laine">
		<AvatarBadge class="bg-amber-500" />
	</Avatar>
	<Avatar size="xl" alt="Unknown user">
		<AvatarBadge class="bg-(--text)/24" />
	</Avatar>
</div>
