
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { FeatureFlag, FeatureFlagsContextType } from './types';

// Crear el contexto
const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

interface FeatureFlagsProviderProps {
  children: ReactNode;
}

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({ children }) => {
  const [features, setFeatures] = useState<FeatureFlag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFeatures = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('feature_flags')
        .select('*');
      
      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      
      setFeatures(data as FeatureFlag[]);
    } catch (err) {
      console.error('Error fetching feature flags:', err);
      setError(err instanceof Error ? err : new Error('Error desconocido al cargar feature flags'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // Verificar si una característica está habilitada
  const isFeatureEnabled = (featureName: string): boolean => {
    if (isLoading) return false;
    
    const feature = features.find(f => f.feature_name === featureName);
    return feature ? feature.is_enabled : false;
  };

  // Obtener la configuración de una característica
  const getFeatureConfig = <T,>(featureName: string): T | null => {
    if (isLoading) return null;
    
    const feature = features.find(f => f.feature_name === featureName);
    return feature && feature.config ? (feature.config as T) : null;
  };

  // Refrescar manualmente los feature flags
  const refreshFeatures = async (): Promise<void> => {
    await fetchFeatures();
  };

  // Valor del contexto
  const contextValue: FeatureFlagsContextType = {
    features,
    isLoading,
    error,
    isFeatureEnabled,
    getFeatureConfig,
    refreshFeatures
  };

  return (
    <FeatureFlagsContext.Provider value={contextValue}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useFeatureFlags = (): FeatureFlagsContextType => {
  const context = useContext(FeatureFlagsContext);
  
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
  }
  
  return context;
};
