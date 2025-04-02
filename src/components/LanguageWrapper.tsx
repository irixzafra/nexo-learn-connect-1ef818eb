
import React from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import { useLocalization } from '@/hooks/useLocalization';

export const LanguageWrapper: React.FC = () => {
  const { language } = useParams<{ language: string }>();
  const { supportedLanguages, setLanguage } = useLocalization();
  
  // Check if the provided language is supported
  const isValidLanguage = supportedLanguages.includes(language || '');
  
  React.useEffect(() => {
    if (language && isValidLanguage) {
      setLanguage(language);
    }
  }, [language, isValidLanguage, setLanguage]);
  
  // If language is not valid, redirect to default
  if (!isValidLanguage) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};
