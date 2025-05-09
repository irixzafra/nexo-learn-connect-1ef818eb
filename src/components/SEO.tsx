import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { useFeature } from '@/hooks/useFeature';

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
  translatedTitle?: string;
  translatedDescription?: string;
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
  children,
  translatedTitle,
  translatedDescription
}) => {
  const { currentLanguage, getMetadata, getSeoAlternates, t } = useLanguage();
  const location = useLocation();
  const metadata = getMetadata();
  
  const enableHreflangTags = useFeature('enableHreflangTags');
  const enableRegionalContent = useFeature('enableRegionalContent');
  
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
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {image && <meta name="twitter:image" content={image} />}
      
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
      
      {children}
    </Helmet>
  );
};

export default SEO;
