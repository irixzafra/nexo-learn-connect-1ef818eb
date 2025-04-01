
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CoreFeatureId, ExtendedFeatureId, Feature, FeatureId, FeaturesConfig, FeaturesContextProps } from './types';
import { toast } from 'sonner';

// Default config
const initialFeaturesConfig: FeaturesConfig = {
  features: {
    'user-management': {
      enabled: true,
      description: 'Sistema de gestión de usuarios y roles',
      isCore: true
    },
    'courses': {
      enabled: true,
      description: 'Funcionalidad completa de cursos y lecciones',
      isCore: true
    },
    'gamification': {
      enabled: false,
      description: 'Sistema de puntos, logros y clasificaciones',
      isCore: true
    },
    'payment-system': {
      enabled: false,
      description: 'Procesamiento de pagos y suscripciones',
      isCore: true
    },
    'certificates': {
      enabled: true,
      description: 'Generación y gestión de certificados',
      isCore: true
    },
    'analytics': {
      enabled: false,
      description: 'Seguimiento y análisis de datos',
      isCore: true
    },
    'community': {
      enabled: true,
      description: 'Foros, grupos y discusiones',
      isCore: true
    },
    'theming': {
      enabled: true,
      description: 'Personalización visual de la plataforma',
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
  enableTestDataGenerator: true,
  enableAdvancedFilters: true,
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
  enableCodeEditor: true,
  enableWhiteboardFeature: false,
  enableGroupClasses: false,
  enableMentoring: false,
  enableSubscriptionPause: false,
  enableGiftSubscriptions: false,
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
};

// Create context
export const FeatureContext = createContext<FeaturesContextProps>({} as FeaturesContextProps);

// Hook to access the context
export const useFeatureContext = () => {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error('useFeatureContext must be used within a FeaturesProvider');
  }
  return context;
};

// Provider component
export const FeaturesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>(initialFeaturesConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize core features
  useEffect(() => {
    fetchFeaturesConfig();
  }, []);

  // Fetch features config from the database
  const fetchFeaturesConfig = async () => {
    try {
      setIsLoading(true);
      
      // Get user data to check if authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Fetch user's features config
        const { data, error } = await supabase
          .from('features_config')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          // PGRST116 is "no rows returned" error
          console.error('Error fetching features config:', error);
          setError(error.message);
        } else if (data) {
          // Update feature flags
          const updatedConfig = {
            ...initialFeaturesConfig,
            ...data
          };
          
          // Ensure features object is preserved
          if (!updatedConfig.features) {
            updatedConfig.features = initialFeaturesConfig.features;
          }
          
          setFeaturesConfig(updatedConfig);
        } else {
          // Create new features config for this user
          const { error: insertError } = await supabase
            .from('features_config')
            .insert({
              user_id: user.id,
              ...initialFeaturesConfig
            });
            
          if (insertError) {
            console.error('Error creating features config:', insertError);
            setError(insertError.message);
          }
        }
      }
    } catch (err) {
      console.error('Error in fetchFeaturesConfig:', err);
      setError('Failed to fetch features configuration');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if a feature is enabled
  const isEnabled = (featureId: FeatureId): boolean => {
    // For core features, check the features object
    if (Object.keys(featuresConfig.features).includes(featureId as string)) {
      return featuresConfig.features[featureId as CoreFeatureId]?.enabled;
    } 
    
    // For extended features, check the direct property
    return !!featuresConfig[featureId as keyof FeaturesConfig];
  };

  // Check if an extended feature is enabled (alias for isEnabled)
  const isFeatureEnabled = (featureFlag: ExtendedFeatureId): boolean => {
    return isEnabled(featureFlag);
  };

  // Get a feature by its ID
  const getFeature = (featureId: FeatureId): Feature | undefined => {
    if (Object.keys(featuresConfig.features).includes(featureId as string)) {
      return featuresConfig.features[featureId as CoreFeatureId];
    }
    return undefined;
  };

  // Enable a feature
  const enableFeature = (featureId: FeatureId): void => {
    if (Object.keys(featuresConfig.features).includes(featureId as string)) {
      // It's a core feature
      setFeaturesConfig(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureId]: {
            ...prev.features[featureId as CoreFeatureId],
            enabled: true
          }
        }
      }));
    } else {
      // It's an extended feature
      setFeaturesConfig(prev => ({
        ...prev,
        [featureId]: true
      }));
    }
  };

  // Disable a feature
  const disableFeature = (featureId: FeatureId): void => {
    if (Object.keys(featuresConfig.features).includes(featureId as string)) {
      // It's a core feature
      setFeaturesConfig(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureId]: {
            ...prev.features[featureId as CoreFeatureId],
            enabled: false
          }
        }
      }));
    } else {
      // It's an extended feature
      setFeaturesConfig(prev => ({
        ...prev,
        [featureId]: false
      }));
    }
  };

  // Toggle a feature
  const toggleFeature = (featureId: FeatureId, value?: boolean): void => {
    if (Object.keys(featuresConfig.features).includes(featureId as string)) {
      // It's a core feature
      const isCurrentlyEnabled = featuresConfig.features[featureId as CoreFeatureId].enabled;
      const newValue = typeof value === 'boolean' ? value : !isCurrentlyEnabled;
      
      setFeaturesConfig(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureId]: {
            ...prev.features[featureId as CoreFeatureId],
            enabled: newValue
          }
        }
      }));
    } else {
      // It's an extended feature
      const isCurrentlyEnabled = !!featuresConfig[featureId as keyof FeaturesConfig];
      const newValue = typeof value === 'boolean' ? value : !isCurrentlyEnabled;
      
      setFeaturesConfig(prev => ({
        ...prev,
        [featureId]: newValue
      }));
    }
  };

  // Toggle an extended feature with API sync
  const toggleExtendedFeature = async (featureId: ExtendedFeatureId, value: boolean): Promise<void> => {
    setFeaturesConfig(prev => ({
      ...prev,
      [featureId]: value
    }));
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('features_config')
          .update({ [featureId]: value })
          .eq('user_id', user.id);
          
        if (error) {
          console.error('Error updating feature config:', error);
          throw error;
        }
      }
    } catch (err) {
      // Revert change if failed
      setFeaturesConfig(prev => ({
        ...prev,
        [featureId]: !value
      }));
      
      toast.error('Error al actualizar la configuración');
    }
  };

  // Update features config
  const updateFeatures = async (config: Partial<FeaturesConfig>): Promise<void> => {
    // Update local state
    setFeaturesConfig(prev => ({
      ...prev,
      ...config
    }));
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('features_config')
          .update(config)
          .eq('user_id', user.id);
          
        if (error) {
          console.error('Error updating features config:', error);
          throw error;
        }
      }
    } catch (err) {
      toast.error('Error al guardar la configuración');
    }
  };

  const value: FeaturesContextProps = {
    features: featuresConfig.features,
    isEnabled,
    enableFeature,
    disableFeature,
    toggleFeature,
    getFeature,
    featuresConfig,
    isFeatureEnabled,
    toggleExtendedFeature,
    updateFeatures,
    isLoading,
    error
  };

  return (
    <FeatureContext.Provider value={value}>
      {children}
    </FeatureContext.Provider>
  );
};
