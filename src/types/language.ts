
import { SupportedLanguage } from '@/contexts/LanguageContext';

/**
 * Language display names
 */
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch'
};

/**
 * Default language for the application
 */
export const DEFAULT_LANGUAGE: SupportedLanguage = 'es';
