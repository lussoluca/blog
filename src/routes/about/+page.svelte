<script lang="ts">
	import { contacts, spec, site } from '$lib/site';
</script>

<svelte:head>
	<title>About and contacts · {site.title}</title>
	<meta
		name="description"
		content="Who Luca Lusso is, what he maintains, and how to get in touch."
	/>
</svelte:head>

<div class="mx-auto w-full max-w-5xl px-5 pt-16 pb-8 sm:pt-24">
	<p class="label">About and contacts</p>

	<h1 class="hero mt-3 text-[clamp(2.75rem,10vw,6.5rem)] leading-[0.88]">
		Drupal, from<br />the inside
	</h1>

	<div class="mt-16 grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
		<div class="prose-panel max-w-[62ch]">
			<p>
				I am Luca Lusso, lead developer at
				<a href="https://www.sparkfabrik.com/">SparkFabrik</a>. I have spent more than fifteen years
				building Drupal sites, including some of the largest ones in Italy, and a good part of that
				time in the layer underneath: the container, the event dispatcher, the cache, the queries
				nobody meant to run.
			</p>

			<p>
				That is how I ended up maintaining
				<a href="https://www.drupal.org/project/webprofiler">WebProfiler</a>, which puts the Symfony
				profiler inside Drupal, and
				<a href="https://www.drupal.org/project/monolog">Monolog</a>, which replaces Drupal logging
				with something you can actually ship to a log aggregator. I also maintain
				<a href="https://www.drupal.org/project/search_api_typesense">Search API Typesense</a> and
				co-maintain <a href="https://www.drupal.org/project/devel">Devel</a>, among roughly fifty
				other projects on drupal.org.
			</p>

			<p>
				When I am not writing code I teach Drupal to teams and public bodies, and I speak at Drupal
				and PHP conferences. My current obsession is making AI work in Drupal observable, because a
				provider call you cannot see is a provider call you cannot debug, budget, or trust.
			</p>

			<h2>Get in touch</h2>

			<p>
				The fastest route is GitHub or drupal.org: open an issue, or comment on one that already
				exists. For work, talks or training, LinkedIn reaches me reliably.
			</p>
		</div>

		<aside class="lg:pt-1">
			<h2 class="label hairline pt-4">Spec sheet</h2>
			<dl class="mt-3 font-mono text-[13px]">
				{#each spec as row (row.name + row.value)}
					<div class="border-rule flex items-baseline justify-between gap-4 border-b py-2">
						<dt class="text-muted">{row.name}</dt>
						<dd class="text-right">
							{#if row.href}
								<a
									href={row.href}
									class="text-trace hover:text-signal underline decoration-1 underline-offset-3"
									>{row.value}</a
								>
							{:else}
								{row.value}
							{/if}
						</dd>
					</div>
				{/each}
			</dl>

			<h2 class="label hairline mt-12 pt-4">Elsewhere</h2>
			<ul class="bg-rule mt-3 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-1">
				{#each contacts as contact (contact.href)}
					<li>
						<a
							href={contact.href}
							rel="me noreferrer"
							class="bg-card hover:bg-bar hover:text-bar-ink flex items-baseline justify-between gap-4 px-3 py-3 font-mono text-[13px] transition-colors"
						>
							<span class="tracking-wide uppercase">{contact.label}</span>
							<span class="text-muted group-hover:text-bar-ink transition-colors"
								>{contact.handle}</span
							>
						</a>
					</li>
				{/each}
			</ul>
		</aside>
	</div>
</div>
