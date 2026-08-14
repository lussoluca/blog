import { posts } from '$lib/posts';
import { site } from '$lib/site';

export const prerender = true;

function escape(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function GET() {
	const items = posts
		.map(
			(post) => `		<item>
			<title>${escape(post.title)}</title>
			<link>${site.url}/articles/${post.slug}/</link>
			<guid isPermaLink="true">${site.url}/articles/${post.slug}/</guid>
			<pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
			<description>${escape(post.excerpt)}</description>
		</item>`
		)
		.join('\n');

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escape(site.title)}</title>
		<link>${site.url}/</link>
		<description>${escape(site.description)}</description>
		<language>en</language>
		<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>
`;

	return new Response(feed, {
		headers: { 'content-type': 'application/rss+xml; charset=utf-8' }
	});
}
