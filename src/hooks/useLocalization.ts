
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedUrl, getPathWithoutLanguage } from '@/utils/languageUtils';

/**
 * Hook for handling localization and translation of routes and content
 */
export const useLocalization = () => {
  const { currentLanguage, t } = useLanguage();

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

  return {
    currentLanguage,
    localizeUrl,
    removeLanguagePrefix,
    t,
  };
};

export default useLocalization;
