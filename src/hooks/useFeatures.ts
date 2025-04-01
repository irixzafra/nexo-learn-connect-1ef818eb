
/**
 * Simple feature flags hook
 * In a real application, this would likely fetch from an API or configuration service
 */

import { useState, useEffect } from 'react';
import { FeatureId, ExtendedFeatureId } from '@/contexts/features/types';

export type FeatureFlag = 
  | 'enableLangPrefixUrls' 
  | 'enableDarkMode' 
  | 'enableAnalytics' 
  | 'enableBetaFeatures'
  | 'enableAdvancedFilters'
  | 'enableDebugMode'
  | 'enableHreflangTags'
  | 'enableRegionalContent'
  | 'enableContextualHelp';

export interface FeatureState {
  [key: string]: boolean;
}

// Default feature flags
const defaultFeatures: FeatureState = {
  enableLangPrefixUrls: true,
  enableDarkMode: true,
  enableAnalytics: true,
  enableBetaFeatures: false,
  enableAdvancedFilters: false,
  enableDebugMode: false,
  enableHreflangTags: true,
  enableRegionalContent: false,
  enableContextualHelp: true
};

export function useFeature(featureName: FeatureFlag): boolean {
  const { features } = useFeatures();
  return features[featureName] ?? false;
}

export function useFeatures() {
  const [features, setFeatures] = useState<FeatureState>(defaultFeatures);
  const [isLoading, setIsLoading] = useState(false);
  const [featuresConfig, setFeaturesConfig] = useState<any>({
    features: {},
    ...defaultFeatures
  });
  
  useEffect(() => {
    // Similar to above, but returns all features
    const loadFeatureFlags = async () => {
      try {
        setIsLoading(true);
        const storedFeatures = localStorage.getItem('feature-flags');
        if (storedFeatures) {
          const parsedFeatures = JSON.parse(storedFeatures);
          setFeatures(prev => ({
            ...prev,
            ...parsedFeatures
          }));
          
          // Also update featuresConfig for components that expect it
          setFeaturesConfig(prev => ({
            ...prev,
            ...parsedFeatures
          }));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading feature flags:', error);
        setIsLoading(false);
      }
    };
    
    loadFeatureFlags();
  }, []);
  
  const toggleFeature = (featureName: FeatureFlag | FeatureId | ExtendedFeatureId, value?: boolean): Promise<void> => {
    return new Promise<void>((resolve) => {
      setFeatures(prev => {
        const newValue = value !== undefined ? value : !prev[featureName];
        const newFeatures = {
          ...prev,
          [featureName]: newValue
        };
        
        // Update featuresConfig as well
        setFeaturesConfig(prev => ({
          ...prev,
          [featureName]: newValue
        }));
        
        // Persist to localStorage
        localStorage.setItem('feature-flags', JSON.stringify(newFeatures));
        
        return newFeatures;
      });
      resolve();
    });
  };
  
  const isEnabled = (featureName: FeatureFlag | FeatureId | ExtendedFeatureId): boolean => {
    return features[featureName] ?? false;
  };
  
  return {
    features,
    featuresConfig,
    toggleFeature,
    isEnabled,
    isLoading
  };
}

export default useFeatures;
