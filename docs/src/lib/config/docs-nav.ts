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
		title: "Getting Started",
		items: [
			{ title: "Introduction", href: "/docs" },
			{ title: "Installation", href: "/docs/installation" },
			{ title: "Dark Mode", href: "/docs/dark-mode" }
		]
	},
	{
		title: "Components",
		items: [
			{ title: "Avatar", href: "/docs/components/avatar" },
			{ title: "Badge", href: "/docs/components/badge" },
			{ title: "Button", href: "/docs/components/button" },
			{ title: "Card", href: "/docs/components/card" },
			{ title: "Input", href: "/docs/components/input" },
			{ title: "Label", href: "/docs/components/label" },
			{ title: "Separator", href: "/docs/components/separator" },
			{ title: "Textarea", href: "/docs/components/textarea" },
			{ title: "Tooltip", href: "/docs/components/tooltip" }
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
