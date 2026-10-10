import { PROGRAMS } from '../lib/affiliate-data';

/** Serialises JSON for a <script> tag without letting "</script>" or HTML comments break out. */
function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .split(String.fromCharCode(0x2028))
    .join('\\u2028')
    .split(String.fromCharCode(0x2029))
    .join('\\u2029');
}

/**
 * ItemList of SoftwareApplication entries for answer-engine crawlers.
 * Ratings are published as an editorial Review (author = this site), not an
 * aggregateRating, because there is no real review count behind them.
 */
export default function JsonLdSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'B2B SaaS Affiliate Program Comparison',
    description:
      'Comparison of B2B SaaS affiliate programs by commission, cookie window and average account value.',
    numberOfItems: PROGRAMS.length,
    itemListElement: PROGRAMS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: p.name,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: p.category,
        operatingSystem: 'Web',
        url: p.officialUrl,
        description: `${p.tag}. Key features: ${p.features.join(', ')}.`,
        featureList: p.features,
        review: {
          '@type': 'Review',
          author: { '@type': 'Organization', name: 'B2B Automation Lab Editorial Team' },
          reviewRating: { '@type': 'Rating', ratingValue: p.rating, bestRating: 5, worstRating: 1 },
          reviewBody: p.verdict,
        },
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />
  );
}
