# lily-svelte

A CLI for adding [lily](https://lily-svelte.pages.dev) components to your project.

**lily** is a calm, rounded **Svelte 5** component library — one unified, soft, monochrome style.
Components are copy-paste (you own the code), fetched from a hosted registry, shadcn-style.

## init

Use the `init` command to set up a new project. It installs dependencies, adds the `cn` util,
and configures base styles and CSS variables.

```bash
npx lily-svelte@latest init
```

Run this once in a SvelteKit + Tailwind v4 project before adding components.

## add

Use the `add` command to add a component to your project, along with all of its dependencies.

```bash
npx lily-svelte@latest add [component]
```

The source is written into `$lib/components/ui/*` — yours to edit.

### Example

```bash
npx lily-svelte@latest add button
```

Run it without arguments to pick from the full list of available components:

```bash
npx lily-svelte@latest add
```

## Documentation

Visit <https://lily-svelte.pages.dev> to view the documentation.

## License

Licensed under the [MIT license](https://github.com/levish0/lily-svelte/blob/main/LICENSE).
