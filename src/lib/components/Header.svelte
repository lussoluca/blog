<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Container from './Container.svelte';
	import { theme } from '$lib/theme.svelte';

	const links = [
		{ href: `${base}/about/`, label: 'About' },
		{ href: `${base}/articles/`, label: 'Articles' }
	];

	const isHomePage = $derived(page.url.pathname.replace(/\/$/, '') === base);

	let menuOpen = $state(false);
	let headerEl: HTMLDivElement | undefined = $state();
	let avatarEl: HTMLDivElement | undefined = $state();

	function isActive(href: string): boolean {
		return page.url.pathname.replace(/\/$/, '').startsWith(href.replace(/\/$/, ''));
	}

	function clamp(value: number, a: number, b: number): number {
		return Math.min(Math.max(value, Math.min(a, b)), Math.max(a, b));
	}

	/**
	 * The header pins itself and the home page avatar shrinks into it as the page
	 * scrolls. Both effects are driven by custom properties on the root element,
	 * so the markup stays declarative.
	 */
	$effect(() => {
		const root = document.documentElement;
		let isInitial = true;

		const setProperty = (property: string, value: string) =>
			root.style.setProperty(property, value);
		const removeProperty = (property: string) => root.style.removeProperty(property);

		function updateHeaderStyles() {
			if (!headerEl) return;

			const downDelay = avatarEl?.offsetTop ?? 0;
			const upDelay = 64;
			const { top, height } = headerEl.getBoundingClientRect();
			const scrollY = clamp(window.scrollY, 0, document.body.scrollHeight - window.innerHeight);

			if (isInitial) setProperty('--header-position', 'sticky');

			setProperty('--content-offset', `${downDelay}px`);

			if (isInitial || scrollY < downDelay) {
				setProperty('--header-height', `${downDelay + height}px`);
				setProperty('--header-mb', `${-downDelay}px`);
			} else if (top + height < -upDelay) {
				const offset = Math.max(height, scrollY - upDelay);
				setProperty('--header-height', `${offset}px`);
				setProperty('--header-mb', `${height - offset}px`);
			} else if (top === 0) {
				setProperty('--header-height', `${scrollY + height}px`);
				setProperty('--header-mb', `${-scrollY}px`);
			}

			if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
				setProperty('--header-inner-position', 'fixed');
				removeProperty('--header-top');
				removeProperty('--avatar-top');
			} else {
				removeProperty('--header-inner-position');
				setProperty('--header-top', '0px');
				setProperty('--avatar-top', '0px');
			}
		}

		function updateAvatarStyles() {
			if (!isHomePage) return;

			const downDelay = avatarEl?.offsetTop ?? 0;
			const fromScale = 1;
			const toScale = 36 / 64;
			const fromX = 0;
			const toX = 2 / 16;
			const scrollY = downDelay - window.scrollY;

			const scale = clamp(
				(scrollY * (fromScale - toScale)) / downDelay + toScale,
				fromScale,
				toScale
			);
			const x = clamp((scrollY * (fromX - toX)) / downDelay + toX, fromX, toX);

			setProperty('--avatar-image-transform', `translate3d(${x}rem, 0, 0) scale(${scale})`);

			const borderScale = 1 / (toScale / scale);
			const borderX = (-toX + x) * borderScale;
			setProperty(
				'--avatar-border-transform',
				`translate3d(${borderX}rem, 0, 0) scale(${borderScale})`
			);
			setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0');
		}

		function updateStyles() {
			updateHeaderStyles();
			updateAvatarStyles();
			isInitial = false;
		}

		updateStyles();
		window.addEventListener('scroll', updateStyles, { passive: true });
		window.addEventListener('resize', updateStyles);

		return () => {
			window.removeEventListener('scroll', updateStyles);
			window.removeEventListener('resize', updateStyles);
		};
	});
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && (menuOpen = false)} />

<header
	class="pointer-events-none relative z-50 flex flex-none flex-col"
	style="height: var(--header-height); margin-bottom: var(--header-mb)"
