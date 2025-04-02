
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';
import { getLocalizedUrl, getPathWithoutLanguage } from '@/utils/languageUtils';

/**
 * Hook for handling localization and translation of routes and content
 */
export const useLocalization = () => {
  const { 
    currentLanguage, 
    t, 
    supportedLanguages, 
    changeLanguage 
  } = useLanguage();

  /**
   * Localizes a URL with the current language
   * @param path The URL path to localize
   * @returns The localized URL
   */
  const localizeUrl = (path: string): string => {
    return getLocalizedUrl(path, currentLanguage);
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
    setLanguage
  };
};

export default useLocalization;
