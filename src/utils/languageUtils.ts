import { Language } from '@/types/language';

/**
 * Ensures a URL path has the correct language prefix
 * @param path The URL path to check
 * @param language The current language
 * @returns The path with language prefix
 */
export const ensureLanguagePrefix = (path: string, language: Language): string => {
  // Remove leading slash if present for consistent processing
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // If path already starts with a language code, replace it
  if (/^(es|en|pt|fr)\b/.test(cleanPath)) {
    return `/${language}/${cleanPath.substring(3)}`;
  }
  
  // Otherwise add the language prefix
  return `/${language}/${cleanPath}`;
};

/**
 * Removes the language prefix from a path
 * @param path The URL path
 * @returns The path without language prefix
 */
export const getPathWithoutLanguage = (path: string): string => {
  // Remove leading slash if present for consistent processing
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // If path starts with a language code, remove it
  if (/^(es|en|pt|fr)\//.test(cleanPath)) {
    return `/${cleanPath.substring(3)}`;
  }
  
  // Path doesn't have a language prefix
  return `/${cleanPath}`;
};

/**
 * Localizes a URL with the current language
 * @param path The URL path to localize
 * @param language The current language
 * @returns The localized URL
 */
export const getLocalizedUrl = (path: string, language: Language): string => {
  const pathWithoutLanguage = getPathWithoutLanguage(path);
  return ensureLanguagePrefix(pathWithoutLanguage, language);
};

/**
 * Extracts the language from a URL path
 * @param path The URL path to check
 * @returns The language found in the URL or null if none
 */
export const getLanguageFromUrl = (path: string): Language | null => {
  const match = path.match(/^\/(es|en|pt|fr)\//);
  if (match) {
    return match[1] as Language;
  }
  return null;
};

/**
 * Checks if a path has a valid language prefix
 * @param path The URL path to check
 * @returns Whether the path has a valid language prefix
 */
export const hasLanguagePrefix = (path: string): boolean => {
  return /^\/(es|en|pt|fr)\//.test(path);
};
