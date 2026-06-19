// vaul-svelte 1.0.0-next.x imports `bits-ui` at runtime but omits it from its
// package.json dependencies, so under pnpm's strict linking it fails to resolve
// ("Cannot find module 'bits-ui'"). Inject the missing dependency here.
function readPackage(pkg) {
	if (pkg.name === 'vaul-svelte' && !pkg.dependencies?.['bits-ui']) {
		pkg.dependencies = { ...pkg.dependencies, 'bits-ui': '*' };
	}
	return pkg;
}

module.exports = { hooks: { readPackage } };
