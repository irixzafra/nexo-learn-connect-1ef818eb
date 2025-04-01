
/**
 * Supported languages in the application
 */
export type Language = 'es' | 'en' | 'pt' | 'fr';

/**
 * Language display names
 */
export const LANGUAGE_NAMES: Record<Language, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français'
};

/**
 * Default language for the application
 */
export const DEFAULT_LANGUAGE: Language = 'es';
