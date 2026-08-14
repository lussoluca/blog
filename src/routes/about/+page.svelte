<script lang="ts">
	import { base } from '$app/paths';
	import Container from '$lib/components/Container.svelte';
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import { contacts, site } from '$lib/site';

	const headline =
		'I am Luca Lusso. I live in Italy, where I keep Drupal honest about what it does.';
	const description = 'Who Luca Lusso is, what he maintains, and how to get in touch.';
</script>

<svelte:head>
	<title>About - {site.title}</title>
	<meta name="description" content={description} />
</svelte:head>

<Container class="mt-16 sm:mt-32">
	<div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
		<div class="lg:pl-20">
			<div class="max-w-xs px-2.5 lg:max-w-none">
				<img
					src="{base}/images/avatar.png"
					alt="Luca Lusso"
					class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
				/>
			</div>
		</div>

		<div class="lg:order-first lg:row-span-2">
			<h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
				{headline}
			</h1>
			<div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
				<p>
					I have spent more than fifteen years building Drupal sites, including some of the largest
					ones in Italy, and a good part of that time in the layer underneath: the container, the
					event dispatcher, the cache, the queries nobody meant to run. Today I am lead developer at
					SparkFabrik.
				</p>
				<p>
					That is how I ended up maintaining WebProfiler, which puts the Symfony profiler inside
					Drupal, and Monolog, which replaces Drupal logging with something you can actually ship to
					a log aggregator. I also maintain Search API Typesense and co-maintain Devel, among
					roughly fifty other projects on drupal.org.
				</p>
				<p>
					When I am not writing code I teach Drupal to teams and public bodies, and I speak at
					Drupal and PHP conferences. My current obsession is making AI work in Drupal observable,
					because a provider call you cannot see is a provider call you cannot debug, budget, or
					trust.
				</p>
				<p>
					The fastest way to reach me is GitHub or drupal.org: open an issue, or comment on one that
					already exists. For work, talks or training, LinkedIn reaches me reliably.
				</p>
				<p>
					This site counts page views with Cloudflare Web Analytics. It sets no cookies, builds no
					profile, and follows nobody across the web. I see which posts get read, and nothing about
					who read them.
				</p>
			</div>
		</div>

		<div class="lg:pl-20">
			<ul role="list">
				{#each contacts as contact, index (contact.href)}
					<li class="flex {index > 0 ? 'mt-4' : ''}">
						<a
							href={contact.href}
							class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
						>
							<SocialIcon
								name={contact.icon}
								class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
							/>
							<span class="ml-4"
								>{contact.label}
								<span class="text-zinc-400 dark:text-zinc-500">{contact.handle}</span></span
							>
						</a>
					</li>
				{/each}
				<li class="mt-8 flex border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
					<a
						href="{base}/rss.xml"
						class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
					>
						<SocialIcon
							name="rss"
							class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
						/>
						<span class="ml-4">Subscribe to the feed</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</Container>
