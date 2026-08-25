import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

for (const directory of ['cloudflare', 'output']) {
	rmSync(resolve('.svelte-kit', directory), { recursive: true, force: true });
}
