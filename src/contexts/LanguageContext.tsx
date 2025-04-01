import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const location = useLocation();
  const navigate = useNavigate();

  // Update language based on URL path
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    if (pathParts.length > 0) {
      const firstPart = pathParts[0].toLowerCase();
      
      // Check if the first part of the path is a supported language
      if (Object.keys(LANGUAGE_NAMES).includes(firstPart)) {
        setCurrentLanguage(firstPart as SupportedLanguage);
      } else if (!location.pathname.includes('/admin/')) {
        // If no language in URL and not an admin page, redirect to default language
        const newPath = `/${DEFAULT_LANGUAGE}${location.pathname}`;
        navigate(newPath, { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  // Function to change language
  const changeLanguage = (lang: SupportedLanguage) => {
    if (lang === currentLanguage) return;
    
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    if (Object.keys(LANGUAGE_NAMES).includes(pathParts[0])) {
      // If there's already a language in the path, replace it
      pathParts[0] = lang;
    } else {
      // Otherwise, add the new language to the beginning
      pathParts.unshift(lang);
    }
    
    // Construct new path with the selected language
    const newPath = `/${pathParts.join('/')}${location.search}`;
    navigate(newPath);
    setCurrentLanguage(lang);
    
    // Update html lang attribute
    document.documentElement.lang = LANGUAGE_METADATA[lang].htmlLang;
    document.documentElement.dir = LANGUAGE_METADATA[lang].dir;
  };

  // Simple translation function
  // In a real implementation, this would use a proper i18n library
  const t = (key: string, params?: Record<string, string>): string => {
    // For now, just return the key
    // In a real implementation, this would look up translations
    return key;
  };

  // Get language metadata for the current language
  const getMetadata = (): LanguageMetadata => {
    return LANGUAGE_METADATA[currentLanguage];
  };

  // Generate hreflang alternates for SEO
  const getSeoAlternates = (path: string) => {
    const pathWithoutLang = path.split('/').slice(2).join('/');
    const baseUrl = window.location.origin;
    
    return Object.keys(LANGUAGE_NAMES).map(lang => ({
      lang: LANGUAGE_METADATA[lang as SupportedLanguage].hreflang,
      url: `${baseUrl}/${lang}/${pathWithoutLang}`
    }));
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getMetadata,
    getSeoAlternates
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
