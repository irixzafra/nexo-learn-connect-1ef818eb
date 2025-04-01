import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { CoreFeatureId, ExtendedFeatureId, Feature, FeatureId, FeaturesConfig, FeaturesContextProps } from './types';
import { toast } from 'sonner';

// Default config with proper Feature objects
const initialFeaturesConfig: FeaturesConfig = {
  features: {
    'core-editing': {
      id: 'core-editing',
      name: 'Core Editing',
      enabled: true,
      description: 'Core content editing functionality',
      isCore: true
    },
    'core-publishing': {
      id: 'core-publishing',
      name: 'Core Publishing',
      enabled: true,
      description: 'Content publishing and workflow',
      isCore: true
    },
    'core-templates': {
      id: 'core-templates',
      name: 'Core Templates',
      enabled: false,
      description: 'Template-based content creation',
      isCore: true
    },
    'core-media': {
      id: 'core-media',
      name: 'Core Media',
      enabled: false,
      description: 'Media library and management',
      isCore: true
    },
    'core-users': {
      id: 'core-users',
      name: 'Core Users',
      enabled: true,
      description: 'User management and permissions',
      isCore: true
    },
    'core-settings': {
      id: 'core-settings',
      name: 'Core Settings',
      enabled: false,
      description: 'System configuration options',
      isCore: true
    },
    'core-analytics': {
      id: 'core-analytics',
      name: 'Core Analytics',
      enabled: true,
      description: 'Basic usage analytics',
      isCore: true
    },
    'core-backup': {
      id: 'core-backup',
      name: 'Core Backup',
      enabled: true,
      description: 'Content backup and restoration',
      isCore: true
    },
    'user-management': {
      id: 'user-management',
      name: 'User Management',
      enabled: true,
      description: 'User management and permissions',
      isCore: true
    },
    'courses': {
      id: 'courses',
      name: 'Courses',
      enabled: true,
      description: 'Course management',
      isCore: true
    },
    'gamification': {
      id: 'gamification',
      name: 'Gamification',
      enabled: false,
      description: 'Gamification features',
      isCore: true
    },
    'payment-system': {
      id: 'payment-system',
      name: 'Payment System',
      enabled: false,
      description: 'Payment processing',
      isCore: true
    },
    'certificates': {
      id: 'certificates',
      name: 'Certificates',
      enabled: true,
      description: 'Certificate generation',
      isCore: true
    },
    'analytics': {
      id: 'analytics',
      name: 'Analytics',
      enabled: true,
      description: 'Analytics and reporting',
      isCore: true
    },
    'community': {
      id: 'community',
      name: 'Community',
      enabled: true,
      description: 'Community features',
      isCore: true
    },
    'theming': {
      id: 'theming',
      name: 'Theming',
      enabled: true,
      description: 'Theme customization',
      isCore: true
    }
  },
  // Extended features
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
  // Settings features
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
  enableContextualHelp: true,
  // Internationalization features
  enableHreflangTags: true,
  enableRegionalContent: false,
  enableLangPrefixUrls: true
};

export const FeaturesContext = createContext<FeaturesContextProps>({
  featuresConfig: initialFeaturesConfig,
  isEnabled: () => false,
  enableFeature: async () => {},
  disableFeature: async () => {},
  toggleFeature: async () => {},
  getFeature: () => undefined,
  isFeatureEnabled: () => false,
  toggleExtendedFeature: async () => {},
  updateFeatures: async () => {},
  isLoading: false,
  error: null
});

