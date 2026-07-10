<script lang="ts" module>
	import { cn } from '$lib/utils.js';
	import type { Agent, Command } from 'package-manager-detector';

	export type PMCommandVariant = 'default' | 'secondary';

	export type PMCommandProps = {
		class?: string;
		variant?: PMCommandVariant;
		/** The package-manager-detector command kind, e.g. `execute` (dlx) or `install` (add). */
		command: Command;
		/** Everything after the runner, e.g. `['lily-svelte@latest', 'init']` or `['bits-ui']`. */
		args: string[];
		/** Package managers shown as tabs, in display order. */
		agents?: Agent[];
		/** The currently selected package manager. Bindable. */
		agent?: Agent;
	};

	const variants: Record<PMCommandVariant, string> = {
		default: 'bg-(--text)/5',
		secondary: 'bg-(--text)/8'
	};
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { resolveCommand } from 'package-manager-detector/commands';
	import { Tabs, TabsList, TabsTrigger } from '$lib/registry/ui/tabs/index.js';
	import * as Tooltip from '$lib/registry/ui/tooltip/index.js';

	let {
		class: className,
		variant = 'default',
		command,
		args,
		agents = ['npm', 'pnpm', 'yarn', 'bun'],
		agent = $bindable('npm')
	}: PMCommandProps = $props();

	const resolved = $derived(resolveCommand(agent, command, args));
	const text = $derived(resolved ? `${resolved.command} ${resolved.args.join(' ')}`.trim() : '');

	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout>;

	function copy() {
		navigator.clipboard.writeText(text);
		copied = true;
		clearTimeout(timeout);
		timeout = setTimeout(() => (copied = false), 2000);
	}
</script>

<div data-slot="pm-command" class={cn('overflow-hidden rounded-3xl', variants[variant], className)}>
	<div class="flex items-center gap-2 border-b border-(--text)/8 px-3 py-2">
		<Icon
			icon="heroicons:command-line-solid"
			class="size-4 shrink-0 text-(--text)/40"
			aria-hidden="true"
		/>
		<Tabs bind:value={agent}>
			<TabsList class="bg-transparent p-0">
				{#each agents as pm (pm)}
					<TabsTrigger value={pm} class="px-2.5 py-1 text-xs">{pm}</TabsTrigger>
				{/each}
			</TabsList>
		</Tabs>
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger
					aria-label="Copy command"
					onclick={copy}
					class="ms-auto inline-flex size-7 items-center justify-center rounded-xl bg-(--text)/8 text-(--text)/56 transition-colors duration-150 hover:bg-(--text)/12 hover:text-(--text) focus-visible:outline-none"
				>
					{#if copied}
						<Icon icon="heroicons:check-solid" class="size-4" aria-hidden="true" />
					{:else}
						<Icon icon="heroicons:clipboard-document-solid" class="size-4" aria-hidden="true" />
					{/if}
				</Tooltip.Trigger>
				<Tooltip.Content>{copied ? 'Copied' : 'Copy'}</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
	<div class="no-scrollbar overflow-x-auto px-5 py-3.5">
		<code class="font-mono text-sm text-nowrap text-(--text)/72">{text}</code>
	</div>
</div>
