
/**
 * Simplified hook for handling localization without depending on LanguageProvider
 */
export const useLocalization = () => {
  // Default language
  const currentLanguage = 'es'; 

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
   * Translation function placeholder
   * @param key The translation key
   * @returns The key itself as fallback
   */
  const t = (key: string): string => {
    return key;
  };

  /**
   * Placeholder for setting language
   */
  const setLanguage = (language: string) => {
    console.log('Language setting disabled:', language);
  };

  return {
    currentLanguage,
    localizeUrl,
    removeLanguagePrefix,
    t,
    supportedLanguages: ['es', 'en'],
    setLanguage,
    isMultiLanguageEnabled: false
  };
};

export default useLocalization;
