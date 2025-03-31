
import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the feature flags types
export type FeatureFlag = 'community' | 'messages' | 'analytics' | 'finanzas' | 'datos';

// Context type
type FeatureFlagsContextType = {
  isFeatureEnabled: (feature: FeatureFlag) => boolean;
  toggleFeature: (feature: FeatureFlag) => void;
  features: Record<FeatureFlag, boolean>;
};

// Initial feature flags state
const defaultFeatures: Record<FeatureFlag, boolean> = {
  community: true,
  messages: true,
  analytics: false,
  finanzas: false,
  datos: false
};

// Create the context
const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

// Provider component
export const FeatureFlagsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [features, setFeatures] = useState<Record<FeatureFlag, boolean>>(defaultFeatures);

  const isFeatureEnabled = (feature: FeatureFlag): boolean => {
    return features[feature] || false;
  };

  const toggleFeature = (feature: FeatureFlag): void => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <FeatureFlagsContext.Provider 
      value={{ 
        isFeatureEnabled, 
        toggleFeature,
        features 
      }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
};

// Hook to use feature flags
export const useFeatureFlags = (): FeatureFlagsContextType => {
  const context = useContext(FeatureFlagsContext);
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
  }
  return context;
};
