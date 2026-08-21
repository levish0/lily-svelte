<script lang="ts">
	import { Avatar, AvatarGroup, AvatarGroupCount } from '$lib/registry/ui/avatar';
</script>

<AvatarGroup>
	<Avatar src="/levish_avatar.png" alt="lily" />
	<Avatar fallback="LL" alt="Levi Laine" />
	<Avatar fallback="MJ" alt="Mia Jung" />
	<Avatar alt="Unknown user" />
	<AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>
