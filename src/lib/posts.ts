/**
 * Post index built at compile time from the markdown routes.
 *
 * Every post lives at src/routes/blog/<slug>/+page.svx, so the folder name is
 * the slug and the frontmatter is the only metadata that has to be written by
 * hand. Word count and reading time are measured from the source.
 */

export interface PostFrontmatter {
	title: string;
	date: string;
	excerpt: string;
	tags?: string[];
}

export interface Post extends PostFrontmatter {
	slug: string;
	words: number;
	readingMinutes: number;
}

const metadata = import.meta.glob<PostFrontmatter>('/src/routes/blog/*/+page.svx', {
	eager: true,
	import: 'metadata'
});

const sources = import.meta.glob<string>('/src/routes/blog/*/+page.svx', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const WORDS_PER_MINUTE = 220;

function countWords(source: string): number {
	const body = source
		.replace(/^---[\s\S]*?---/, '')
		.replace(/```[\s\S]*?```/g, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[#*_`>[\]()]/g, ' ');

	return body.split(/\s+/).filter(Boolean).length;
}

function slugOf(path: string): string {
	return path.split('/').at(-2)!;
}

export const posts: Post[] = Object.entries(metadata)
	.map(([path, frontmatter]) => {
		const words = countWords(sources[path] ?? '');

		return {
			...frontmatter,
			slug: slugOf(path),
			words,
			readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE))
		};
	})
	.sort((a, b) => b.date.localeCompare(a.date));

export const totalWords = posts.reduce((total, post) => total + post.words, 0);

export function findPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
	return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	});
}
