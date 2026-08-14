<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import SimpleLayout from '$lib/components/SimpleLayout.svelte';
	import { formatDate, posts } from '$lib/posts';
	import { site } from '$lib/site';

	const title = 'Writing about Drupal internals, PHP, and making things observable.';
	const intro =
		'Long-form notes on the parts of Drupal you only meet when something is slow, broken, or newly possible, in chronological order.';
</script>

<svelte:head>
	<title>Articles - {site.title}</title>
	<meta name="description" content={intro} />
</svelte:head>

<SimpleLayout {title} {intro}>
	<div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
		<div class="flex max-w-3xl flex-col space-y-16">
			{#each posts as post (post.slug)}
				<article class="md:grid md:grid-cols-4 md:items-baseline">
					<ArticleCard {post} class="md:col-span-3" dateClass="md:hidden" />
					<time
						datetime={post.date}
						class="relative z-10 order-first mt-1 mb-3 flex items-center text-sm text-zinc-400 max-md:hidden dark:text-zinc-500"
					>
						{formatDate(post.date)}
					</time>
				</article>
			{/each}
		</div>
	</div>
</SimpleLayout>
