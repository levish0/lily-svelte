export type NavItem = {
	title: string;
	href: string;
};

export type NavSection = {
	title: string;
	items: NavItem[];
};

export const docsNav: NavSection[] = [
	{
		title: 'Getting Started',
		items: [
			{ title: 'Introduction', href: '/docs' },
			{ title: 'Installation', href: '/docs/installation' },
			{ title: 'Dark Mode', href: '/docs/dark-mode' }
		]
	},
	{
		title: 'Components',
		items: [
			{ title: 'Overview', href: '/docs/components' },
			{ title: 'Accordion', href: '/docs/components/accordion' },
			{ title: 'Alert', href: '/docs/components/alert' },
			{ title: 'Alert Dialog', href: '/docs/components/alert-dialog' },
			{ title: 'Aspect Ratio', href: '/docs/components/aspect-ratio' },
			{ title: 'Avatar', href: '/docs/components/avatar' },
			{ title: 'Badge', href: '/docs/components/badge' },
			{ title: 'Breadcrumb', href: '/docs/components/breadcrumb' },
			{ title: 'Button', href: '/docs/components/button' },
			{ title: 'Button Group', href: '/docs/components/button-group' },
			{ title: 'Calendar', href: '/docs/components/calendar' },
			{ title: 'Card', href: '/docs/components/card' },
			{ title: 'Carousel', href: '/docs/components/carousel' },
			{ title: 'Chart', href: '/docs/components/chart' },
			{ title: 'Checkbox', href: '/docs/components/checkbox' },
			{ title: 'Collapsible', href: '/docs/components/collapsible' },
			{ title: 'Command', href: '/docs/components/command' },
			{ title: 'Context Menu', href: '/docs/components/context-menu' },
			{ title: 'Data Table', href: '/docs/components/data-table' },
			{ title: 'Date Picker', href: '/docs/components/date-picker' },
			{ title: 'Dialog', href: '/docs/components/dialog' },
			{ title: 'Drawer', href: '/docs/components/drawer' },
			{ title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
			{ title: 'Empty', href: '/docs/components/empty' },
			{ title: 'Field', href: '/docs/components/field' },
			{ title: 'File Drop Zone', href: '/docs/components/file-drop-zone' },
			{ title: 'Hover Card', href: '/docs/components/hover-card' },
			{ title: 'Input', href: '/docs/components/input' },
			{ title: 'Input Group', href: '/docs/components/input-group' },
			{ title: 'Input OTP', href: '/docs/components/input-otp' },
			{ title: 'Kbd', href: '/docs/components/kbd' },
			{ title: 'Label', href: '/docs/components/label' },
			{ title: 'Menubar', href: '/docs/components/menubar' },
			{ title: 'Navigation Menu', href: '/docs/components/navigation-menu' },
			{ title: 'Number Field', href: '/docs/components/number-field' },
			{ title: 'Pagination', href: '/docs/components/pagination' },
			{ title: 'Password', href: '/docs/components/password' },
			{ title: 'Phone Input', href: '/docs/components/phone-input' },
			{ title: 'PM Command', href: '/docs/components/pm-command' },
			{ title: 'Popover', href: '/docs/components/popover' },
			{ title: 'Progress', href: '/docs/components/progress' },
			{ title: 'Radio Group', href: '/docs/components/radio-group' },
			{ title: 'Range Calendar', href: '/docs/components/range-calendar' },
			{ title: 'Resizable', href: '/docs/components/resizable' },
			{ title: 'Scroll Area', href: '/docs/components/scroll-area' },
			{ title: 'Select', href: '/docs/components/select' },
			{ title: 'Separator', href: '/docs/components/separator' },
			{ title: 'Sheet', href: '/docs/components/sheet' },
			{ title: 'Sidebar', href: '/docs/components/sidebar' },
			{ title: 'Skeleton', href: '/docs/components/skeleton' },
			{ title: 'Slider', href: '/docs/components/slider' },
			{ title: 'Sonner', href: '/docs/components/sonner' },
			{ title: 'Spinner', href: '/docs/components/spinner' },
			{ title: 'Stepper', href: '/docs/components/stepper' },
			{ title: 'Switch', href: '/docs/components/switch' },
			{ title: 'Table', href: '/docs/components/table' },
			{ title: 'Table of Contents', href: '/docs/components/toc' },
			{ title: 'Tabs', href: '/docs/components/tabs' },
			{ title: 'Tags Input', href: '/docs/components/tags-input' },
			{ title: 'Textarea', href: '/docs/components/textarea' },
			{ title: 'Toggle', href: '/docs/components/toggle' },
			{ title: 'Toggle Group', href: '/docs/components/toggle-group' },
			{ title: 'Tooltip', href: '/docs/components/tooltip' }
		]
	}
];

/** Flattened, ordered list of every doc page (for prev/next navigation). */
export const flatNav: NavItem[] = docsNav.flatMap((section) => section.items);

/** Find the previous/next doc pages relative to a pathname. */
export function findNeighbors(pathname: string): {
	previous: NavItem | null;
	next: NavItem | null;
} {
	const index = flatNav.findIndex((item) => item.href === pathname);
	if (index === -1) return { previous: null, next: null };
	return {
		previous: index > 0 ? flatNav[index - 1] : null,
		next: index < flatNav.length - 1 ? flatNav[index + 1] : null
	};
}