export const FeaturesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>(initialFeaturesConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Load features config on component mount
  useEffect(() => {
    const loadFeatures = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, we would fetch from API or database
        // For now, we'll just simulate a delay and use default config
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Get stored features from localStorage if available
        const storedFeatures = localStorage.getItem('featuresConfig');
        if (storedFeatures) {
          try {
            const parsedFeatures = JSON.parse(storedFeatures);
            setFeaturesConfig(prevConfig => ({
              ...prevConfig,
              ...parsedFeatures
            }));
          } catch (err) {
            console.error('Error parsing stored features:', err);
            if (err instanceof Error) {
              setError(err);
            } else {
              setError(new Error('Error parsing stored features'));
            }
          }
        }
      } catch (err) {
        console.error('Error loading features:', err);
        setError(err instanceof Error ? err : new Error('Error loading features'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFeatures();
  }, []);

  // Check if a feature is enabled
  const isEnabled = (featureName: FeatureId): boolean => {
    if (!featuresConfig) return false;
    
    // Check if it's a core feature
    if (featureName.includes('-') && featuresConfig.features) {
      return !!featuresConfig.features[featureName as CoreFeatureId]?.enabled;
    }
    
    // Otherwise it's an extended feature
    return !!(featuresConfig as any)[featureName];
  };
  
  // Get a specific feature object
  const getFeature = (featureName: FeatureId): Feature | undefined => {
    if (!featuresConfig) return undefined;
    
    // If it's a core feature, return the feature object
    if (featureName.includes('-') && featuresConfig.features) {
      return featuresConfig.features[featureName as CoreFeatureId];
    }
    
    // For extended features, construct a feature object
    if ((featuresConfig as any)[featureName] !== undefined) {
      return {
        id: featureName,
        name: featureName.replace(/enable|([A-Z])/g, (match, p1) => p1 ? ` ${p1}` : '').trim(),
        enabled: !!(featuresConfig as any)[featureName],
        description: `${featureName.replace(/enable|([A-Z])/g, (match, p1) => p1 ? ` ${p1}` : '').trim()} feature`
      };
    }
    
    return undefined;
  };
  
  // Alternative method to check if feature is enabled
  const isFeatureEnabled = (featureName: FeatureId): boolean => {
    return isEnabled(featureName);
  };

  // Enable a feature
  const enableFeature = async (featureId: FeatureId): Promise<void> => {
    setFeaturesConfig(prev => {
      const newConfig = { ...prev };
      
      if (featureId.includes('-')) {
        // It's a core feature
        if (newConfig.features[featureId as CoreFeatureId]) {
          newConfig.features = {
            ...newConfig.features,
            [featureId]: {
              ...newConfig.features[featureId as CoreFeatureId],
              enabled: true
            }
          };
        }
      } else {
        // It's an extended feature
        (newConfig as any)[featureId] = true;
      }
      
      // Store updated config in localStorage
      try {
        localStorage.setItem('featuresConfig', JSON.stringify(newConfig));
      } catch (err) {
        console.error('Error storing features config:', err);
      }
      
      return newConfig;
    });
    
    toast.success(`Feature ${featureId} enabled`);
    return Promise.resolve();
  };

  // Disable a feature
  const disableFeature = async (featureId: FeatureId): Promise<void> => {
    setFeaturesConfig(prev => {
      const newConfig = { ...prev };
      
      if (featureId.includes('-')) {
        // It's a core feature
        if (newConfig.features[featureId as CoreFeatureId]) {
          newConfig.features = {
            ...newConfig.features,
            [featureId]: {
              ...newConfig.features[featureId as CoreFeatureId],
              enabled: false
            }
          };
        }
      } else {
        // It's an extended feature
        (newConfig as any)[featureId] = false;
      }
      
      // Store updated config in localStorage
      try {
        localStorage.setItem('featuresConfig', JSON.stringify(newConfig));
      } catch (err) {
        console.error('Error storing features config:', err);
      }
      
      return newConfig;
    });
    
    toast.success(`Feature ${featureId} disabled`);
    return Promise.resolve();
  };

  // Toggle a feature on/off
  const toggleFeature = async (featureId: FeatureId, value?: boolean): Promise<void> => {
    const currentState = isEnabled(featureId);
    const newState = value !== undefined ? value : !currentState;
    
    if (newState) {
      await enableFeature(featureId);
    } else {
      await disableFeature(featureId);
    }
    
    return Promise.resolve();
  };

  // Toggle an extended feature specifically
  const toggleExtendedFeature = async (featureId: ExtendedFeatureId, value?: boolean): Promise<void> => {
    await toggleFeature(featureId, value);
    return Promise.resolve();
  };

  // Update multiple features at once
  const updateFeatures = async (features: Partial<FeaturesConfig>): Promise<void> => {
    setFeaturesConfig(prev => {
      const newConfig = {
        ...prev,
        ...features
      };
      
      // Store updated config in localStorage
      try {
        localStorage.setItem('featuresConfig', JSON.stringify(newConfig));
      } catch (err) {
        console.error('Error storing features config:', err);
      }
      
      return newConfig;
    });
    
    toast.success('Features configuration updated');
    return Promise.resolve();
  };

  return (
    <FeaturesContext.Provider
      value={{
        featuresConfig,
        isEnabled,
        enableFeature,
        disableFeature,
        toggleFeature,
        getFeature,
        isFeatureEnabled,
        toggleExtendedFeature,
        updateFeatures,
        isLoading,
        error
      }}
    >
      {children}
    </FeaturesContext.Provider>
  );
};

export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  return context;
};
