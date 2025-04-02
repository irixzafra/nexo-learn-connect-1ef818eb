
import { useContext } from 'react';
import { FeaturesContext } from '@/contexts/features/FeaturesContext';
import { FeaturesConfig, ExtendedFeatureId, CoreFeatureId, FeatureId } from '@/contexts/features/types';

/**
 * Hook to access feature flags and toggle functionality
 */
export const useFeatures = () => {
  const context = useContext(FeaturesContext);

  if (!context) {
    // Provide a fallback that matches the FeaturesContextProps interface
    return {
      featuresConfig: {
        features: {
          'core-editing': {
            id: 'core-editing' as CoreFeatureId,
            name: 'Core Editing',
            enabled: false,
            description: 'Core content editing functionality',
            isCore: true
          },
          'core-publishing': {
            id: 'core-publishing' as CoreFeatureId,
            name: 'Core Publishing',
            enabled: false,
            description: 'Content publishing and workflow',
            isCore: true
          },
          'core-templates': {
            id: 'core-templates' as CoreFeatureId,
            name: 'Core Templates',
            enabled: false,
            description: 'Template-based content creation',
            isCore: true
          },
          'core-media': {
            id: 'core-media' as CoreFeatureId,
            name: 'Core Media',
            enabled: false,
            description: 'Media library and management',
            isCore: true
          },
          'core-users': {
            id: 'core-users' as CoreFeatureId,
            name: 'Core Users',
            enabled: false,
            description: 'User management and permissions',
            isCore: true
          },
          'core-settings': {
            id: 'core-settings' as CoreFeatureId,
            name: 'Core Settings',
            enabled: false,
            description: 'System configuration options',
            isCore: true
          },
          'core-analytics': {
            id: 'core-analytics' as CoreFeatureId,
            name: 'Core Analytics',
            enabled: false,
            description: 'Basic usage analytics',
            isCore: true
          },
          'core-backup': {
            id: 'core-backup' as CoreFeatureId,
            name: 'Core Backup',
            enabled: false,
            description: 'Content backup and restoration',
            isCore: true
          },
          'user-management': {
            id: 'user-management' as CoreFeatureId,
            name: 'User Management',
            enabled: false,
            description: 'User management and permissions',
            isCore: true
          },
          'courses': {
            id: 'courses' as CoreFeatureId,
            name: 'Courses',
            enabled: false,
            description: 'Course management',
            isCore: true
          },
          'gamification': {
            id: 'gamification' as CoreFeatureId,
            name: 'Gamification',
            enabled: false,
            description: 'Gamification features',
            isCore: true
          },
          'payment-system': {
            id: 'payment-system' as CoreFeatureId,
            name: 'Payment System',
            enabled: false,
            description: 'Payment processing',
            isCore: true
          },
          'certificates': {
            id: 'certificates' as CoreFeatureId,
            name: 'Certificates',
            enabled: false,
            description: 'Certificate generation',
            isCore: true
          },
          'analytics': {
            id: 'analytics' as CoreFeatureId,
            name: 'Analytics',
            enabled: false,
            description: 'Analytics and reporting',
            isCore: true
          },
          'community': {
            id: 'community' as CoreFeatureId,
            name: 'Community',
            enabled: false,
            description: 'Community features',
            isCore: true
          },
          'theming': {
            id: 'theming' as CoreFeatureId,
            name: 'Theming',
            enabled: false,
            description: 'Theme customization',
            isCore: true
          }
        },
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
        enableContextualHelp: false,
        enableAccessibility: false,
        enableAdvancedAccessibility: false
      } as FeaturesConfig,
      isEnabled: (featureId: FeatureId) => false,
      isFeatureEnabled: (featureId: FeatureId) => false,
      enableFeature: async (featureId: FeatureId) => Promise.resolve(),
      disableFeature: async (featureId: FeatureId) => Promise.resolve(),
      toggleFeature: async (featureId: FeatureId, value?: boolean) => Promise.resolve(),
      getFeature: (featureId: FeatureId) => undefined,
      toggleExtendedFeature: async (featureId: ExtendedFeatureId, value?: boolean) => Promise.resolve(),
      updateFeatures: async (features: Partial<FeaturesConfig>) => Promise.resolve(),
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
