
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our feature flags
type FeatureFlag = 'community' | 'messages' | 'analytics' | 'finanzas' | 'datos';

interface FeatureFlagsContextType {
  isFeatureEnabled: (featureName: string) => boolean;
}

// Create context with default values
const FeatureFlagsContext = createContext<FeatureFlagsContextType>({
  isFeatureEnabled: () => false,
});

// Default feature flags - this would typically come from a database
// In a real implementation, this would be loaded from the backend
const defaultFeatures: Record<FeatureFlag, boolean> = {
  community: true,
  messages: true,
  analytics: true,
  finanzas: true,
  datos: true,
};

interface FeatureFlagsProviderProps {
  children: ReactNode;
}

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({ children }) => {
  const [features, setFeatures] = useState(defaultFeatures);

  // In a real implementation, this would fetch the feature flags from the backend
  useEffect(() => {
    // This would be replaced with an API call to fetch feature flags
    // For now, we'll just use the default values
    const fetchFeatureFlags = async () => {
      try {
        // Simulate API call
        // const response = await fetch('/api/feature-flags');
        // const data = await response.json();
        // setFeatures(data);
        
        // For now, just use the default values
        setFeatures(defaultFeatures);
      } catch (error) {
        console.error('Error fetching feature flags:', error);
      }
    };

    fetchFeatureFlags();
  }, []);

  const isFeatureEnabled = (featureName: string): boolean => {
    return features[featureName as FeatureFlag] || false;
  };

  return (
    <FeatureFlagsContext.Provider value={{ isFeatureEnabled }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

// Hook to use feature flags
export const useFeatureFlags = (): FeatureFlagsContextType => {
  return useContext(FeatureFlagsContext);
};
