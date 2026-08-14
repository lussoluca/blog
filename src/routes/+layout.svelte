<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { analytics, site } from '$lib/site';

	let { children } = $props();

	// The beacon tracks History API navigations on its own, so loading it once
	// from the root layout covers every client-side route change.
	$effect(() => {
		if (import.meta.env.DEV || !analytics.cloudflareToken) return;

		const beacon = document.createElement('script');
		beacon.type = 'module';
		beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
		beacon.dataset.cfBeacon = JSON.stringify({ token: analytics.cloudflareToken });
		document.head.append(beacon);
	});
</script>

<svelte:head>
	<link rel="icon" href="{base}/images/avatar.png" />
	<link rel="alternate" type="application/rss+xml" title={site.title} href="{base}/rss.xml" />
</svelte:head>

<div class="flex w-full">
	<div class="fixed inset-0 flex justify-center sm:px-8">
		<div class="flex w-full max-w-7xl lg:px-8">
			<div
				class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"
			></div>
		</div>
	</div>

	<div class="relative flex w-full flex-col">
		<Header />
		<main class="flex-auto">
			{@render children()}
		</main>
		<Footer />
	</div>
</div>
