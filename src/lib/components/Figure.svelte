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

<figure class={wide ? 'sm:-mx-16 lg:-mx-28' : ''}>
	<button
		type="button"
		onclick={() => (zoomed = true)}
		class="border-rule bg-card hover:border-signal block w-full cursor-zoom-in border p-1 transition-colors"
		aria-label="Enlarge screenshot: {alt}"
	>
		<img {alt} src={href} class="w-full" loading="lazy" decoding="async" />
	</button>
	<figcaption class="text-muted mt-2 font-mono text-[11px] leading-relaxed">
		{caption}
	</figcaption>
</figure>

{#if zoomed}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4"
		role="dialog"
		aria-modal="true"
		aria-label={alt}
		tabindex="-1"
		onclick={() => (zoomed = false)}
	>
		<img {alt} src={href} class="max-h-full max-w-full cursor-zoom-out object-contain" />
		<button
			type="button"
			class="absolute top-4 right-4 border border-white/25 px-3 py-1 font-mono text-[11px] tracking-widest text-white uppercase hover:bg-white/15"
			onclick={() => (zoomed = false)}>Close</button
		>
	</div>
{/if}

<svelte:window onkeydown={(event) => event.key === 'Escape' && (zoomed = false)} />
