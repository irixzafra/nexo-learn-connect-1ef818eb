
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { isValidPath, normalizePath } from '@/utils/routeValidation';
import { useLanguage } from '@/contexts/LanguageContext';
import { ensureLanguagePrefix } from '@/utils/languageUtils';
import { useFeature } from '@/hooks/useFeatures';
import { toast } from 'sonner';

interface SafeLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  fallbackUrl?: string;
  trackBrokenLink?: boolean;
  preserveLanguage?: boolean;
  showWarning?: boolean;
  className?: string;
}

/**
 * A wrapper around Link that validates the path before rendering
 * If the path is invalid, it can either show a fallback or render nothing
 */
const SafeLink: React.FC<SafeLinkProps> = ({
  to,
  fallbackUrl = '/',
  trackBrokenLink = true,
  preserveLanguage = true,
  showWarning = false,
  className = '',
  children,
  ...props
}) => {
  const { currentLanguage } = useLanguage();
  const enableLangPrefixUrls = useFeature('enableLangPrefixUrls');
  
  // Normalize the path
  let normalizedPath = normalizePath(to);
  
  // If we should preserve language and language prefixes are enabled, ensure the path has the current language
  if (preserveLanguage && enableLangPrefixUrls && !to.startsWith('http')) {
    normalizedPath = ensureLanguagePrefix(normalizedPath, currentLanguage);
  }
  
  // Check if the path is valid
  const isValid = isValidPath(normalizedPath);
  
  // If not valid and we want to track broken links, log it
  if (!isValid && trackBrokenLink) {
    console.warn(`[SafeLink] Broken link detected: ${normalizedPath}`);
    // Show a warning toast if enabled
    if (showWarning) {
      toast.warning('Navigation issue', {
        description: `The link to "${normalizedPath}" might not work correctly.`
      });
    }
    // In a real implementation, we could send this to an analytics service
  }
  
  // If the path is not valid, use the fallback or return null
  let effectivePath = isValid ? normalizedPath : fallbackUrl;
  
  // Apply language prefix to fallback path if needed
  if (!isValid && preserveLanguage && enableLangPrefixUrls && !fallbackUrl.startsWith('http')) {
    effectivePath = ensureLanguagePrefix(fallbackUrl, currentLanguage);
  }
  
  // If the path is an external URL, use a regular anchor tag
  if (effectivePath.startsWith('http')) {
    return (
      <a 
        href={effectivePath} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link to={effectivePath} className={className} {...props}>
      {children}
    </Link>
  );
};

export default SafeLink;
