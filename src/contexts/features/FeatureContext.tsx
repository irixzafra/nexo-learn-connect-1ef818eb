
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';
import { FeaturesConfig } from './types';

// Define the shape of our context
interface FeatureContextType {
  featuresConfig: FeaturesConfig;
  toggleFeature: (featureName: keyof FeaturesConfig, value: boolean) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// Create context with default values
export const FeatureContext = createContext<FeatureContextType>({
  featuresConfig: {
    enableDarkMode: true,
    enableNotifications: false,
    enableAnalytics: true,
    enableFeedback: true,
    enableBetaFeatures: false,
    enableOfflineMode: false,
    enableDebugMode: false,
    enableTestDataGenerator: false,
    enableAdvancedFilters: true,
    enableCategoryManagement: true,
    enableAIFeatures: false,
    enableMultiLanguage: true,
    enableGamification: false,
    enableCommunityFeatures: true,
    enablePaymentSystem: false,
    enableThemingOptions: true,
    enableAdminTools: true,
    enableLiveChat: false,
    enableVideoLessons: true,
    enableCertificates: true,
    enableCustomBranding: false,
    enableMobileApp: false,
    enableEmailNotifications: true,
    enableProgressTracking: true,
    enableSocialSharing: true,
    enableUserFeedback: true,
    enableLeaderboards: false,
    enableBadges: false,
    enableDashboardCustomization: false,
    enableCodeEditor: false,
    enableWhiteboardFeature: false,
    enableGroupClasses: true,
    enableMentoring: false,
    enableSubscriptionPause: false,
    enableGiftSubscriptions: false,
  },
  toggleFeature: async () => {},
  isLoading: false,
  error: null
});

export const useFeatureContext = () => useContext(FeatureContext);

// Provider component
export const FeatureProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>({
    enableDarkMode: true,
    enableNotifications: false,
    enableAnalytics: true,
    enableFeedback: true,
    enableBetaFeatures: false,
    enableOfflineMode: false,
    enableDebugMode: false,
    enableTestDataGenerator: false,
    enableAdvancedFilters: true,
    enableCategoryManagement: true,
    enableAIFeatures: false,
    enableMultiLanguage: true,
    enableGamification: false,
    enableCommunityFeatures: true,
    enablePaymentSystem: false,
    enableThemingOptions: true,
    enableAdminTools: true,
    enableLiveChat: false,
    enableVideoLessons: true,
    enableCertificates: true,
    enableCustomBranding: false,
    enableMobileApp: false,
    enableEmailNotifications: true,
    enableProgressTracking: true,
    enableSocialSharing: true,
    enableUserFeedback: true,
    enableLeaderboards: false,
    enableBadges: false,
    enableDashboardCustomization: false,
    enableCodeEditor: false,
    enableWhiteboardFeature: false,
    enableGroupClasses: true,
    enableMentoring: false,
    enableSubscriptionPause: false,
    enableGiftSubscriptions: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch features config when component mounts
  useEffect(() => {
    // This would normally be a fetch to your backend
    // For now, we just use the default state
  }, []);

  // Toggle feature function
  const toggleFeature = async (featureName: keyof FeaturesConfig, value: boolean) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would normally be an API call to update the feature in the backend
      // For demo purposes, we'll just update the local state
      setFeaturesConfig(prevConfig => ({
        ...prevConfig,
        [featureName]: value
      }));
      
      toast.success(`Feature "${featureName}" ${value ? 'enabled' : 'disabled'}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast.error(`Error toggling feature: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FeatureContext.Provider 
      value={{ featuresConfig, toggleFeature, isLoading, error }}
    >
      {children}
    </FeatureContext.Provider>
  );
};
