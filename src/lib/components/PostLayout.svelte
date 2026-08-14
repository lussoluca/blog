<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { findPost, formatDate } from '$lib/posts';
	import { site } from '$lib/site';

	let {
		title,
		date,
		excerpt = '',
		tags = [] as string[],
		children
	}: {
		title: string;
		date: string;
		excerpt?: string;
		tags?: string[];
		children: import('svelte').Snippet;
	} = $props();

	const slug = $derived(page.url.pathname.replace(/\/$/, '').split('/').at(-1) ?? '');
	const post = $derived(findPost(slug));

	let progress = $state(0);

	function trackProgress() {
		const scrollable = document.documentElement.scrollHeight - window.innerHeight;
		progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 1;
	}
</script>

<svelte:head>
	<title>{title} · {site.title}</title>
	<meta name="description" content={excerpt || site.description} />
</svelte:head>

<svelte:window onscroll={trackProgress} onresize={trackProgress} />

<div
	class="bg-signal fixed inset-x-0 top-0 z-40 h-[3px] origin-left"
	style:transform="scaleX({progress})"
	role="presentation"
></div>

<article class="mx-auto w-full max-w-3xl px-5 pt-14 sm:pt-20">
	<a href="{base}/" class="label hover:text-signal">← All posts</a>

	<h1 class="hero mt-6 text-[clamp(2.375rem,7.5vw,4.5rem)] leading-[0.94] text-balance">
		{title}
	</h1>

	{#if excerpt}
		<p class="text-muted mt-6 text-xl leading-relaxed text-balance">{excerpt}</p>
	{/if}

	<dl
		class="border-rule mt-8 grid grid-cols-2 gap-y-3 border-y py-3 font-mono text-[11px] sm:grid-cols-4"
	>
		<div>
			<dt class="text-muted uppercase">Published</dt>
			<dd class="mt-1">{formatDate(date)}</dd>
		</div>
		<div>
			<dt class="text-muted uppercase">Reading</dt>
			<dd class="mt-1">{post?.readingMinutes ?? '--'} min</dd>
		</div>
		<div>
			<dt class="text-muted uppercase">Words</dt>
			<dd class="mt-1">{post?.words.toLocaleString('en-GB') ?? '--'}</dd>
		</div>
		<div>
			<dt class="text-muted uppercase">Tags</dt>
			<dd class="mt-1">{tags.join(', ') || '--'}</dd>
		</div>
	</dl>

	<div class="prose-panel mt-12">
		{@render children()}
	</div>

	<footer class="border-rule mt-20 border-t pt-6">
		<p class="text-lg">
			Questions, corrections, or a better way to do this? Find me on
			<a
				href="https://github.com/lussoluca"
				class="text-trace hover:text-signal underline decoration-1 underline-offset-3">GitHub</a
			>
			or read
			<a
				href="{base}/about/"
				class="text-trace hover:text-signal underline decoration-1 underline-offset-3"
				>the rest of my contacts</a
			>.
		</p>
	</footer>
</article>
