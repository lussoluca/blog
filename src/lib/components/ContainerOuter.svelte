<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		style = '',
		children
	}: { class?: string; style?: string; children: Snippet } = $props();
</script>

<div class={clsx('sm:px-8', className)} {style}>
	<div class="mx-auto w-full max-w-7xl lg:px-8">
		{@render children()}
	</div>
</div>
