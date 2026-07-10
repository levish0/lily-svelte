export type BlockMeta = {
	description: string;
	/** Height of the preview iframe (defaults to 930px). */
	iframeHeight?: string;
	/** Extra classes for the /view/[name] wrapper. */
	className?: string;
};

export const blockMeta: Record<string, BlockMeta> = {
	'sidebar-01': {
		description: 'A simple sidebar with navigation grouped by section.'
	},
	'login-01': {
		description: 'A simple login form.',
		iframeHeight: '870px'
	}
};
