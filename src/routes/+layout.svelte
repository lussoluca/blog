<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { site } from '$lib/site';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="{base}/images/avatar.jpg" />
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
