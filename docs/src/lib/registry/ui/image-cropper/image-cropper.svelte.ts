import { Context } from 'runed';
import type { CropArea, OnCropCompleteEvent } from 'svelte-easy-crop';
import { getCroppedImage, VALID_IMAGE_TYPES } from './utils.js';

export type ImageCropperRootStateProps = {
	readonly id: string;
	src: string;
	readonly onCropped: (url: string) => void;
	readonly onUnsupportedFile: (file: File) => void;
};

export class ImageCropperRootState {
	/** Object URL of the file waiting to be cropped. */
	#tempUrl = $state<string>();
	/** The last object URL we handed to the consumer through `src`. */
	#croppedUrl: string | undefined;

	open = $state(false);
	pixelCrop = $state<CropArea>();
	zoom = $state(1);

	constructor(readonly opts: ImageCropperRootStateProps) {}

	get id() {
		return this.opts.id;
	}

	get src() {
		return this.opts.src;
	}

	get tempUrl() {
		return this.#tempUrl;
	}

	#setTempUrl(url?: string) {
		if (this.#tempUrl) URL.revokeObjectURL(this.#tempUrl);
		this.#tempUrl = url;
	}

	onUpload = (file: File) => {
		if (!VALID_IMAGE_TYPES.includes(file.type)) {
			this.opts.onUnsupportedFile(file);
			return;
		}
		this.#setTempUrl(URL.createObjectURL(file));
		this.zoom = 1;
		this.open = true;
	};

	onCropComplete = (e: OnCropCompleteEvent) => {
		this.pixelCrop = e.pixels;
	};

	onCancel = () => {
		this.open = false;
		this.#setTempUrl(undefined);
		this.pixelCrop = undefined;
	};

	onCrop = async () => {
		if (!this.pixelCrop || !this.#tempUrl) return;
		const url = await getCroppedImage(this.#tempUrl, this.pixelCrop);

		// the consumer owns the newest url through `src`; only the one it replaces is ours to free
		if (this.#croppedUrl) URL.revokeObjectURL(this.#croppedUrl);
		this.#croppedUrl = url;

		this.opts.src = url;
		this.#setTempUrl(undefined);
		this.pixelCrop = undefined;
		this.open = false;
		this.opts.onCropped(url);
	};

	dispose = () => {
		// the last cropped url outlives us on purpose — `src` still points at it
		this.#setTempUrl(undefined);
	};
}

const ctx = new Context<ImageCropperRootState>('ImageCropper.Root');

export function setImageCropperRoot(props: ImageCropperRootStateProps) {
	return ctx.set(new ImageCropperRootState(props));
}

export function useImageCropperRoot() {
	return ctx.get();
}
