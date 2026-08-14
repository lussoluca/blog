import { posts } from '$lib/posts';
import { site } from '$lib/site';

export const prerender = true;

export function GET() {
	const urls = [
		{ loc: `${site.url}/`, lastmod: posts[0]?.date },
		{ loc: `${site.url}/about/` },
		...posts.map((post) => ({ loc: `${site.url}/blog/${post.slug}/`, lastmod: post.date }))
	];

	const body = urls
		.map(
			({ loc, lastmod }) =>
				`	<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
		)
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`,
		{ headers: { 'content-type': 'application/xml; charset=utf-8' } }
	);
}
