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
	'sidebar-02': {
		description: 'A sidebar with collapsible sections.'
	},
	'sidebar-03': {
		description: 'A sidebar with submenus.'
	},
	'sidebar-04': {
		description: 'A floating sidebar with submenus.'
	},
	'sidebar-05': {
		description: 'A sidebar that collapses to icons.'
	},
	'login-01': {
		description: 'A simple login form.',
		iframeHeight: '870px'
	},
	'signup-01': {
		description: 'A signup form with password strength.',
		iframeHeight: '870px'
	},
	'otp-01': {
		description: 'A one-time password verification form.',
		iframeHeight: '620px'
	},
	'calendar-01': {
		description: 'A simple calendar.',
		iframeHeight: '620px'
	}
};
