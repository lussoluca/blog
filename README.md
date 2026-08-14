# blog

Personal blog of Luca Lusso, built with SvelteKit and Tailwind CSS and deployed as a static site to GitHub Pages.

## Stack

| Piece     | Choice                                                                          |
| --------- | ------------------------------------------------------------------------------- |
| Framework | SvelteKit 2 with Svelte 5 runes, TypeScript                                     |
| Styling   | Tailwind CSS 4 via `@tailwindcss/vite`, `@tailwindcss/typography`               |
| Design    | Spotlight, a Tailwind Plus template, ported from Next.js and React to SvelteKit |
| Content   | Markdown routes preprocessed by mdsvex, highlighted by Prism                    |
| Output    | `@sveltejs/adapter-static`, every route prerendered                             |
| Hosting   | GitHub Pages, deployed by `.github/workflows/deploy.yml`                        |

Configuration lives in `vite.config.ts`; this project has no `svelte.config.js`.

The design, `typography.ts`, `src/prism.css`, and the components under `src/lib/components/` derive from the Spotlight template and are covered by the [Tailwind Plus license](https://tailwindcss.com/plus/license), which permits using it for a personal website whose source is public. It does not permit redistributing these files as a template or starter kit.

## Commands

```bash
npm install
npm run dev        # dev server
npm run build      # static site into build/
npm run preview    # serve build/
npm run check      # svelte-check
npm run format     # prettier
```

## Writing a post

Each post is a folder under `src/routes/articles/`, so the folder name is the URL slug and the markdown file is the route:

```
src/routes/articles/my-post-slug/+page.svx
```

The frontmatter is the only metadata written by hand. `src/lib/posts.ts` builds the index from it, and that index feeds the home page, the articles list, the RSS feed and the sitemap.

```markdown
---
title: My post title
date: '2026-08-14'
excerpt: One or two sentences, shown in the post lists and the RSS feed.
tags: ['drupal', 'php']
---

Body text starts here.
```

Backslashes inside fenced code blocks have to be doubled (`Drupal\\ai\\Event`), because mdsvex consumes single ones.

Screenshots go in `static/images/posts/<slug>/` and are rendered with the `Figure` component, which frames them, adds a caption and makes them zoomable. Import it in the post before using it:

```svelte
<script>
	import Figure from '$lib/components/Figure.svelte';
</script>

<Figure
	src="/images/posts/my-post-slug/screenshot.png"
	alt="What the screenshot shows, for screen readers"
	caption="What the reader should notice in it."
	wide
/>
```

`src` is resolved against the site base path, so write it as an absolute path from the site root and let the component prefix it.

## Deployment

Pushing to `main` runs the Pages workflow, which builds with `BASE_PATH=/<repo>` and uploads `build/` as the Pages artifact. In the repository settings under **Pages**, **Source** must be set to **GitHub Actions**.

Moving to a custom domain means dropping the `BASE_PATH` environment variable from the workflow, updating `site.url` in `src/lib/site.ts`, and adding a `static/CNAME` file.
