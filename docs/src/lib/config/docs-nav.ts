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
			{ title: 'Accordion', href: '/docs/components/accordion' },
			{ title: 'Avatar', href: '/docs/components/avatar' },
			{ title: 'Badge', href: '/docs/components/badge' },
			{ title: 'Breadcrumb', href: '/docs/components/breadcrumb' },
			{ title: 'Button', href: '/docs/components/button' },
			{ title: 'Button Group', href: '/docs/components/button-group' },
			{ title: 'Card', href: '/docs/components/card' },
			{ title: 'Checkbox', href: '/docs/components/checkbox' },
			{ title: 'Collapsible', href: '/docs/components/collapsible' },
			{ title: 'Command', href: '/docs/components/command' },
			{ title: 'Dialog', href: '/docs/components/dialog' },
			{ title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
			{ title: 'File Drop Zone', href: '/docs/components/file-drop-zone' },
			{ title: 'Input', href: '/docs/components/input' },
			{ title: 'Input OTP', href: '/docs/components/input-otp' },
			{ title: 'Kbd', href: '/docs/components/kbd' },
			{ title: 'Label', href: '/docs/components/label' },
			{ title: 'Password', href: '/docs/components/password' },
			{ title: 'Phone Input', href: '/docs/components/phone-input' },
			{ title: 'Popover', href: '/docs/components/popover' },
			{ title: 'Progress', href: '/docs/components/progress' },
			{ title: 'Radio Group', href: '/docs/components/radio-group' },
			{ title: 'Scroll Area', href: '/docs/components/scroll-area' },
			{ title: 'Select', href: '/docs/components/select' },
			{ title: 'Separator', href: '/docs/components/separator' },
			{ title: 'Skeleton', href: '/docs/components/skeleton' },
			{ title: 'Sonner', href: '/docs/components/sonner' },
			{ title: 'Switch', href: '/docs/components/switch' },
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
