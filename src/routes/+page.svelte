<script lang="ts">
	import { base } from '$app/paths';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import { posts } from '$lib/posts';
	import { contacts, projects, site } from '$lib/site';

	const recent = $derived(posts.slice(0, 4));
</script>

<svelte:head>
	<title>{site.title} - {site.headline}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<Container class="mt-9">
	<div class="max-w-2xl">
		<h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
			{site.headline}
		</h1>
		<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
			{site.intro}
		</p>
		<div class="mt-6 flex gap-6">
			{#each contacts as contact (contact.href)}
				<a href={contact.href} aria-label={contact.label} class="group -m-1 p-1">
					<SocialIcon
						name={contact.icon}
						class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
					/>
				</a>
			{/each}
		</div>
	</div>
</Container>

<Container class="mt-24 md:mt-28">
	<div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
		<div class="flex flex-col gap-16">
			{#each recent as post (post.slug)}
				<ArticleCard {post} />
			{/each}
		</div>

		<div class="space-y-10 lg:pl-16 xl:pl-24">
			<div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
				<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
					<SocialIcon name="drupal" class="h-6 w-6 flex-none fill-zinc-400 dark:fill-zinc-500" />
					<span class="ml-3">Maintains on drupal.org</span>
				</h2>
				<ol class="mt-6 space-y-4">
					{#each projects as project (project.href)}
						<li class="flex gap-4">
							<div
								class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
							>
								<SocialIcon name="drupal" class="h-6 w-6 fill-zinc-400 dark:fill-zinc-500" />
							</div>
							<dl class="flex flex-auto flex-wrap gap-x-2">
								<dt class="sr-only">Project</dt>
								<dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
									<a
										href={project.href}
										class="transition hover:text-teal-500 dark:hover:text-teal-400"
										>{project.name}</a
									>
								</dd>
								<dt class="sr-only">Role</dt>
								<dd class="text-xs text-zinc-500 dark:text-zinc-400">{project.role}</dd>
							</dl>
						</li>
					{/each}
				</ol>
				<Button href="https://www.drupal.org/u/lussoluca" variant="secondary" class="mt-6 w-full">
					See all projects
				</Button>
			</div>

			<div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
				<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
					<SocialIcon name="rss" class="h-6 w-6 flex-none fill-zinc-400 dark:fill-zinc-500" />
					<span class="ml-3">Follow the blog</span>
				</h2>
				<p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
					New posts go out through the feed. No newsletter, no tracking, no sign-up.
				</p>
				<Button href="{base}/rss.xml" class="mt-6 w-full">Subscribe by RSS</Button>
			</div>
		</div>
	</div>
</Container>
