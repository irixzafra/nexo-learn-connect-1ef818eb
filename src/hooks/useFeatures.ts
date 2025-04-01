
import { useContext } from 'react';
import { FeaturesContext } from '@/contexts/features/FeaturesContext';
import type { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';

/**
 * Custom hook to access feature flags
 */
export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  
  if (!context) {
    console.warn('useFeatures must be used within a FeaturesProvider');
    // Return a default context to prevent crashes when FeaturesProvider is not available
    return {
      features: {},
      featuresConfig: {
        features: {},
        enableDarkMode: true,
        enableNotifications: true,
        enableAnalytics: false,
        enableFeedback: true,
        enableBetaFeatures: false,
        enableOfflineMode: false,
        enableDebugMode: false,
        enableTestDataGenerator: false,
        enableAdvancedFilters: false, 
        enableCategoryManagement: true,
        enableAIFeatures: false,
        enableMultiLanguage: false,
        enableGamification: false,
        enableCommunityFeatures: false,
        enablePaymentSystem: false,
        enableThemingOptions: true,
        enableAdminTools: true,
        enableLiveChat: false,
        enableVideoLessons: false,
        enableCertificates: false,
        enableCustomBranding: false,
        enableMobileApp: false,
        enableEmailNotifications: true,
        enableProgressTracking: false,
        enableSocialSharing: false,
        enableUserFeedback: true,
        enableLeaderboards: false,
        enableBadges: false,
        enableDashboardCustomization: false,
        enableCodeEditor: false,
        enableWhiteboardFeature: false,
        enableGroupClasses: false,
        enableMentoring: false,
        enableSubscriptionPause: false,
        enableGiftSubscriptions: false,
        enableInlineEditing: true,
        designSystemEnabled: true,
        enableThemeSwitcher: true,
        enableAutoBackups: false,
        enableQueryCache: true,
        enableMaintenanceMode: false,
        enableDatabaseDevMode: false,
        enable2FA: false,
        enableMultipleSessions: true,
        enablePublicRegistration: true,
        requireEmailVerification: false,
        enableActivityLog: true,
        enableOnboarding: true,
        requireOnboarding: false,
        autoStartOnboarding: true,
        showOnboardingTrigger: true,
        enableContextualHelp: true
      } as unknown as FeaturesConfig,
      isEnabled: () => true,
      enableFeature: async () => {},
      disableFeature: async () => {},
      toggleFeature: async () => {},
      getFeature: () => undefined,
      isFeatureEnabled: () => true,
      toggleExtendedFeature: async () => {},
      updateFeatures: async () => {},
      isLoading: false,
      error: null
    };
  }
  
  return context;
};

/**
 * Check if a specific feature is enabled
 * @param featureName The name of the feature to check
 * @returns Boolean indicating if the feature is enabled
 */
export const useFeature = (featureName: FeatureId): boolean => {
  const { featuresConfig, isEnabled } = useFeatures();
  
  if (typeof isEnabled === 'function') {
    return isEnabled(featureName);
  }
  
  if (!featuresConfig) {
    return false;
  }

  // Safe check if it's a core feature
  if (featureName.includes('-') && featuresConfig.features) {
    return !!featuresConfig.features[featureName as keyof typeof featuresConfig.features]?.enabled;
  }
  
  return !!featuresConfig[featureName as keyof FeaturesConfig];
};
