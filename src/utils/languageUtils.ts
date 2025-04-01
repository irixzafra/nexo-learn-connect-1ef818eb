
/**
 * Utilities for handling language in URLs and content
 */

// Supported languages in the application
export const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'pt', 'de'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Check if a string is a supported language code
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * Extract language code from a path
 * @param path The URL path
 * @returns The language code if present, undefined otherwise
 */
export function extractLanguageFromPath(path: string): SupportedLanguage | undefined {
  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Check if the first segment is a language code
  const firstSegment = normalizedPath.split('/')[0];
  
  if (isSupportedLanguage(firstSegment)) {
    return firstSegment;
  }
  
  return undefined;
}

/**
 * Ensure a path has a language prefix
 * @param path The URL path
 * @param language The language to ensure
 * @returns Path with language prefix
 */
export function ensureLanguagePrefix(path: string, language: SupportedLanguage): string {
  // If already has language prefix, replace it
  const existingLang = extractLanguageFromPath(path);
  
  if (existingLang) {
    return path.replace(`/${existingLang}`, `/${language}`);
  }
  
  // Remove leading slash if present for consistent handling
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Add language prefix
  return `/${language}/${normalizedPath}`;
}

/**
 * Remove language prefix from a path
 * @param path The URL path
 * @returns Path without language prefix
 */
export function removeLanguagePrefix(path: string): string {
  const lang = extractLanguageFromPath(path);
  
  if (lang) {
    // Remove leading slash if present
    const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
    
    // Remove language prefix
    return '/' + normalizedPath.substring(lang.length + 1);
  }
  
  return path;
}

/**
 * Format a date according to the specified language
 */
export function formatDate(date: Date, language: SupportedLanguage): string {
  return new Intl.DateTimeFormat(languageToLocale(language), {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Convert language code to locale for use with Intl
 */
export function languageToLocale(language: SupportedLanguage): string {
  const localeMap: Record<SupportedLanguage, string> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    pt: 'pt-BR',
    de: 'de-DE'
  };
  
  return localeMap[language] || 'en-US';
}
