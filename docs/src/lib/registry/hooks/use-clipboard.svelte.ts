export type ClipboardStatus = 'success' | 'failure';

/**
 * Copies text to the clipboard and exposes a short-lived `status` for feedback.
 *
 * ```svelte
 * const clipboard = new UseClipboard();
 * <button onclick={() => clipboard.copy('hello')}>
 *   {clipboard.copied ? 'Copied' : 'Copy'}
 * </button>
 * ```
 */
export class UseClipboard {
	#status = $state<ClipboardStatus>();
	#timeout: ReturnType<typeof setTimeout> | undefined;
	#opts: { delay?: number };

	/** @param opts.delay ms before `status` resets after a copy; read on each copy, so a getter stays live */
	constructor(opts: { delay?: number } = {}) {
		this.#opts = opts;
	}

	get delay() {
		return this.#opts.delay ?? 2000;
	}

	async copy(text: string): Promise<ClipboardStatus> {
		if (this.#timeout) {
			clearTimeout(this.#timeout);
			this.#status = undefined;
		}

		this.#status = await copyText(text);
		this.#timeout = setTimeout(() => (this.#status = undefined), this.delay);

		return this.#status;
	}

	/** `true` right after a successful copy, until `delay` elapses. */
	get copied() {
		return this.#status === 'success';
	}

	/** `'success'` | `'failure'` after a copy, `undefined` once it resets. */
	get status() {
		return this.#status;
	}
}

export async function copyText(text: string): Promise<ClipboardStatus> {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text);
			return 'success';
		}

		// insecure contexts have no clipboard API — fall back to a hidden textarea
		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.style.position = 'fixed';
		textarea.style.opacity = '0';
		document.body.appendChild(textarea);
		textarea.select();
		const ok = document.execCommand('copy');
		document.body.removeChild(textarea);

		return ok ? 'success' : 'failure';
	} catch {
		return 'failure';
	}
}
