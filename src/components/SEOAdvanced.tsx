
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { useFeature } from '@/hooks/useFeature';

interface SEOAdvancedProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  children?: React.ReactNode;
  translatedTitle?: string;
  translatedDescription?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: Record<string, any>[];
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
}

const SEOAdvanced: React.FC<SEOAdvancedProps> = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  noindex = false,
  nofollow = false,
  canonical,
  children,
  translatedTitle,
  translatedDescription,
  author,
  publishedTime,
  modifiedTime,
  schema = [],
  twitterCard = 'summary_large_image',
  twitterSite,
  twitterCreator
}) => {
  const { currentLanguage, getMetadata, getSeoAlternates, t } = useLanguage();
  const location = useLocation();
  const metadata = getMetadata();
  
  const enableHreflangTags = useFeature('enableHreflangTags');
  const enableRegionalContent = useFeature('enableRegionalContent');
  const enableStructuredData = useFeature('enableStructuredData');
  
  const siteName = t('app.name', { default: 'Nexo Learning' });
  
  const finalTitle = translatedTitle || title;
  const finalDescription = translatedDescription || description;
  
  const fullTitle = finalTitle ? `${finalTitle} | ${siteName}` : siteName;
  
  const baseUrl = window.location.origin;
  
  const currentUrl = `${baseUrl}${location.pathname}`;
  
  const canonicalUrl = canonical || currentUrl;
  
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ');
  
  const alternates = getSeoAlternates(location.pathname);

  // Structured data
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: finalTitle,
    description: finalDescription,
    url: canonicalUrl,
  };

  // Add article schema if type is article
  const articleSchema = type === 'article' && publishedTime ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: finalTitle,
    description: finalDescription,
    image: image,
    author: {
      '@type': 'Person',
      name: author || 'Nexo Learning',
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  } : null;

  // Combine schemas
  const allSchemas = [
    defaultSchema,
    articleSchema,
    ...schema,
  ].filter(Boolean);

  return (
    <Helmet>
      <html lang={metadata.htmlLang} dir={metadata.dir} />
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      
      <link rel="canonical" href={canonicalUrl} />
      
      <meta name="robots" content={robotsContent} />
      
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={metadata.locale} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {image && <meta name="twitter:image" content={image} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      
      {/* Author */}
      {author && <meta name="author" content={author} />}
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {enableHreflangTags && alternates.map(alt => (
        <link 
          key={alt.lang} 
          rel="alternate" 
          hrefLang={alt.lang} 
          href={alt.url} 
        />
      ))}
      
      {enableHreflangTags && (
        <link 
          rel="alternate" 
          hrefLang="x-default" 
          href={`${baseUrl}/en/${location.pathname.split('/').slice(2).join('/')}`} 
        />
      )}
      
      {enableRegionalContent && (
        <meta name="geo.region" content={metadata.locale.split('-')[1]} />
      )}
      
      {/* Structured Data */}
      {enableStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(allSchemas)}
        </script>
      )}
      
      {children}
    </Helmet>
  );
};

export default SEOAdvanced;
