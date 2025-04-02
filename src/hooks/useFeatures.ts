
import { useContext } from 'react';
import { FeaturesContext } from '@/contexts/features/FeaturesContext';
import { FeaturesConfig, ExtendedFeatureId } from '@/contexts/features/types';

/**
 * Hook to access feature flags and toggle functionality
 */
export const useFeatures = () => {
  const context = useContext(FeaturesContext);

  if (!context) {
    // Provide a fallback that matches the FeaturesContextProps interface
    return {
      featuresConfig: {
        features: {},
        enableMultiLanguage: false,
        enableHreflangTags: false,
        enableRegionalContent: false,
        enableLangPrefixUrls: false,
        enableDarkMode: false,
        enableNotifications: false,
        enableAnalytics: false,
        enableFeedback: false,
        enableBetaFeatures: false,
        enableOfflineMode: false,
        enableDebugMode: false,
        enableTestDataGenerator: false,
        enableAdvancedFilters: false,
        enableCategoryManagement: false,
        enableAIFeatures: false,
        enableGamification: false,
        enableCommunityFeatures: false,
        enablePaymentSystem: false,
        enableThemingOptions: false,
        enableAdminTools: false,
        enableLiveChat: false,
        enableVideoLessons: false,
        enableCertificates: false,
        enableCustomBranding: false,
        enableMobileApp: false,
        enableEmailNotifications: false,
        enableProgressTracking: false,
        enableSocialSharing: false,
        enableUserFeedback: false,
        enableLeaderboards: false,
        enableBadges: false,
        enableDashboardCustomization: false,
        enableCodeEditor: false,
        enableWhiteboardFeature: false,
        enableGroupClasses: false,
        enableMentoring: false,
        enableSubscriptionPause: false,
        enableGiftSubscriptions: false,
        enableInlineEditing: false,
        designSystemEnabled: false,
        enableThemeSwitcher: false,
        enableAutoBackups: false,
        enableQueryCache: false,
        enableMaintenanceMode: false,
        enableDatabaseDevMode: false,
        enable2FA: false,
        enableMultipleSessions: false,
        enablePublicRegistration: false,
        requireEmailVerification: false,
        enableActivityLog: false,
        enableOnboarding: false,
        requireOnboarding: false,
        autoStartOnboarding: false,
        showOnboardingTrigger: false,
        enableContextualHelp: false
      },
      isEnabled: () => false,
      isFeatureEnabled: () => false,
      enableFeature: async () => Promise.resolve(),
      disableFeature: async () => Promise.resolve(),
      toggleFeature: async () => Promise.resolve(),
      getFeature: () => undefined,
      toggleExtendedFeature: async () => Promise.resolve(),
      updateFeatures: async () => Promise.resolve(),
      isLoading: false,
      error: null
    };
  }

  return context;
};

// Create a useFeature hook specifically for accessing single features
export const useFeature = (featureId: ExtendedFeatureId) => {
  const { isEnabled } = useFeatures();
  return isEnabled(featureId);
};

export default useFeatures;
