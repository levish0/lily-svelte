import { createContext } from 'svelte';

export type FileDropZoneContext = {
	inputId: string;
	openPicker: () => void;
	readonly clickToSelect: boolean;
	readonly canUpload: boolean;
	readonly dragOver: boolean;
	readonly maxFiles: number | undefined;
	readonly maxFileSize: number | undefined;
};

export const [getFileDropZoneContext, setFileDropZoneContext] =
	createContext<FileDropZoneContext>();
