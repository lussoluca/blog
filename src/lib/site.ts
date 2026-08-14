export const site = {
	title: 'Luca Lusso',
	role: 'Lead developer at SparkFabrik',
	thesis:
		'Fifteen years inside Drupal, mostly in the parts you only see when something is slow, broken, or newly possible.',
	description:
		'Notes on Drupal internals, PHP, profiling and AI, from the maintainer of WebProfiler and Monolog.',
	url: 'https://lussoluca.github.io/blog',
	locale: 'Italy'
};

export interface ContactLink {
	label: string;
	handle: string;
	href: string;
}

export const contacts: ContactLink[] = [
	{ label: 'GitHub', handle: '@lussoluca', href: 'https://github.com/lussoluca' },
	{ label: 'Drupal.org', handle: 'lussoluca', href: 'https://www.drupal.org/u/lussoluca' },
	{ label: 'LinkedIn', handle: 'in/lussoluca', href: 'https://www.linkedin.com/in/lussoluca/' },
	{ label: 'X', handle: '@lussoluca', href: 'https://twitter.com/lussoluca' },
	{ label: 'Sessionize', handle: 'luca-lusso', href: 'https://sessionize.com/luca-lusso' },
	{ label: 'SparkFabrik', handle: 'sparkfabrik.com', href: 'https://www.sparkfabrik.com/' }
];

export interface SpecRow {
	name: string;
	value: string;
	href?: string;
}

export const spec: SpecRow[] = [
	{ name: 'Role', value: 'Lead developer' },
	{ name: 'Company', value: 'SparkFabrik', href: 'https://www.sparkfabrik.com/' },
	{ name: 'Based in', value: 'Italy' },
	{ name: 'On drupal.org since', value: '2007' },
	{
		name: 'Maintains',
		value: 'WebProfiler',
		href: 'https://www.drupal.org/project/webprofiler'
	},
	{ name: 'Maintains', value: 'Monolog', href: 'https://www.drupal.org/project/monolog' },
	{
		name: 'Maintains',
		value: 'Search API Typesense',
		href: 'https://www.drupal.org/project/search_api_typesense'
	},
	{ name: 'Co-maintains', value: 'Devel', href: 'https://www.drupal.org/project/devel' },
	{ name: 'Also does', value: 'Drupal training, conference talks' }
];
