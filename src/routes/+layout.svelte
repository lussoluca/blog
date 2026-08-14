<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import type { Cell } from '$lib/metrics';
	import { posts, findPost, totalWords } from '$lib/posts';
	import { site } from '$lib/site';

	let { children } = $props();

	/**
	 * Toolbar metrics describe whatever the current page is, the same way the
	 * WebProfiler toolbar describes the request that produced the page.
	 */
	const cells = $derived.by((): Cell[] => {
		const path = page.url.pathname.replace(base, '').replace(/\/$/, '');
		const slug = path.startsWith('/blog/') ? path.slice('/blog/'.length) : null;
		const post = slug ? findPost(slug) : undefined;

		if (post) {
			return [
				{ label: 'words', value: post.words.toLocaleString('en-GB') },
				{ label: 'read', value: `${post.readingMinutes} min` },
				{ label: 'tags', value: (post.tags ?? []).join(', ') || '--' }
			];
		}

		return [
			{ label: 'posts', value: String(posts.length) },
			{ label: 'words', value: totalWords.toLocaleString('en-GB') }
		];
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title={site.title} href="{base}/rss.xml" />
</svelte:head>

<a
	href="#content"
	class="focus:bg-signal sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-60 focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-white"
>
	Skip to content
</a>

<div class="flex min-h-svh flex-col pb-9">
	<main id="content" class="flex-1">
		{@render children()}
	</main>

	<footer class="mx-auto w-full max-w-5xl px-5 pt-16 pb-8">
		<div class="hairline flex flex-wrap items-baseline justify-between gap-3 pt-4">
			<p class="label">
				{site.title}, {site.role}. Built with SvelteKit, measured with WebProfiler.
			</p>
			<a class="label hover:text-signal" href="{base}/rss.xml">RSS</a>
		</div>
	</footer>
</div>

<Toolbar {cells} />
