<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		style = '',
		children
	}: { class?: string; style?: string; children: Snippet } = $props();
</script>

<div class={clsx('relative px-4 sm:px-8 lg:px-12', className)} {style}>
	<div class="mx-auto max-w-2xl lg:max-w-5xl">
		{@render children()}
	</div>
</div>
