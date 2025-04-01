
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FeaturesConfig, FeaturesContextProps } from './types';
import { getFeatureDependencies } from './dependencies';

// Valores predeterminados
const defaultFeatures: FeaturesConfig = {
  // General features
  enableDarkMode: true,
  enableNotifications: true,
  enableAnalytics: false,
  enableFeedback: true,
  
  // User features
  enableUserRegistration: true,
  enableSocialLogin: false,
  enablePublicProfiles: true,

  // Design system features
  designSystemEnabled: true,
  enableThemeSwitcher: true,
  enableMultiLanguage: false,

  // Content features
  enableAdvancedEditor: false,
  enableContentReordering: true,
  enableCategoryManagement: true,
  enableLeaderboard: false,

  // Data features
  enableAutoBackups: true,
  enableQueryCache: true,
  enableMaintenanceMode: false,
  enableDatabaseDevMode: false,

  // Security features
  enable2FA: false,
  enableMultipleSessions: true,
  enablePublicRegistration: true,
  requireEmailVerification: true,
  enableActivityLog: true,

  // Test features
  enableTestDataGenerator: true,
  
  // Onboarding features
  enableOnboarding: true,
  enableContextualHelp: true,
  requireOnboarding: false
};

// Crear contexto
const FeaturesContext = createContext<FeaturesContextProps | undefined>(undefined);

export const FeaturesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [features, setFeatures] = useState<FeaturesConfig>(defaultFeatures);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Cargar características almacenadas al iniciar
  useEffect(() => {
    const loadFeatures = async () => {
      try {
        setIsLoading(true);
        const storedFeatures = localStorage.getItem('nexo_features');
        
        if (storedFeatures) {
          setFeatures({
            ...defaultFeatures,
            ...JSON.parse(storedFeatures)
          });
        }
      } catch (err) {
        console.error('Error al cargar características:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido al cargar características'));
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatures();
  }, []);

  // Actualizar características
  const updateFeatures = async (newFeatures: FeaturesConfig) => {
    try {
      setIsLoading(true);
      
      // Guardar en localStorage
      localStorage.setItem('nexo_features', JSON.stringify(newFeatures));
      
      // Actualizar estado
      setFeatures(newFeatures);
      
      return Promise.resolve();
    } catch (err) {
      console.error('Error al actualizar características:', err);
      setError(err instanceof Error ? err : new Error('Error desconocido al actualizar características'));
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Recargar características
  const reloadFeatures = async () => {
    try {
      setIsLoading(true);
      const storedFeatures = localStorage.getItem('nexo_features');
      
      if (storedFeatures) {
        setFeatures({
          ...defaultFeatures,
          ...JSON.parse(storedFeatures)
        });
      } else {
        setFeatures(defaultFeatures);
      }
      
      return Promise.resolve();
    } catch (err) {
      console.error('Error al recargar características:', err);
      setError(err instanceof Error ? err : new Error('Error desconocido al recargar características'));
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FeaturesContext.Provider value={{ 
      features, 
      isLoading, 
      error,
      updateFeatures,
      reloadFeatures
    }}>
      {children}
    </FeaturesContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useFeatures = (): FeaturesContextProps => {
  const context = useContext(FeaturesContext);
  
  if (context === undefined) {
    throw new Error('useFeatures debe ser usado dentro de un FeaturesProvider');
  }
  
  return context;
};
