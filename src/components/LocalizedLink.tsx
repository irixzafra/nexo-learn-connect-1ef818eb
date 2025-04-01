
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedUrl } from '@/utils/languageUtils';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  language?: string;
}

/**
 * A wrapper around Link that automatically adds the current language prefix to the URL
 */
const LocalizedLink: React.FC<LocalizedLinkProps> = ({
  to,
  language,
  children,
  ...props
}) => {
  const { currentLanguage } = useLanguage();
  
  // Use specified language or current language
  const lang = (language || currentLanguage) as any;
  
  // Generate localized URL
  const localizedUrl = getLocalizedUrl(to, lang);
  
  return (
    <Link to={localizedUrl} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
