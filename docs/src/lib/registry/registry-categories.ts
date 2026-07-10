export type RegistryCategory = {
	name: string;
	slug: string;
	hidden: boolean;
};

export const registryCategories: RegistryCategory[] = [
	{ name: 'Sidebar', slug: 'sidebar', hidden: false },
	{ name: 'Login', slug: 'login', hidden: false },
	{ name: 'Signup', slug: 'signup', hidden: false },
	{ name: 'OTP', slug: 'otp', hidden: false },
	{ name: 'Calendar', slug: 'calendar', hidden: false }
];
