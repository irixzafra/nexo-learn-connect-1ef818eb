
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';
import { getLocalizedUrl } from '@/utils/languageUtils';

interface SafeLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

const SafeLink: React.FC<SafeLinkProps> = ({ to, children, ...props }) => {
  const { currentLanguage } = useLanguage();
  const localizedTo = getLocalizedUrl(to, currentLanguage);
  
  return (
    <Link to={localizedTo} {...props}>
      {children}
    </Link>
  );
};

export default SafeLink;
