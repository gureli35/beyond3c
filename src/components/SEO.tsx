import React from 'react';
import Head from 'next/head';
import { SEOProps } from '@/types';

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = '/images/og-image.jpg',
  url,
  type = 'website',
}) => {
  const fullTitle = title === 'Beyond2C' ? title : `${title} | Beyond2C`;
  const fullUrl = url ? `https://beyond2c.org${url}` : 'https://beyond2c.org';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Beyond2C" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Language" content="tr" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/icons/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Custom Title with Logo */}
      <link rel="icon" type="image/png" href="/2Clogo.png" />
    </Head>
  );
};

export default SEO;
