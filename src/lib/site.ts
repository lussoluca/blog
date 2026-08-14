import type { IconName } from '$lib/icons';

export const site = {
	title: 'Luca Lusso',
	role: 'Lead developer at SparkFabrik',
	headline: 'Drupal developer, module maintainer, and profiler of slow things.',
	intro:
		'I am Luca, a Drupal developer based in Italy and lead developer at SparkFabrik. I maintain WebProfiler and Monolog, and I spend most of my time in the layer underneath a site: the container, the event dispatcher, the cache, and the queries nobody meant to run.',
	description:
		'Notes on Drupal internals, PHP, profiling and AI, from the maintainer of WebProfiler and Monolog.',
	url: 'https://lussoluca.github.io/blog',
	copyrightYear: 2026
};

export interface ContactLink {
	label: string;
	handle: string;
	href: string;
	icon: IconName;
}

export const contacts: ContactLink[] = [
	{ label: 'GitHub', handle: '@lussoluca', href: 'https://github.com/lussoluca', icon: 'github' },
	{
		label: 'Drupal.org',
		handle: 'lussoluca',
		href: 'https://www.drupal.org/u/lussoluca',
		icon: 'drupal'
	},
	{
		label: 'LinkedIn',
		handle: 'in/lussoluca',
		href: 'https://www.linkedin.com/in/lussoluca/',
		icon: 'linkedin'
	},
	{
		label: 'Sessionize',
		handle: 'luca-lusso',
		href: 'https://sessionize.com/luca-lusso',
		icon: 'speaking'
	},
	{
		label: 'SparkFabrik',
		handle: 'sparkfabrik.com',
		href: 'https://www.sparkfabrik.com/en',
		icon: 'spark'
	}
];

export interface MaintainedProject {
	name: string;
	role: string;
	href: string;
}

export const projects: MaintainedProject[] = [
	{
		name: 'WebProfiler',
		role: 'Maintainer',
		href: 'https://www.drupal.org/project/webprofiler'
	},
	{ name: 'Monolog', role: 'Maintainer', href: 'https://www.drupal.org/project/monolog' },
	{
		name: 'Search API Typesense',
		role: 'Maintainer',
		href: 'https://www.drupal.org/project/search_api_typesense'
	},
	{ name: 'Devel', role: 'Co-maintainer', href: 'https://www.drupal.org/project/devel' }
];
