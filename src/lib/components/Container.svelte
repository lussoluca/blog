<script lang="ts">
	import type { Snippet } from 'svelte';
	import ContainerInner from './ContainerInner.svelte';
	import ContainerOuter from './ContainerOuter.svelte';

	let {
		class: className = '',
		style = '',
		innerStyle = '',
		innerClass = '',
		children
	}: {
		class?: string;
		style?: string;
		innerStyle?: string;
		innerClass?: string;
		children: Snippet;
	} = $props();
</script>

<ContainerOuter class={className} {style}>
	<ContainerInner class={innerClass} style={innerStyle}>
		{@render children()}
	</ContainerInner>
</ContainerOuter>
