import { copyFileSync } from 'node:fs';
import { STYLE_NAMES } from './src/styles.ts';
import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: [
		'src/index.ts',
		'src/styles.ts',
		'src/schema/index.ts',
		'src/utils/css.ts',
		'src/utils/transformers/index.ts',
		'src/utils/transformers/transform-imports.ts',
		'src/utils/transformers/transform-font.ts',
		'src/utils/transformers/transform-strip-types.ts'
	],
	target: 'es2022',
	dts: true,
	onSuccess: async () => {
		copyFileSync('src/tailwind.css', 'dist/tailwind.css');
		for (const style of STYLE_NAMES) {
			if (style !== 'diamond') copyFileSync(`src/${style}.css`, `dist/${style}.css`);
		}
	}
});