>
	{#if isHomePage}
		<div bind:this={avatarEl} class="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"></div>
		<Container
			class="top-0 order-last -mb-3 pt-3"
			style="position: var(--header-position)"
			innerClass="top-(--avatar-top,--spacing(3)) w-full"
			innerStyle="position: var(--header-inner-position)"
		>
			<div class="relative">
				<div
					class="absolute top-3 left-0 h-10 w-10 origin-left rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition-opacity dark:bg-zinc-800/90 dark:ring-white/10"
					style="opacity: var(--avatar-border-opacity, 0); transform: var(--avatar-border-transform)"
				></div>
				<a
					href="{base}/"
					aria-label="Home"
					class="pointer-events-auto block h-16 w-16 origin-left"
					style="transform: var(--avatar-image-transform)"
				>
					<img
						src="{base}/images/avatar.png"
						alt=""
						class="h-16 w-16 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
					/>
				</a>
			</div>
		</Container>
	{/if}

	<div bind:this={headerEl} class="top-0 z-10 h-16 pt-6" style="position: var(--header-position)">
		<Container
			class="top-(--header-top,--spacing(6)) w-full"
			style="position: var(--header-inner-position)"
		>
			<div class="relative flex gap-4">
				<div class="flex flex-1">
					{#if !isHomePage}
						<div
							class="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
						>
							<a href="{base}/" aria-label="Home" class="pointer-events-auto">
								<img
									src="{base}/images/avatar.png"
									alt=""
									class="h-9 w-9 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
								/>
							</a>
						</div>
					{/if}
				</div>

				<div class="flex flex-1 justify-end md:justify-center">
					<!-- Mobile navigation -->
					<div class="pointer-events-auto md:hidden">
						<button
							type="button"
							onclick={() => (menuOpen = true)}
							class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
						>
							Menu
							<svg
								viewBox="0 0 8 6"
								aria-hidden="true"
								class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
							>
								<path
									d="M1.75 1.75 4 4.25l2.25-2.5"
									fill="none"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					</div>

					<!-- Desktop navigation -->
					<nav class="pointer-events-auto hidden md:block">
						<ul
							class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
						>
							{#each links as link (link.href)}
								<li>
									<a
										href={link.href}
										class="relative block px-3 py-2 transition {isActive(link.href)
											? 'text-teal-500 dark:text-teal-400'
											: 'hover:text-teal-500 dark:hover:text-teal-400'}"
									>
										{link.label}
										{#if isActive(link.href)}
											<span
												class="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"
											></span>
										{/if}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</div>

				<div class="flex justify-end md:flex-1">
					<div class="pointer-events-auto">
						<button
							type="button"
							aria-label="Switch to {theme.current === 'dark' ? 'light' : 'dark'} theme"
							onclick={theme.toggle}
							class="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
						>
							<svg
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
								class="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden"
							>
								<path
									d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"
								/>
								<path
									d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
									fill="none"
								/>
							</svg>
							<svg
								viewBox="0 0 24 24"
								aria-hidden="true"
								class="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block dark:group-hover:stroke-zinc-400"
							>
								<path
									d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</Container>
	</div>
</header>

{#if isHomePage}
	<div class="flex-none" style="height: var(--content-offset)"></div>
{/if}

{#if menuOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs dark:bg-black/80"
		role="presentation"
		onclick={() => (menuOpen = false)}
	></div>
	<div
		class="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
		role="dialog"
		aria-modal="true"
		aria-label="Navigation"
		tabindex="-1"
	>
		<div class="flex flex-row-reverse items-center justify-between">
			<button
				type="button"
				aria-label="Close menu"
				class="-m-1 p-1"
				onclick={() => (menuOpen = false)}
			>
				<svg
					viewBox="0 0 24 24"
					aria-hidden="true"
					class="h-6 w-6 text-zinc-500 dark:text-zinc-400"
				>
					<path
						d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<h2 class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
		</div>
		<nav class="mt-6">
			<ul
				class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300"
			>
				{#each links as link (link.href)}
					<li>
						<a href={link.href} class="block py-2" onclick={() => (menuOpen = false)}>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
{/if}
