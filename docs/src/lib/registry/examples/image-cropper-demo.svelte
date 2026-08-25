<script lang="ts">
	import * as ImageCropper from '$lib/registry/ui/image-cropper';
	import { toast } from 'svelte-sonner';
</script>

<ImageCropper.Root
	src="/levish_avatar.png"
	onCropped={() => toast.success('Cropped!')}
	onUnsupportedFile={(file) => toast.error(`Unsupported file type: ${file.type}`)}
>
	<ImageCropper.UploadTrigger>
		<ImageCropper.Preview />
	</ImageCropper.UploadTrigger>
	<ImageCropper.Dialog>
		<ImageCropper.Cropper />
		<ImageCropper.Zoom />
		<ImageCropper.Controls>
			<ImageCropper.Cancel />
			<ImageCropper.Crop />
		</ImageCropper.Controls>
	</ImageCropper.Dialog>
</ImageCropper.Root>
