
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Hook for handling localization and translation of content
 */
export const useLocalization = () => {
  const { 
    currentLanguage, 
    t, 
    supportedLanguages,
    changeLanguage
  } = useLanguage();

  /**
   * Returns the URL as-is (no language prefix)
   * @param path The URL path
   * @returns The original URL
   */
  const localizeUrl = (path: string): string => {
    return path.startsWith('/') ? path : `/${path}`;
  };

  /**
   * Returns the path as-is (no language modifications)
   * @param path The URL path
   * @returns The original path
   */
  const removeLanguagePrefix = (path: string): string => {
    return path;
  };

  /**
   * Sets the language
   * @param language The language to set
   */
  const setLanguage = (language: string) => {
    changeLanguage(language as any);
  };

  return {
    currentLanguage,
    localizeUrl,
    removeLanguagePrefix,
    t,
    supportedLanguages,
    setLanguage,
    isMultiLanguageEnabled: false
  };
};

export default useLocalization;
