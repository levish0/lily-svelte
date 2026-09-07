import { createContext } from 'svelte';

export type TabsPresentation = { variant: 'default' | 'segmented'; size: 'sm' | 'lg' };
export const [getTabsPresentation, setTabsPresentation] = createContext<TabsPresentation>();
