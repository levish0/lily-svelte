import fs from 'node:fs';
import path from 'node:path';
import * as acorn from 'acorn';
import { tsPlugin } from '@sveltejs/acorn-typescript';
import { walk, type Node } from 'estree-walker';
import * as svelte from 'svelte/compiler';
import { registryItemSchema, type Registry } from 'lily-svelte/schema';

const REGISTRY_DEPENDENCY = '$lib/';
const UTILS_PATH = '$lib/utils.js';

const tsParser = acorn.Parser.extend(tsPlugin());

type RegistryItems = Registry['items'];
type RegistryItemFiles = Registry['items'][number]['files'];

export async function buildRegistry(): Promise<RegistryItems> {
	const registryRootPath = path.resolve('src', 'lib', 'registry');

	const paths = {
		ui: path.resolve(registryRootPath, 'ui'),
		lib: path.resolve(registryRootPath, 'lib'),
		hooks: path.resolve(registryRootPath, 'hooks'),
		blocks: path.resolve(registryRootPath, 'blocks'),
		examples: path.resolve(registryRootPath, 'examples')
	};

	const crawls: Array<Promise<RegistryItems>> = [crawlUI(paths.ui), crawlLib(paths.lib)];
	if (fs.existsSync(paths.hooks)) {
		crawls.push(crawlHooks(paths.hooks));
	}
	if (fs.existsSync(paths.blocks)) {
		crawls.push(crawlBlocks(paths.blocks));
	}
	if (fs.existsSync(paths.examples)) {
		crawls.push(crawlExamples(paths.examples));
	}

	return (await Promise.all(crawls)).flat();
}

async function crawlUI(rootPath: string): Promise<RegistryItems> {
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const dirs = dir.filter((dirent) => dirent.isDirectory());
	return Promise.all(
		dirs.map((dirent) => buildUIRegistry(path.resolve(rootPath, dirent.name), dirent.name))
	);
}

async function buildUIRegistry(
	componentPath: string,
	componentName: string
): Promise<RegistryItems[number]> {
	const dir = fs.readdirSync(componentPath, { withFileTypes: true });

	const fileEntries = dir.filter((d) => d.isFile());
	const registryDependencies = new Set<string>();

	let meta = {};
	const files: RegistryItemFiles = [];

	await Promise.all(
		fileEntries.map(async (dirent) => {
			const filepath = path.join(componentPath, dirent.name);
			const relativePath = path.relative(process.cwd(), filepath);
			const source = fs.readFileSync(filepath, { encoding: 'utf8' });

			if (dirent.name === 'meta.json') {
				meta = registryItemSchema.parse(JSON.parse(source));
				return;
			}

			files.push({ path: relativePath, type: 'registry:file' });

			const deps = await getFileDependencies(filepath, source);
			if (!deps) return;
			deps.registryDependencies.forEach((dep) => registryDependencies.add(dep));
		})
	);

	return {
		...meta,
		type: 'registry:ui',
		files,
		name: componentName,
		registryDependencies: Array.from(registryDependencies)
	} satisfies RegistryItems[number];
}

async function crawlLib(rootPath: string): Promise<RegistryItems> {
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const files = dir.filter((d) => d.isFile());
	return Promise.all(
		files.map(async (dirent) => {
			const [name] = dirent.name.split('.ts');
			const filepath = path.join(rootPath, dirent.name);
			const source = fs.readFileSync(filepath, { encoding: 'utf8' });
			const relativePath = path.relative(process.cwd(), filepath);
			const { registryDependencies } = await getFileDependencies(filepath, source);
			return {
				name: name!,
				type: 'registry:lib' as const,
				files: [{ path: relativePath, type: 'registry:lib' as const }],
				registryDependencies: Array.from(registryDependencies)
			};
		})
	);
}

/**
 * Blocks are full-page examples. A block is either a directory
 * (`+page.svelte` + `components/*`) or a standalone `.svelte` file.
 */
async function crawlBlocks(rootPath: string): Promise<RegistryItems> {
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const items = await Promise.all(
		dir.map(async (dirent) => {
			const filepath = path.join(rootPath, dirent.name);
			if (dirent.isDirectory()) {
				return buildBlockRegistry(filepath, dirent.name);
			}
			if (!dirent.name.endsWith('.svelte')) return null;

			const [name] = dirent.name.split('.svelte');
			const source = fs.readFileSync(filepath, { encoding: 'utf8' });
			const relativePath = path.relative(process.cwd(), filepath);
			const { registryDependencies } = await getFileDependencies(filepath, source);
			return {
				name: name!,
				type: 'registry:block' as const,
				files: [{ path: relativePath, type: 'registry:component' as const }],
				registryDependencies: Array.from(registryDependencies)
			};
		})
	);
	return items.filter((item) => item !== null);
}

