import Root, {
	displaySize,
	BYTE,
	KILOBYTE,
	MEGABYTE,
	GIGABYTE,
	ACCEPT_IMAGE,
	ACCEPT_VIDEO,
	ACCEPT_AUDIO,
	type FileDropZoneProps,
	type FileRejectedReason
} from './file-drop-zone.svelte';
import Trigger, { type FileDropZoneTriggerProps } from './file-drop-zone-trigger.svelte';

export {
	Root,
	Trigger,
	displaySize,
	BYTE,
	KILOBYTE,
	MEGABYTE,
	GIGABYTE,
	ACCEPT_IMAGE,
	ACCEPT_VIDEO,
	ACCEPT_AUDIO,
	type FileDropZoneProps,
	type FileRejectedReason,
	type FileDropZoneTriggerProps,
	//
	Root as FileDropZone,
	Trigger as FileDropZoneTrigger
};
