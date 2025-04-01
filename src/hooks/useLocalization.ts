
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedUrl, getPathWithoutLanguage } from '@/utils/languageUtils';

/**
 * Hook for simplified access to localization utilities
 */
export const useLocalization = () => {
  const language = useLanguage();
  
  return {
    // Access to all language context properties
    ...language,
    
    // Is the current language RTL
    isRtl: language.getMetadata().dir === 'rtl',
    
    // Helper to get text direction-aware margins
    getDirectionalSpacing: (start: string, end: string) => {
      return language.isRtl 
        ? { marginRight: start, marginLeft: end }
        : { marginLeft: start, marginRight: end };
    },
    
    // Generate a URL with language prefix
    localizeUrl: (path: string, lang = language.currentLanguage) => {
      return getLocalizedUrl(path, lang);
    },
    
    // Remove language prefix from a URL
    stripLanguage: (url: string) => {
      return getPathWithoutLanguage(url);
    }
  };
};

export default useLocalization;