async function buildBlockRegistry(
	blockPath: string,
	blockName: string
): Promise<RegistryItems[number]> {
	const dir = fs.readdirSync(blockPath, { withFileTypes: true, recursive: true });
	const registryDependencies = new Set<string>();

	const pageNames = ['+page.svelte'];
	const dataNames = ['data.json', 'data.ts'];
	const fileEntries = dir.filter((d) => d.isFile());

	const files = await Promise.all(
		fileEntries.map(async (dirent) => {
			const isPage = pageNames.includes(dirent.name) || dataNames.includes(dirent.name);
			const type = isPage ? ('registry:page' as const) : ('registry:component' as const);

			const filepath = path.join(dirent.parentPath, dirent.name);
			const relativePath = path.relative(process.cwd(), filepath);
			const source = fs.readFileSync(filepath, { encoding: 'utf8' });

			const deps = await getFileDependencies(filepath, source);
			if (deps) deps.registryDependencies.forEach((dep) => registryDependencies.add(dep));

			return { path: relativePath, type };
		})
	);

	return {
		type: 'registry:block' as const,
		files,
		name: blockName,
		registryDependencies: Array.from(registryDependencies)
	};
}

async function crawlHooks(rootPath: string): Promise<RegistryItems> {
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const files = dir.filter((d) => d.isFile());
	return Promise.all(
		files.map(async (dirent) => {
			const name = dirent.name.replace(/(\.svelte)?\.ts$/, '');
			const filepath = path.join(rootPath, dirent.name);
			const source = fs.readFileSync(filepath, { encoding: 'utf8' });
			const relativePath = path.relative(process.cwd(), filepath);
			const { registryDependencies } = await getFileDependencies(filepath, source);
			return {
				name,
				type: 'registry:hook' as const,
				files: [{ path: relativePath, type: 'registry:hook' as const }],
				registryDependencies: Array.from(registryDependencies)
			};
		})
	);
}

async function crawlExamples(rootPath: string): Promise<RegistryItems> {
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const files = dir.filter((d) => d.name.endsWith('.svelte') && d.isFile());
	return Promise.all(
		files.map(async (dirent) => {
			const [name] = dirent.name.split('.svelte');
			const filepath = path.join(rootPath, dirent.name);
			const source = fs.readFileSync(filepath, { encoding: 'utf8' });
			const relativePath = path.relative(process.cwd(), filepath);
			const { registryDependencies } = await getFileDependencies(filepath, source);
			return {
				name: name!,
				type: 'registry:example' as const,
				files: [{ path: relativePath, type: 'registry:component' as const }],
				registryDependencies: Array.from(registryDependencies)
			};
		})
	);
}

async function getFileDependencies(
	filename: string,
	content: string
): Promise<{ registryDependencies: Set<string> }> {
	let ast: unknown;
	let moduleAst: unknown;

	// data files carry no imports
	if (filename.endsWith('.json')) {
		return { registryDependencies: new Set<string>() };
	}

	if (filename.endsWith('.svelte')) {
		const { code } = await svelte.preprocess(content, [], { filename });
		const result = svelte.parse(code, { filename });
		ast = result.instance;
		if (result.module) {
			moduleAst = result.module;
		}
	} else {
		ast = tsParser.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
	}

	const registryDependencies = new Set<string>();

	const enter = (node: Node) => {
		if (node.type === 'ImportDeclaration') {
			const source = node.source.value as string;

			if (source.startsWith(REGISTRY_DEPENDENCY) && source !== UTILS_PATH) {
				if (source.includes('ui')) {
					const component = source.split('/').at(-2)!;
					registryDependencies.add(component);
				} else if (source.includes('hook')) {
					const hook = source.split('/').at(-1)!.split('.')[0]!;
					registryDependencies.add(hook);
				}
			}
		}
	};

	// @ts-expect-error estree-walker node types differ from svelte/acorn AST
	walk(ast, { enter });

	if (moduleAst) {
		// @ts-expect-error estree-walker node types differ from svelte/acorn AST
		walk(moduleAst, { enter });
	}

	return { registryDependencies };
}
