import type { CropArea } from 'svelte-easy-crop';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#supported_image_formats
export const VALID_IMAGE_TYPES = [
	'image/apng',
	'image/avif',
	'image/gif',
	'image/jpeg',
	'image/png',
	'image/svg+xml',
	'image/webp'
];

/** Turns a cropped object URL back into a `File`, e.g. to append to a `FormData`. */
export async function getFileFromUrl(url: string, fileName = 'cropped.png'): Promise<File> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}`);
	}
	const blob = await response.blob();
	return new File([blob], fileName, { type: blob.type });
}

function loadImage(url: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', reject);
		image.crossOrigin = 'anonymous';
		image.src = url;
	});
}

/** Draws `pixelCrop` of `src` onto a canvas and returns it as a PNG object URL. */
export async function getCroppedImage(src: string, pixelCrop: CropArea): Promise<string> {
	const image = await loadImage(src);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Could not get a 2d canvas context');

	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;
	ctx.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	);

	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (!blob) return reject(new Error('Canvas produced no image'));
			resolve(URL.createObjectURL(blob));
		}, 'image/png');
	});
}
