<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import type { Cell } from '$lib/metrics';
	import { theme } from '$lib/theme.svelte';

	let { cells = [] as Cell[] } = $props();

	/** Real navigation timing, filled in after hydration. */
	let loadTime = $state('--');

	$effect(() => {
		const nav = performance.getEntriesByType('navigation')[0] as
			PerformanceNavigationTiming | undefined;
		const ms = nav ? nav.domContentLoadedEventEnd - nav.startTime : performance.now();
		loadTime = `${ms.toFixed(1)} ms`;
	});

	const links = [
		{ href: `${base}/`, label: 'Posts' },
		{ href: `${base}/about/`, label: 'About' }
	];

	function isActive(href: string): boolean {
		const path = page.url.pathname.replace(/\/$/, '');
		const target = href.replace(/\/$/, '');

		return target === `${base}` ? path === base || path === '' : path.startsWith(target);
	}
</script>

<nav class="bg-bar text-bar-ink fixed inset-x-0 bottom-0 z-50" aria-label="Site">
	<div class="flex h-9 items-stretch overflow-x-auto text-[11px]">
		<a
			href="{base}/"
			class="border-bar-rule flex shrink-0 items-center gap-2 border-r px-3 font-mono font-medium tracking-widest uppercase hover:bg-white/10"
		>
			<span
				class="bg-signal grid size-4 place-items-center text-[9px] leading-none font-bold text-white"
				>LL</span
			>
			<span class="hidden sm:inline">Luca Lusso</span>
		</a>

		{#each links as link (link.href)}
			<a
				href={link.href}
				aria-current={isActive(link.href) ? 'page' : undefined}
				class="border-bar-rule aria-[current=page]:text-signal flex shrink-0 items-center border-r px-3 font-mono tracking-wide hover:bg-white/10 aria-[current=page]:bg-white/10"
			>
				{link.label}
			</a>
		{/each}

		<div class="flex flex-1 items-stretch justify-end">
			{#each cells as cell (cell.label)}
				<div
					class="border-bar-rule hidden shrink-0 items-center gap-2 border-l px-3 font-mono md:flex"
				>
					<span class="text-white/45 uppercase">{cell.label}</span>
					<span class="text-bar-ink">{cell.value}</span>
				</div>
			{/each}

			<div
				class="border-bar-rule hidden shrink-0 items-center gap-2 border-l px-3 font-mono lg:flex"
				title="Time to DOMContentLoaded for this page"
			>
				<span class="text-white/45 uppercase">load</span>
				<span class="text-signal">{loadTime}</span>
			</div>

			<button
				type="button"
				onclick={theme.toggle}
				class="border-bar-rule flex shrink-0 items-center gap-2 border-l px-3 font-mono tracking-wide uppercase hover:bg-white/10"
				aria-label="Switch to {theme.current === 'dark' ? 'light' : 'dark'} theme"
			>
				{theme.current === 'dark' ? 'light' : 'dark'}
			</button>
		</div>
	</div>
</nav>
