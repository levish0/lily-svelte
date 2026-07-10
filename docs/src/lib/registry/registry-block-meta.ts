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
	},
	'chart-area-default': {
		description: 'A simple area chart.',
		iframeHeight: '560px',
		className: 'flex min-h-svh items-center justify-center p-6 [&>*]:max-w-lg'
	},
	'chart-area-stacked': {
		description: 'A stacked area chart.',
		iframeHeight: '560px',
		className: 'flex min-h-svh items-center justify-center p-6 [&>*]:max-w-lg'
	},
	'chart-bar-default': {
		description: 'A simple bar chart.',
		iframeHeight: '560px',
		className: 'flex min-h-svh items-center justify-center p-6 [&>*]:max-w-lg'
	},
	'chart-bar-multiple': {
		description: 'A grouped bar chart with two series.',
		iframeHeight: '560px',
		className: 'flex min-h-svh items-center justify-center p-6 [&>*]:max-w-lg'
	},
	'chart-pie-simple': {
		description: 'A simple pie chart.',
		iframeHeight: '560px',
		className: 'flex min-h-svh items-center justify-center p-6 [&>*]:max-w-lg'
	},
	'chart-pie-donut': {
		description: 'A donut chart with centered total.',
		iframeHeight: '560px',
		className: 'flex min-h-svh items-center justify-center p-6 [&>*]:max-w-lg'
	}
};
