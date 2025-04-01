
/**
 * Simple feature flags hook
 * In a real application, this would likely fetch from an API or configuration service
 */

import { useState, useEffect } from 'react';

type FeatureFlag = 
  | 'enableLangPrefixUrls' 
  | 'enableDarkMode' 
  | 'enableAnalytics' 
  | 'enableBetaFeatures'
  | 'enableAdvancedFilters'
  | 'enableDebugMode';

interface FeatureState {
  [key: string]: boolean;
}

// Default feature flags
const defaultFeatures: FeatureState = {
  enableLangPrefixUrls: true,
  enableDarkMode: true,
  enableAnalytics: true,
  enableBetaFeatures: false,
  enableAdvancedFilters: false,
  enableDebugMode: false
};

export function useFeature(featureName: FeatureFlag): boolean {
  const [features, setFeatures] = useState<FeatureState>(defaultFeatures);
  
  useEffect(() => {
    // In a real app, this might fetch from an API or local storage
    const loadFeatureFlags = async () => {
      try {
        // For demo purposes, we're just using the defaults
        // In a real app, you'd load from server/localStorage/etc.
        
        // Simulating localStorage check
        const storedFeatures = localStorage.getItem('feature-flags');
        if (storedFeatures) {
          setFeatures(prev => ({
            ...prev,
            ...JSON.parse(storedFeatures)
          }));
        }
      } catch (error) {
        console.error('Error loading feature flags:', error);
      }
    };
    
    loadFeatureFlags();
  }, []);
  
  return features[featureName] ?? false;
}

export function useFeatures() {
  const [features, setFeatures] = useState<FeatureState>(defaultFeatures);
  
  useEffect(() => {
    // Similar to above, but returns all features
    const loadFeatureFlags = async () => {
      try {
        const storedFeatures = localStorage.getItem('feature-flags');
        if (storedFeatures) {
          setFeatures(prev => ({
            ...prev,
            ...JSON.parse(storedFeatures)
          }));
        }
      } catch (error) {
        console.error('Error loading feature flags:', error);
      }
    };
    
    loadFeatureFlags();
  }, []);
  
  const toggleFeature = (featureName: FeatureFlag) => {
    setFeatures(prev => {
      const newFeatures = {
        ...prev,
        [featureName]: !prev[featureName]
      };
      
      // Persist to localStorage
      localStorage.setItem('feature-flags', JSON.stringify(newFeatures));
      
      return newFeatures;
    });
  };
  
  return {
    features,
    toggleFeature,
    isEnabled: (featureName: FeatureFlag) => features[featureName] ?? false
  };
}
