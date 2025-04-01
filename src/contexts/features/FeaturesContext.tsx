
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CoreFeatureId, ExtendedFeatureId, Feature, FeatureId, FeaturesConfig, FeaturesContextProps } from './types';
import { toast } from 'sonner';

// Default config
const initialFeaturesConfig: FeaturesConfig = {
  features: {} as Record<CoreFeatureId, Feature>,
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
  // Additional features for Settings pages
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
export const FeaturesContext = createContext<FeaturesContextProps>({} as FeaturesContextProps);

// Hook to access the context
export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
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
    initializeCoreFeatures();
    fetchFeaturesConfig();
  }, []);

  const initializeCoreFeatures = () => {
    const coreFeatures: Record<CoreFeatureId, Feature> = {
      'user-management': {
        id: 'user-management',
        name: 'Gestión de Usuarios',
        description: 'Sistema de gestión de usuarios y roles',
        enabled: true,
        isCore: true
      },
      'courses': {
        id: 'courses',
        name: 'Sistema de Cursos',
        description: 'Funcionalidad completa de cursos y lecciones',
        enabled: true,
        isCore: true
      },
      'gamification': {
        id: 'gamification',
        name: 'Gamificación',
        description: 'Sistema de puntos, logros y clasificaciones',
        enabled: false,
        isCore: true
      },
      'payment-system': {
        id: 'payment-system',
        name: 'Sistema de Pagos',
        description: 'Procesamiento de pagos y suscripciones',
        enabled: false,
        isCore: true
      },
      'certificates': {
        id: 'certificates',
        name: 'Certificados',
        description: 'Generación y gestión de certificados',
        enabled: true,
        isCore: true
      },
      'analytics': {
        id: 'analytics',
        name: 'Analíticas',
        description: 'Seguimiento y análisis de datos',
        enabled: false,
        isCore: true
      },
      'community': {
        id: 'community',
        name: 'Comunidad',
        description: 'Foros, grupos y discusiones',
        enabled: true,
        isCore: true
      },
      'theming': {
        id: 'theming',
        name: 'Sistema de Temas',
        description: 'Personalización visual de la plataforma',
        enabled: true,
        isCore: true
      },
    };

    setFeaturesConfig(prev => ({
      ...prev,
      features: coreFeatures
    }));
  };

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
    if (featuresConfig.features && Object.keys(featuresConfig.features).includes(featureId as string)) {
      return !!featuresConfig.features[featureId as CoreFeatureId]?.enabled;
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
    if (featuresConfig.features && Object.keys(featuresConfig.features).includes(featureId as string)) {
      return featuresConfig.features[featureId as CoreFeatureId];
    }
    return undefined;
  };

  // Toggle a feature
  const toggleFeature = (featureId: FeatureId, value?: boolean): void => {
    if (featuresConfig.features && Object.keys(featuresConfig.features).includes(featureId as string)) {
      // It's a core feature
      const isCurrentlyEnabled = featuresConfig.features[featureId as CoreFeatureId]?.enabled;
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
    enableFeature: (featureId) => toggleFeature(featureId, true),
    disableFeature: (featureId) => toggleFeature(featureId, false),
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
    <FeaturesContext.Provider value={value}>
      {children}
    </FeaturesContext.Provider>
  );
};
