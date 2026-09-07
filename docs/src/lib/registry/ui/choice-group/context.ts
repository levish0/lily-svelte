import { createContext } from 'svelte';
export const [getSegmentSize, setSegmentSize] = createContext<{ size: 'sm' | 'lg' }>();
