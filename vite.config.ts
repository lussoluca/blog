import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import path from 'node:path';
import rehypeSlug from 'rehype-slug';
import { defineConfig } from 'vite';

/**
 * GitHub Pages serves the site from https://<user>.github.io/<repo>, so the
 * deploy workflow passes the repository name as BASE_PATH. Local builds and
 * a custom domain both run with an empty base.
 */
const base = (process.env.BASE_PATH ?? '') as '' | `/${string}`;

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// Markdown files are routes: src/routes/blog/<slug>/+page.svx.
			extensions: ['.svelte', '.svx'],
			preprocess: [
				mdsvex({
					extensions: ['.svx'],
					// mdsvex reads the layout from disk, so it needs a real path, not an alias.
					layout: { _: path.resolve('src/lib/components/PostLayout.svelte') },
					rehypePlugins: [rehypeSlug],
					highlight: { alias: { twig: 'html' } }
				})
			],
			compilerOptions: {
				// Force runes mode for the project, except for libraries and for the markdown
				// posts, whose mdsvex output still uses $$props. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') || filename.endsWith('.svx')
						? undefined
						: true
			},
			adapter: adapter({ fallback: '404.html' }),
			paths: { base },
			prerender: { handleHttpError: 'fail' }
		})
	]
});
