<script lang="ts">
	import * as ImageCropper from '$lib/registry/ui/image-cropper';
</script>

<ImageCropper.Root>
	<ImageCropper.UploadTrigger>
		<ImageCropper.Preview>
			{#snippet child({ src })}
				<div
					class="flex size-24 items-center justify-center overflow-hidden rounded-2xl bg-(--text)/5 text-sm text-(--text)/40"
				>
					{#if src}
						<img {src} alt="" class="size-full object-cover" />
					{:else}
						Upload
					{/if}
				</div>
			{/snippet}
		</ImageCropper.Preview>
	</ImageCropper.UploadTrigger>
	<ImageCropper.Dialog>
		<ImageCropper.Cropper cropShape="rect" aspect={16 / 9} />
		<ImageCropper.Zoom />
		<ImageCropper.Controls>
			<ImageCropper.Cancel />
			<ImageCropper.Crop />
		</ImageCropper.Controls>
	</ImageCropper.Dialog>
</ImageCropper.Root>
