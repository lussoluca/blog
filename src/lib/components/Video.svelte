<script lang="ts">
	import { base } from '$app/paths';

	let {
		src,
		poster,
		caption,
		wide = false
	}: { src: string; poster?: string; caption: string; wide?: boolean } = $props();
</script>

<figure class={wide ? 'lg:-mx-16 xl:-mx-24' : ''}>
	<!-- Screen recordings carry no audio, so they play under the reader's control. -->
	<video
		src="{base}{src}"
		poster={poster ? `${base}${poster}` : undefined}
		controls
		muted
		playsinline
		preload="metadata"
		class="w-full overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10"
	></video>
	<figcaption class="mt-3 text-sm text-zinc-400 dark:text-zinc-500">
		{caption}
	</figcaption>
</figure>
