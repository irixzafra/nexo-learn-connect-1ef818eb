
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FeaturesConfig {
  enableThemeSwitcher: boolean;
  enableDesignSystem: boolean;
  enableMultiLanguage: boolean;
  enableAutoTheme: boolean;
  enableCourseRecommendations: boolean;
  enableLearningPaths: boolean;
  enableCommunity: boolean;
  enableStudentProfiles: boolean;
  enableAIAssistant: boolean;
  enableGamification: boolean;
  enableEmailNotifications: boolean;
  enablePushNotifications: boolean;
  enable2FA: boolean;
  enableSocialLogin: boolean;
  enablePasswordless: boolean;
}

const defaultFeaturesConfig: FeaturesConfig = {
  enableThemeSwitcher: true,
  enableDesignSystem: true,
  enableMultiLanguage: false,
  enableAutoTheme: false,
  enableCourseRecommendations: true,
  enableLearningPaths: true,
  enableCommunity: true,
  enableStudentProfiles: true,
  enableAIAssistant: false,
  enableGamification: true,
  enableEmailNotifications: true,
  enablePushNotifications: false,
  enable2FA: false,
  enableSocialLogin: true,
  enablePasswordless: false,
};

interface FeaturesContextType {
  featuresConfig: FeaturesConfig;
  toggleFeature: (feature: keyof FeaturesConfig, value: boolean) => Promise<void>;
  isLoading: boolean;
}

const FeaturesContext = createContext<FeaturesContextType | undefined>(undefined);

export const FeaturesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>(defaultFeaturesConfig);
  const [isLoading, setIsLoading] = useState(false);

  // Mock loading features from API on mount
  useEffect(() => {
    const loadFeatures = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would be an API call
        // For now, we'll just simulate a delay and use default values
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Try to load from localStorage if available
        const savedFeatures = localStorage.getItem('features');
        if (savedFeatures) {
          setFeaturesConfig(JSON.parse(savedFeatures));
        }
      } catch (error) {
        console.error('Error loading features:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatures();
  }, []);

  const toggleFeature = async (feature: keyof FeaturesConfig, value: boolean) => {
    try {
      setIsLoading(true);
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update the feature
      const updatedFeatures = {
        ...featuresConfig,
        [feature]: value
      };
      
      // Save to localStorage for persistence
      localStorage.setItem('features', JSON.stringify(updatedFeatures));
      
      // Update state
      setFeaturesConfig(updatedFeatures);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error toggling feature:', error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FeaturesContext.Provider value={{ featuresConfig, toggleFeature, isLoading }}>
      {children}
    </FeaturesContext.Provider>
  );
};

export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  if (context === undefined) {
    throw new Error('useFeatures debe ser usado dentro de un FeaturesProvider');
  }
  return context;
};
