
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  noindex = false,
  nofollow = false,
  canonical,
  children
}) => {
  const { currentLanguage, getMetadata, getSeoAlternates } = useLanguage();
  const location = useLocation();
  const metadata = getMetadata();
  
  // Default site name
  const siteName = 'Nexo Learning';
  
  // Full title with site name
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  
  // Base URL
  const baseUrl = window.location.origin;
  
  // Current URL
  const currentUrl = `${baseUrl}${location.pathname}`;
  
  // Canonical URL (if not specified, use current URL)
  const canonicalUrl = canonical || currentUrl;
  
  // Robots meta tag
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ');
  
  // Generate alternate links for other languages
  const alternates = getSeoAlternates(location.pathname);

  return (
    <Helmet>
      {/* Basic Metadata */}
      <html lang={metadata.htmlLang} dir={metadata.dir} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      
      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={metadata.locale} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Alternate language versions */}
      {alternates.map(alt => (
        <link 
          key={alt.lang} 
          rel="alternate" 
          hrefLang={alt.lang} 
          href={alt.url} 
        />
      ))}
      
      {/* x-default for language negotiation */}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${baseUrl}/en/${location.pathname.split('/').slice(2).join('/')}`} 
      />
      
      {children}
    </Helmet>
  );
};

export default SEO;
