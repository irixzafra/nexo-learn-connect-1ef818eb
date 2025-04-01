import { SupportedLanguage, DEFAULT_LANGUAGE } from '@/contexts/LanguageContext';

/**
 * Constructs a URL with language prefix based on the path and language
 * @param path The path without language prefix
 * @param lang The language code to use
 * @returns The URL with language prefix
 */
export const getLocalizedUrl = (
  path: string,
  lang: SupportedLanguage = DEFAULT_LANGUAGE
): string => {
  // Remove leading slashes from path for consistent formatting
  const sanitizedPath = path.replace(/^\/+/, '');
  
  // If the path already starts with a language code, replace it
  const pathParts = sanitizedPath.split('/');
  const supportedLanguages: SupportedLanguage[] = ['es', 'en', 'pt', 'fr', 'de'];
  
  if (supportedLanguages.includes(pathParts[0] as SupportedLanguage)) {
    pathParts[0] = lang;
    return `/${pathParts.join('/')}`;
  }
  
  // Otherwise, prepend the language code
  return `/${lang}/${sanitizedPath}`;
};

/**
 * Extracts the path without language prefix from a URL
 * @param url The URL with possible language prefix
 * @returns The path without language prefix
 */
export const getPathWithoutLanguage = (url: string): string => {
  const supportedLanguages: SupportedLanguage[] = ['es', 'en', 'pt', 'fr', 'de'];
  const pathParts = url.split('/').filter(Boolean);
  
  if (pathParts.length > 0 && supportedLanguages.includes(pathParts[0] as SupportedLanguage)) {
    return `/${pathParts.slice(1).join('/')}`;
  }
  
  return url;
};

/**
 * Extracts the language code from a URL
 * @param url The URL with possible language prefix
 * @returns The language code if found, undefined otherwise
 */
export const getLanguageFromUrl = (url: string): SupportedLanguage | undefined => {
  const supportedLanguages: SupportedLanguage[] = ['es', 'en', 'pt', 'fr', 'de'];
  const pathParts = url.split('/').filter(Boolean);
  
  if (pathParts.length > 0 && supportedLanguages.includes(pathParts[0] as SupportedLanguage)) {
    return pathParts[0] as SupportedLanguage;
  }
  
  return undefined;
};

/**
 * Checks if a URL contains a language prefix
 * @param url The URL to check
 * @returns True if the URL contains a language prefix
 */
export const hasLanguagePrefix = (url: string): boolean => {
  return getLanguageFromUrl(url) !== undefined;
};

/**
 * Ensures a URL has a language prefix, adding the default if missing
 * @param url The URL to process
 * @returns The URL with language prefix
 */
export const ensureLanguagePrefix = (url: string): string => {
  if (hasLanguagePrefix(url)) {
    return url;
  }
  
  return getLocalizedUrl(url, DEFAULT_LANGUAGE);
};
