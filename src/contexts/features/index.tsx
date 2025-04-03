
import { createContext, useContext, useState, ReactNode } from 'react';

// Defines which features are enabled in the application
interface FeaturesContextType {
  features: Record<string, boolean>;
  isEnabled: (featureName: string) => boolean;
  enableFeature: (featureName: string) => void;
  disableFeature: (featureName: string) => void;
  toggleFeature: (featureName: string) => void;
}

const FeaturesContext = createContext<FeaturesContextType | undefined>(undefined);

export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  return context;
};

export const FeaturesProvider = ({ children }: { children: ReactNode }) => {
  const [features, setFeatures] = useState<Record<string, boolean>>({
    darkMode: true,
    materialDesign: true,
    betaFeatures: false,
  });

  const isEnabled = (featureName: string) => {
    return !!features[featureName];
  };

  const enableFeature = (featureName: string) => {
    setFeatures((prev) => ({ ...prev, [featureName]: true }));
  };

  const disableFeature = (featureName: string) => {
    setFeatures((prev) => ({ ...prev, [featureName]: false }));
  };

  const toggleFeature = (featureName: string) => {
    setFeatures((prev) => ({ ...prev, [featureName]: !prev[featureName] }));
  };

  const contextValue = { 
    features, 
    isEnabled, 
    enableFeature, 
    disableFeature, 
    toggleFeature 
  };

  return (
    <FeaturesContext.Provider value={contextValue}>
      {children}
    </FeaturesContext.Provider>
  );
};
