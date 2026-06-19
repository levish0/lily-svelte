type Options = {
	/** The time before the copied status is reset. */
	delay: number;
	/** Whether to reset the copied status after a delay. */
	reset: boolean;
};

/** Copy text to the clipboard and track a transient "copied" state.
 *
 * ## Usage
 * ```svelte
 * <script lang="ts">
 *   import { UseClipboard } from "$lib/hooks/use-clipboard.svelte";
 *   const clipboard = new UseClipboard();
 * </script>
 *
 * <button onclick={() => clipboard.copy("Hello!")}>
 *   {clipboard.copied ? "Copied!" : "Copy"}
 * </button>
 * ```
 */
export class UseClipboard {
	#copiedStatus = $state<'success' | 'failure'>();
	delay: number;
	reset: boolean;
	timeout: ReturnType<typeof setTimeout> | undefined = undefined;

	constructor({ delay = 2000, reset = true }: Partial<Options> = {}) {
		this.delay = delay;
		this.reset = reset;
	}

	async copy(text: string | number): Promise<'success' | 'failure'> {
		if (this.timeout) {
			this.#copiedStatus = undefined;
			clearTimeout(this.timeout);
		}

		this.#copiedStatus = await copyText(text.toString());

		if (this.reset) {
			this.timeout = setTimeout(() => {
				this.#copiedStatus = undefined;
			}, this.delay);
		}

		return this.#copiedStatus;
	}

	/** True when the user has just copied to the clipboard. */
	get copied(): boolean {
		return this.#copiedStatus === 'success';
	}

	/** The copy status, either `success` or `failure` (or `undefined` when idle). */
	get status(): 'success' | 'failure' | undefined {
		return this.#copiedStatus;
	}
}

export async function copyText(text: string): Promise<'success' | 'failure'> {
	try {
		await navigator.clipboard.writeText(text);
		return 'success';
	} catch {
		return 'failure';
	}
}
