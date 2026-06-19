import { resolveCommand } from 'package-manager-detector/commands';
import type { Agent, Command } from 'package-manager-detector';

/** Package managers shown in the install tabs, in display order. */
export const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const satisfies Agent[];
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

/**
 * Resolve a runner-agnostic command into its package-manager-specific form.
 *
 * @example
 * getCommandText('pnpm', 'execute', 'lily-svelte@latest add button')
 * // → 'pnpm dlx lily-svelte@latest add button'
 * getCommandText('npm', 'install', 'vaul-svelte')
 * // → 'npm install vaul-svelte'
 */
export function getCommandText(pm: Agent, type: Command, command: string): string {
	const resolved = resolveCommand(pm, type, command.split(' '));
	// Docs commands are static, so an unresolved command is an authoring error.
	if (!resolved) return command;
	return `${resolved.command} ${resolved.args.join(' ')}`.trim();
}
