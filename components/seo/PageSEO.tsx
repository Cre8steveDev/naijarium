import { Metadata } from 'next';

interface PageSEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  keywords?: string[];
}

export function generateMetadata({
  title,
  description = "Join the vibrant community that's bringing Nigerians together like never before...",
  canonicalUrl = 'https://naijarium.vercel.app',
  ogType = 'website',
  keywords = [
    'Nigerian forum',
    'social media',
    'community discussion',
    'Naijarium',
    'Cre8stevedev',
    'Hot Topics',
    'The New Nairaland',
    'Modern UI Nairaland',
  ],
  ogImage = 'https://res.cloudinary.com/dg0qc5gkl/image/upload/v1722329485/naijarium-og-image_q0nrzo.png',
  twitterCard = 'summary_large_image',
}: PageSEOProps): Metadata {
  // Create Site Title
  const siteTitle = 'Naijarium Social Forum';
  const fullTitle = `${title} | ${siteTitle}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    // @ts-ignore
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    // @ts-ignore
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
