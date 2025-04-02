
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getTranslation } from '@/services/i18n/translationService';
import { useFeatures } from '@/hooks/useFeatures';

// Supported languages
export type SupportedLanguage = 'es' | 'en' | 'pt' | 'fr' | 'de';

// Default language
export const DEFAULT_LANGUAGE: SupportedLanguage = 'es';

// Fallback language if translation is missing
export const FALLBACK_LANGUAGE: SupportedLanguage = 'en';

// Language display names
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch'
};

// Language metadata for SEO
export type LanguageMetadata = {
  locale: string;
  hreflang: string;
  dir: 'ltr' | 'rtl';
  htmlLang: string;
};

export const LANGUAGE_METADATA: Record<SupportedLanguage, LanguageMetadata> = {
  es: { locale: 'es-ES', hreflang: 'es', dir: 'ltr', htmlLang: 'es' },
  en: { locale: 'en-US', hreflang: 'en', dir: 'ltr', htmlLang: 'en' },
  pt: { locale: 'pt-BR', hreflang: 'pt', dir: 'ltr', htmlLang: 'pt-BR' },
  fr: { locale: 'fr-FR', hreflang: 'fr', dir: 'ltr', htmlLang: 'fr' },
  de: { locale: 'de-DE', hreflang: 'de', dir: 'ltr', htmlLang: 'de' }
};

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, params?: Record<string, string>) => string;
  getMetadata: () => LanguageMetadata;
  getSeoAlternates: (path: string) => { lang: string, url: string }[];
  isRtl: boolean;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  supportedLanguages: SupportedLanguage[];
  isMultiLanguageEnabled: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { featuresConfig } = useFeatures();
  const isMultiLanguageEnabled = !!featuresConfig.enableMultiLanguage;
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const isRtl = LANGUAGE_METADATA[currentLanguage].dir === 'rtl';
  const supportedLanguages: SupportedLanguage[] = Object.keys(LANGUAGE_NAMES) as SupportedLanguage[];

  // Update html lang attribute
  React.useEffect(() => {
    document.documentElement.lang = LANGUAGE_METADATA[currentLanguage].htmlLang;
    document.documentElement.dir = LANGUAGE_METADATA[currentLanguage].dir;
  }, [currentLanguage]);

  // Function to change language
  const changeLanguage = (lang: SupportedLanguage) => {
    if (!isMultiLanguageEnabled || lang === currentLanguage) return;
    
    // Update language state
    setCurrentLanguage(lang);
    
    // Update html lang attribute
    document.documentElement.lang = LANGUAGE_METADATA[lang].htmlLang;
    document.documentElement.dir = LANGUAGE_METADATA[lang].dir;
  };

  // Translation function
  const t = (key: string, params?: Record<string, string>): string => {
    return getTranslation(key, currentLanguage, params);
  };

  // Get language metadata for the current language
  const getMetadata = (): LanguageMetadata => {
    return LANGUAGE_METADATA[currentLanguage];
  };

  // Generate hreflang alternates for SEO
  const getSeoAlternates = (path: string) => {
    if (!isMultiLanguageEnabled) {
      return []; // Return empty array when multi-language is disabled
    }
    
    const baseUrl = window.location.origin;
    
    return Object.keys(LANGUAGE_NAMES).map(lang => ({
      lang: LANGUAGE_METADATA[lang as SupportedLanguage].hreflang,
      url: `${baseUrl}/${path}`
    }));
  };

  // Format date according to the current locale
  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(
      LANGUAGE_METADATA[currentLanguage].locale, 
      options || { dateStyle: 'medium' }
    ).format(dateObj);
  };

  // Format number according to the current locale
  const formatNumber = (num: number, options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat(
      LANGUAGE_METADATA[currentLanguage].locale, 
      options
    ).format(num);
  };

  // Format currency according to the current locale
  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat(
      LANGUAGE_METADATA[currentLanguage].locale, 
      { style: 'currency', currency }
    ).format(amount);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getMetadata,
    getSeoAlternates,
    isRtl,
    formatDate,
    formatNumber,
    formatCurrency,
    supportedLanguages,
    isMultiLanguageEnabled
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
