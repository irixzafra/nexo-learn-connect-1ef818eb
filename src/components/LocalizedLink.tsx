
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedUrl } from '@/utils/languageUtils';
import { useAccessibility } from '@/hooks/useAccessibility';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  language?: string;
  /** ID for the link, useful for accessibility */
  id?: string;
  /** Additional accessibility props */
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaHidden?: boolean;
}

/**
 * A wrapper around Link that automatically adds the current language prefix to the URL
 * with enhanced accessibility support
 */
const LocalizedLink: React.FC<LocalizedLinkProps> = ({
  to,
  language,
  children,
  id,
  ariaLabel,
  ariaDescribedBy,
  ariaHidden,
  ...props
}) => {
  const { currentLanguage } = useLanguage();
  const { isScreenReaderOptimized } = useAccessibility();
  
  // Use specified language or current language
  const lang = (language || currentLanguage) as any;
  
  // Generate localized URL
  const localizedUrl = getLocalizedUrl(to, lang);

  // Enhanced accessibility props if screen reader optimization is enabled
  const accessibilityProps = isScreenReaderOptimized
    ? {
        role: 'link',
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'aria-hidden': ariaHidden,
        id
      }
    : { 
        id,
        'aria-hidden': ariaHidden
      };
  
  return (
    <Link 
      to={localizedUrl} 
      {...accessibilityProps}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LocalizedLink;
