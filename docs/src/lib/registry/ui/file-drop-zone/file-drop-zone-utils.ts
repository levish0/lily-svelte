// Keep these 1024-based so they match common server upload limits such as nginx's `10m`.
export const BYTE = 1;
export const KILOBYTE = 1024 * BYTE;
export const MEGABYTE = 1024 * KILOBYTE;
export const GIGABYTE = 1024 * MEGABYTE;

/** Ready-made `accept` values for common file categories. */
export const ACCEPT_IMAGE = 'image/*';
export const ACCEPT_VIDEO = 'video/*';
export const ACCEPT_AUDIO = 'audio/*';

/** Human-readable byte size, e.g. 1536 becomes "1.5 KB". */
export function displaySize(bytes: number): string {
	const units = ['B', 'KB', 'MB', 'GB'];
	let size = bytes;
	let unit = 0;
	while (size >= KILOBYTE && unit < units.length - 1) {
		size /= KILOBYTE;
		unit++;
	}
	return `${Math.round(size * 10) / 10} ${units[unit]}`;
}
