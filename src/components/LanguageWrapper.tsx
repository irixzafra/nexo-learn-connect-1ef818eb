
import React from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';

export const LanguageWrapper: React.FC = () => {
  const { language } = useParams<{ language: string }>();
  const { currentLanguage, changeLanguage, supportedLanguages } = useLanguage();
  
  // Check if the provided language is supported
  const isValidLanguage = language && supportedLanguages.includes(language as SupportedLanguage);
  
  React.useEffect(() => {
    // Only change language if needed - prevents infinite renders
    if (language && isValidLanguage && language !== currentLanguage) {
      changeLanguage(language as SupportedLanguage);
    }
  }, [language, isValidLanguage, currentLanguage, changeLanguage]);
  
  // If language is not valid, redirect to default
  if (!isValidLanguage) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};
