import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function initial(): Theme {
	if (!browser) return 'light';

	return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

let current = $state<Theme>(initial());

export const theme = {
	get current() {
		return current;
	},
	toggle() {
		current = current === 'dark' ? 'light' : 'dark';
		document.documentElement.classList.toggle('dark', current === 'dark');
		localStorage.setItem(STORAGE_KEY, current);
	}
};
