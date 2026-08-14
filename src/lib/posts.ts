/**
 * Post index built at compile time from the markdown routes.
 *
 * Every post lives at src/routes/articles/<slug>/+page.svx, so the folder name
 * is the slug and the frontmatter is the only metadata written by hand.
 */

export interface PostFrontmatter {
	title: string;
	date: string;
	excerpt: string;
	tags?: string[];
}

export interface Post extends PostFrontmatter {
	slug: string;
}

const metadata = import.meta.glob<PostFrontmatter>('/src/routes/articles/*/+page.svx', {
	eager: true,
	import: 'metadata'
});

function slugOf(path: string): string {
	return path.split('/').at(-2)!;
}

export const posts: Post[] = Object.entries(metadata)
	.map(([path, frontmatter]) => ({ ...frontmatter, slug: slugOf(path) }))
	.sort((a, b) => b.date.localeCompare(a.date));

export function formatDate(date: string): string {
	return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}
