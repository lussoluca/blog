<script lang="ts">
	import { base } from '$app/paths';

	let {
		src,
		alt,
		caption,
		wide = false
	}: { src: string; alt: string; caption: string; wide?: boolean } = $props();

	let zoomed = $state(false);
	const href = $derived(`${base}${src}`);
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && (zoomed = false)} />

<figure class={wide ? 'lg:-mx-16 xl:-mx-24' : ''}>
	<button
		type="button"
		onclick={() => (zoomed = true)}
		class="block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/5 transition hover:ring-zinc-900/15 dark:bg-zinc-800 dark:ring-white/10 dark:hover:ring-white/20"
		aria-label="Enlarge screenshot: {alt}"
	>
		<img {alt} src={href} class="w-full" loading="lazy" decoding="async" />
	</button>
	<figcaption class="mt-3 text-sm text-zinc-400 dark:text-zinc-500">
		{caption}
	</figcaption>
</figure>

{#if zoomed}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-60 flex items-center justify-center bg-zinc-900/80 p-4 backdrop-blur-sm dark:bg-black/85"
		role="dialog"
		aria-modal="true"
		aria-label={alt}
		tabindex="-1"
		onclick={() => (zoomed = false)}
	>
		<img {alt} src={href} class="max-h-full max-w-full cursor-zoom-out rounded-xl object-contain" />
		<button
			type="button"
			class="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-zinc-800 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm transition hover:bg-white dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
			onclick={() => (zoomed = false)}>Close</button
		>
	</div>
{/if}
