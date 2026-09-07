/** Fit same-origin component previews without suppressing their own list scrolling. */
export function fitPreviewHeight(frame: HTMLIFrameElement) {
	let observer: ResizeObserver | undefined;
	let animationFrame = 0;
	function observeContent() {
		observer?.disconnect();
		cancelAnimationFrame(animationFrame);
		const content = frame.contentDocument?.querySelector('[data-preview-style]');
		if (!content) return;
		const resize = () => {
			frame.style.height = `${Math.ceil(content.getBoundingClientRect().height)}px`;
		};
		observer = new ResizeObserver(() => {
			cancelAnimationFrame(animationFrame);
			animationFrame = requestAnimationFrame(resize);
		});
		observer.observe(content);
		resize();
	}
	frame.addEventListener('load', observeContent);
	observeContent();
	return {
		destroy() {
			frame.removeEventListener('load', observeContent);
			observer?.disconnect();
			cancelAnimationFrame(animationFrame);
		}
	};
}

/** Blocks use a stable viewport minimum while their outer preview grows to fit content. */
export function fitBlockPreview(frame: HTMLIFrameElement) {
	const baseline = Number(frame.getAttribute('height')) || 930;
	const wrapper = frame.closest<HTMLElement>('[data-view]');
	let observer: ResizeObserver | undefined;
	let pending = 0;
	function observe() {
		observer?.disconnect();
		cancelAnimationFrame(pending);
		const content = frame.contentDocument?.querySelector<HTMLElement>('[data-preview-style]');
		if (!content) {
			frame.style.height = '';
			if (frame.offsetWidth) wrapper?.style.setProperty('--height', `${baseline}px`);
			return;
		}
		const resize = () => {
			if (!frame.offsetWidth) return;
			const height = Math.max(baseline, Math.ceil(content.getBoundingClientRect().height));
			if (frame.style.height !== `${height}px`) frame.style.height = `${height}px`;
			wrapper?.style.setProperty('--height', `${height}px`);
		};
		observer = new ResizeObserver(() => {
			cancelAnimationFrame(pending);
			pending = requestAnimationFrame(resize);
		});
		observer.observe(content);
		observer.observe(frame);
		resize();
	}
	frame.addEventListener('load', observe);
	observe();
	return {
		destroy() {
			observer?.disconnect();
			cancelAnimationFrame(pending);
			frame.removeEventListener('load', observe);
		}
	};
}
