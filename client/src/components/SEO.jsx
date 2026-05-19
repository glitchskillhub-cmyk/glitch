import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, type = 'website', path = '' }) => {
  const siteName = 'Glitch Skill Hub';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Glitch Skill Hub provides premium career programs and hands-on software engineering courses to get you job-ready.';
  const defaultKeywords = 'Full Stack Development, Node.js Bootcamp, React Training, Software Engineering, Career Programs, Tech Hub, MERN Stack, IT Training, Coding Bootcamp';
  const siteUrl = 'https://glitch-skill-hub.vercel.app';
  const fullUrl = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </Helmet>
  );
};

export default SEO;
