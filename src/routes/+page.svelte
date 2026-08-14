<script lang="ts">
	import { base } from '$app/paths';
	import { posts, formatDate } from '$lib/posts';
	import { site } from '$lib/site';

	const longest = Math.max(...posts.map((post) => post.readingMinutes), 1);
</script>

<svelte:head>
	<title>{site.title} · {site.description}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<header class="mx-auto w-full max-w-5xl px-5 pt-16 pb-14 sm:pt-24">
	<p class="label">{site.role}</p>

	<h1 class="hero mt-3 text-[clamp(3.25rem,14vw,9.5rem)] leading-[0.84]">
		Luca<br />Lusso
	</h1>

	<p class="mt-8 max-w-2xl text-xl leading-relaxed text-balance sm:text-2xl">
		{site.thesis}
	</p>
</header>

<section class="mx-auto w-full max-w-5xl px-5" aria-labelledby="timeline-heading">
	<div class="hairline flex items-baseline justify-between pt-4">
		<h2 id="timeline-heading" class="label">Posts</h2>
		<p class="label">
			{posts.length}
			{posts.length === 1 ? 'span' : 'spans'} · newest first
		</p>
	</div>

	<ul class="mt-2">
		{#each posts as post, index (post.slug)}
			<li>
				<a
					href="{base}/blog/{post.slug}/"
					class="group border-rule hover:bg-card grid grid-cols-1 gap-x-6 gap-y-3 border-b py-6 transition-colors sm:grid-cols-[6.5rem_1fr_9rem] sm:px-3"
				>
					<time
						datetime={post.date}
						class="text-muted font-mono text-xs tracking-wide uppercase sm:pt-2"
					>
						{formatDate(post.date)}
					</time>

					<div>
						<h3
							class="font-display group-hover:text-trace text-2xl leading-tight font-bold tracking-[-0.02em] text-balance sm:text-[1.75rem]"
						>
							{post.title}
						</h3>
						<p class="text-muted mt-2 max-w-prose text-[1.0625rem] leading-relaxed">
							{post.excerpt}
						</p>
						{#if post.tags?.length}
							<p class="text-muted mt-3 flex flex-wrap gap-x-3 font-mono text-[11px] tracking-wide">
								{#each post.tags as tag (tag)}
									<span>#{tag}</span>
								{/each}
							</p>
						{/if}
					</div>

					<div class="sm:pt-2">
						<div class="bg-rule/60 h-[3px] w-full">
							<div
								class="span bg-trace group-hover:bg-signal h-full transition-colors"
								style:--span-width="{Math.round((post.readingMinutes / longest) * 100)}%"
								style:--span-delay="{index * 90}ms"
							></div>
						</div>
						<p class="text-muted mt-2 font-mono text-[11px]">
							{post.readingMinutes} min read
						</p>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	/* Reading time drawn as a duration bar, the way a profiler draws a span. */
	.span {
		width: var(--span-width);
		animation: span-grow 700ms cubic-bezier(0.22, 1, 0.36, 1) var(--span-delay) both;
	}

	@keyframes span-grow {
		from {
			width: 0;
		}
		to {
			width: var(--span-width);
		}
	}
</style>
