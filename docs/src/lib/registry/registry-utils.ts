export type FileTree = {
	name: string;
	path?: string;
	children?: FileTree[];
};

export type RegistryFileType =
	| 'registry:file'
	| 'registry:page'
	| 'registry:ui'
	| 'registry:component'
	| 'registry:lib'
	| 'registry:hook';

/** Maps a registry file target to the path it lands at in a user's project. */
export function transformBlockPath(target: string, type: RegistryFileType): string {
	if (type === 'registry:page' || type === 'registry:file') {
		return `routes/${target}`;
	}
	if (type === 'registry:component') {
		return `components/${target.split('/').at(-1)}`;
	}
	if (type === 'registry:hook') {
		return `hooks/${target.split('/').at(-1)}`;
	}
	return target;
}

/** Replaces the registry alias placeholders with the default user-facing paths. */
export function transformImportPaths(content: string): string {
	const aliases = {
		ui: '$lib/components/ui',
		utils: '$lib/utils',
		components: '$lib/components',
		hooks: '$lib/hooks',
		lib: '$lib'
	};
	for (const [alias, path] of Object.entries(aliases)) {
		content = content.replaceAll(`$${alias.toUpperCase()}$`, path);
	}
	return content;
}

export function createFileTreeForRegistryItemFiles(
	files: Array<{ target: string; type: RegistryFileType }> | undefined
): FileTree[] {
	if (!files || !Array.isArray(files)) {
		return [];
	}

	const root: FileTree[] = [];

	for (const file of files) {
		const path = file.target;
		const parts = path.split('/');
		let currentLevel = root;

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i]!;
			const isFile = i === parts.length - 1;
			const existingNode = currentLevel.find((node) => node.name === part);

			if (existingNode) {
				if (isFile) {
					existingNode.path = path;
				} else {
					currentLevel = existingNode.children!;
				}
			} else {
				const newNode: FileTree = isFile ? { name: part, path } : { name: part, children: [] };

				currentLevel.push(newNode);

				if (!isFile) {
					currentLevel = newNode.children!;
				}
			}
		}
	}

	return root;
}
