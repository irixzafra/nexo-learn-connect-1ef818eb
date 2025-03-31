
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FeatureFlag, FeatureFlagsContextType } from './types';

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

export const FeatureFlagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [features, setFeatures] = useState<FeatureFlag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch feature flags from the database
  useEffect(() => {
    const fetchFeatureFlags = async () => {
      try {
        const { data, error } = await supabase
          .from('feature_flags')
          .select('*');

        if (error) {
          throw new Error(error.message);
        }

        setFeatures(data || []);
      } catch (err: any) {
        console.error('Error fetching feature flags:', err);
        setError(err instanceof Error ? err : new Error('Unknown error fetching feature flags'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatureFlags();
  }, []);

  // Check if a feature is enabled by name
  const isFeatureEnabled = (featureName: string): boolean => {
    const feature = features.find(f => f.feature_name === featureName);
    return feature ? feature.is_enabled : false;
  };

  // Get feature configuration by name
  const getFeatureConfig = <T,>(featureName: string): T | null => {
    const feature = features.find(f => f.feature_name === featureName);
    return (feature && feature.config) ? feature.config as T : null;
  };

  // Refresh features from the database
  const refreshFeatures = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('*');

      if (error) {
        throw new Error(error.message);
      }

      setFeatures(data || []);
    } catch (err: any) {
      console.error('Error refreshing feature flags:', err);
      setError(err instanceof Error ? err : new Error('Unknown error refreshing feature flags'));
    } finally {
      setIsLoading(false);
    }
  };

  const value: FeatureFlagsContextType = {
    features,
    isLoading,
    error,
    isFeatureEnabled,
    getFeatureConfig,
    refreshFeatures
  };

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = (): FeatureFlagsContextType => {
  const context = useContext(FeatureFlagsContext);
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
  }
  return context;
};
