
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';
import { getPathWithoutLanguage } from '@/utils/languageUtils';

/**
 * Hook for handling localization and translation of routes and content
 */
export const useLocalization = () => {
  const { 
    currentLanguage, 
    t, 
    supportedLanguages, 
    changeLanguage,
    isMultiLanguageEnabled 
  } = useLanguage();

  /**
   * Localizes a URL with the current language if multi-language is enabled
   * Otherwise returns the original URL
   * @param path The URL path to localize
   * @returns The localized URL
   */
  const localizeUrl = (path: string): string => {
    // If multi-language is disabled, just return the path
    if (!isMultiLanguageEnabled) {
      return path.startsWith('/') ? path : `/${path}`;
    }
    
    // If multi-language is enabled, use the language prefix
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `/${currentLanguage}/${cleanPath}`;
  };

  /**
   * Removes the language prefix from a path
   * @param path The URL path
   * @returns The path without language prefix
   */
  const removeLanguagePrefix = (path: string): string => {
    return getPathWithoutLanguage(path);
  };

  /**
   * Sets the language
   * @param language The language to set
   */
  const setLanguage = (language: string) => {
    if (!isMultiLanguageEnabled) return;
    
    // Cast to SupportedLanguage only if it's actually supported
    if (supportedLanguages.includes(language as SupportedLanguage)) {
      changeLanguage(language as SupportedLanguage);
    }
  };

  return {
    currentLanguage,
    localizeUrl,
    removeLanguagePrefix,
    t,
    supportedLanguages,
    setLanguage,
    isMultiLanguageEnabled
  };
};

export default useLocalization;
