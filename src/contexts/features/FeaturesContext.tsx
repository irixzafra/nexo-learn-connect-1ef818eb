import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  FeaturesConfig, 
  FeaturesContextValue,
  defaultFeaturesConfig 
} from './types';
import { applyDependencyRules, getAllDependencies, getAllDependents } from './dependencies';
import { toast } from 'sonner';

const FeaturesContext = createContext<FeaturesContextValue | undefined>(undefined);

interface FeaturesProviderProps {
  children: React.ReactNode;
}

export const FeaturesProvider: React.FC<FeaturesProviderProps> = ({ children }) => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>(defaultFeaturesConfig);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const authResponse = await supabase.auth.getUser();
        const userData = authResponse.data;
        
        if (!userData.user) {
          console.warn("No user authenticated. Using default feature configuration.");
          setFeaturesConfig(defaultFeaturesConfig);
          setIsLoading(false);
          setInitialLoadComplete(true);
          return;
        }
        
        const cachedConfig = localStorage.getItem('features_config');
        if (cachedConfig) {
          try {
            const parsedConfig = JSON.parse(cachedConfig);
            if (parsedConfig.user_id === userData.user.id) {
              const mergedConfig = { ...defaultFeaturesConfig };
              Object.keys(parsedConfig).forEach(key => {
                const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
                if (camelKey in mergedConfig) {
                  mergedConfig[camelKey] = parsedConfig[key];
                }
              });
              setFeaturesConfig(mergedConfig);
            }
          } catch (e) {
            console.warn('Error parsing cached features config:', e);
          }
        }
        
        const { data, error } = await supabase
          .from('features_config')
          .select('*')
          .eq('user_id', userData.user.id)
          .single();
          
        if (error) {
          if (error.code !== 'PGRST116') {
            throw error;
          }
        } else if (data) {
          const mergedConfig = { ...defaultFeaturesConfig };
          if (data.auto_start_onboarding !== undefined) 
            mergedConfig.autoStartOnboarding = data.auto_start_onboarding;
          if (data.show_onboarding_trigger !== undefined) 
            mergedConfig.showOnboardingTrigger = data.show_onboarding_trigger;
          if (data.enable_onboarding_system !== undefined) 
            mergedConfig.enableOnboardingSystem = data.enable_onboarding_system;
          if (data.enable_edit_mode !== undefined) 
            mergedConfig.enableEditMode = data.enable_edit_mode;
          if (data.enable_content_reordering !== undefined) 
            mergedConfig.enableContentReordering = data.enable_content_reordering;
          if (data.enable_theme_switcher !== undefined) 
            mergedConfig.enableThemeSwitcher = data.enable_theme_switcher;
          if (data.enable_multi_language !== undefined) 
            mergedConfig.enableMultiLanguage = data.enable_multi_language;
          if (data.enable_design_system !== undefined) 
            mergedConfig.enableDesignSystem = data.enable_design_system;
          if (data.enable_advanced_editor !== undefined) 
            mergedConfig.enableAdvancedEditor = data.enable_advanced_editor;
          if (data.enable_invitations !== undefined) 
            mergedConfig.enableInvitations = data.enable_invitations;
          if (data.enable_custom_roles !== undefined) 
            mergedConfig.enableCustomRoles = data.enable_custom_roles;
          if (data.enable_role_management !== undefined) 
            mergedConfig.enableRoleManagement = data.enable_role_management;
          if (data.enable_role_switcher !== undefined) 
            mergedConfig.enableRoleSwitcher = data.enable_role_switcher;
          if (data.enable_notifications !== undefined) 
            mergedConfig.enableNotifications = data.enable_notifications;
          if (data.enable_real_time_notifications !== undefined) 
            mergedConfig.enableRealTimeNotifications = data.enable_real_time_notifications;
          if (data.enable_email_notifications !== undefined) 
            mergedConfig.enableEmailNotifications = data.enable_email_notifications;
          if (data.enable_public_api !== undefined) 
            mergedConfig.enablePublicApi = data.enable_public_api;
          if (data.enable_webhooks !== undefined) 
            mergedConfig.enableWebhooks = data.enable_webhooks;
          if (data.enable_2fa !== undefined) 
            mergedConfig.enable2FA = data.enable_2fa;
          if (data.enable_multiple_sessions !== undefined) 
            mergedConfig.enableMultipleSessions = data.enable_multiple_sessions;
          if (data.enable_public_registration !== undefined) 
            mergedConfig.enablePublicRegistration = data.enable_public_registration;
          if (data.require_email_verification !== undefined) 
            mergedConfig.requireEmailVerification = data.require_email_verification;
          if (data.enable_activity_log !== undefined) 
            mergedConfig.enableActivityLog = data.enable_activity_log;
          if (data.enable_test_data_generator !== undefined) 
            mergedConfig.enableTestDataGenerator = data.enable_test_data_generator;
          if (data.enable_database_dev_mode !== undefined) 
            mergedConfig.enableDatabaseDevMode = data.enable_database_dev_mode;
          if (data.enable_auto_backups !== undefined) 
            mergedConfig.enableAutoBackups = data.enable_auto_backups;
          if (data.enable_query_cache !== undefined) 
            mergedConfig.enableQueryCache = data.enable_query_cache;
          if (data.enable_maintenance_mode !== undefined) 
            mergedConfig.enableMaintenanceMode = data.enable_maintenance_mode;
          if (data.enable_category_management !== undefined) 
            mergedConfig.enableCategoryManagement = data.enable_category_management;
          if (data.enable_leaderboard !== undefined) 
            mergedConfig.enableLeaderboard = data.enable_leaderboard;
          if (data.enable_ai !== undefined) 
            mergedConfig.enableAI = data.enable_ai;
          
          setFeaturesConfig(mergedConfig);
          
          localStorage.setItem('features_config', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Error loading features configuration:', err);
        setError(err instanceof Error ? err : new Error('Unknown error loading features'));
        setFeaturesConfig(defaultFeaturesConfig);
      } finally {
        setIsLoading(false);
        setInitialLoadComplete(true);
      }
    };

    loadFeatures();
  }, []);

  useEffect(() => {
    if (!initialLoadComplete) return;
    
    const setupRealtimeChannel = async () => {
      const authResponse = await supabase.auth.getSession();
      const authData = authResponse.data;
      
      if (!authData || !authData.session) return;
      
      const channel = supabase
        .channel('features_config_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'features_config',
            filter: `user_id=eq.${authData.session?.user?.id}`
          },
          (payload) => {
            console.log('Received features config update:', payload);
            if (payload.eventType === 'UPDATE') {
              const newData = payload.new;
              
              const updatedConfig = { ...featuresConfig };
              
              if (data.auto_start_onboarding !== undefined) 
                updatedConfig.autoStartOnboarding = data.auto_start_onboarding;
              if (data.show_onboarding_trigger !== undefined) 
                updatedConfig.showOnboardingTrigger = data.show_onboarding_trigger;
              if (data.enable_onboarding_system !== undefined) 
                updatedConfig.enableOnboardingSystem = data.enable_onboarding_system;
              if (data.enable_edit_mode !== undefined) 
                updatedConfig.enableEditMode = data.enable_edit_mode;
              if (data.enable_content_reordering !== undefined) 
                updatedConfig.enableContentReordering = data.enable_content_reordering;
              if (data.enable_theme_switcher !== undefined) 
                updatedConfig.enableThemeSwitcher = data.enable_theme_switcher;
              if (data.enable_multi_language !== undefined) 
                updatedConfig.enableMultiLanguage = data.enable_multi_language;
              if (data.enable_design_system !== undefined) 
                updatedConfig.enableDesignSystem = data.enable_design_system;
              if (data.enable_advanced_editor !== undefined) 
                updatedConfig.enableAdvancedEditor = data.enable_advanced_editor;
              if (data.enable_invitations !== undefined) 
                updatedConfig.enableInvitations = data.enable_invitations;
              if (data.enable_custom_roles !== undefined) 
                updatedConfig.enableCustomRoles = data.enable_custom_roles;
              if (data.enable_role_management !== undefined) 
                updatedConfig.enableRoleManagement = data.enable_role_management;
              if (data.enable_role_switcher !== undefined) 
                updatedConfig.enableRoleSwitcher = data.enable_role_switcher;
              if (data.enable_notifications !== undefined) 
                updatedConfig.enableNotifications = data.enable_notifications;
              if (data.enable_real_time_notifications !== undefined) 
                updatedConfig.enableRealTimeNotifications = data.enable_real_time_notifications;
              if (data.enable_email_notifications !== undefined) 
                updatedConfig.enableEmailNotifications = data.enable_email_notifications;
              if (data.enable_public_api !== undefined) 
                updatedConfig.enablePublicApi = data.enable_public_api;
              if (data.enable_webhooks !== undefined) 
                updatedConfig.enableWebhooks = data.enable_webhooks;
              if (data.enable_2fa !== undefined) 
                updatedConfig.enable2FA = data.enable_2fa;
              if (data.enable_multiple_sessions !== undefined) 
                updatedConfig.enableMultipleSessions = data.enable_multiple_sessions;
              if (data.enable_public_registration !== undefined) 
                updatedConfig.enablePublicRegistration = data.enable_public_registration;
              if (data.require_email_verification !== undefined) 
                updatedConfig.requireEmailVerification = data.require_email_verification;
              if (data.enable_activity_log !== undefined) 
                updatedConfig.enableActivityLog = data.enable_activity_log;
              if (data.enable_test_data_generator !== undefined) 
                updatedConfig.enableTestDataGenerator = data.enable_test_data_generator;
              if (data.enable_database_dev_mode !== undefined) 
                updatedConfig.enableDatabaseDevMode = data.enable_database_dev_mode;
              if (data.enable_auto_backups !== undefined) 
                updatedConfig.enableAutoBackups = data.enable_auto_backups;
              if (data.enable_query_cache !== undefined) 
                updatedConfig.enableQueryCache = data.enable_query_cache;
              if (data.enable_maintenance_mode !== undefined) 
                updatedConfig.enableMaintenanceMode = data.enable_maintenance_mode;
              if (data.enable_category_management !== undefined) 
                updatedConfig.enableCategoryManagement = data.enable_category_management;
              if (data.enable_leaderboard !== undefined) 
                updatedConfig.enableLeaderboard = data.enable_leaderboard;
              if (data.enable_ai !== undefined) 
                updatedConfig.enableAI = data.enable_ai;
              
              setFeaturesConfig(updatedConfig);
              localStorage.setItem('features_config', JSON.stringify(newData));
              
              toast.info('La configuración de características ha sido actualizada');
            }
          }
        )
        .subscribe();
      
      return () => {
        supabase.removeChannel(channel);
      };
    };
    
    setupRealtimeChannel();
  }, [initialLoadComplete, featuresConfig]);

  const toggleFeature = async (feature: keyof FeaturesConfig, enabled: boolean) => {
    try {
      setIsLoading(true);
      
      const newConfig = applyDependencyRules(feature, enabled, featuresConfig);
      
      const dbUpdates: Record<string, boolean> = {};
      
      Object.entries(newConfig).forEach(([key, value]) => {
        if (featuresConfig[key as keyof FeaturesConfig] !== value) {
          const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
          dbUpdates[snakeKey] = value;
        }
      });
      
      if (Object.keys(dbUpdates).length === 0) {
        return;
      }
      
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        throw new Error('No user authenticated');
      }
      
      const localData = {
        ...JSON.parse(localStorage.getItem('features_config') || '{}'),
        ...dbUpdates,
        user_id: userData.user.id,
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('features_config', JSON.stringify(localData));
      
      const { error } = await supabase
        .from('features_config')
        .upsert({
          user_id: userData.user.id,
          ...dbUpdates,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
        
      if (error) {
        throw error;
      }
      
      setFeaturesConfig(newConfig);
      
      if (enabled) {
        toast.success(`Característica "${feature}" activada`);
      } else {
        const dependents = getAllDependents(feature);
        if (dependents.length > 0) {
          toast.info(`Característica "${feature}" y sus dependientes desactivadas`, {
            description: "Se han desactivado también características que dependen de esta."
          });
        } else {
          toast.success(`Característica "${feature}" desactivada`);
        }
      }
    } catch (err) {
      console.error('Error toggling feature:', err);
      setError(err instanceof Error ? err : new Error('Unknown error toggling feature'));
      toast.error(`Error al cambiar la característica: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateFeatures = async (updates: Partial<FeaturesConfig>) => {
    try {
      setIsLoading(true);
      
      let newConfig = { ...featuresConfig };
      
      Object.entries(updates).forEach(([key, value]) => {
        const featureKey = key as keyof FeaturesConfig;
        newConfig = applyDependencyRules(featureKey, !!value, newConfig);
      });
      
      const dbUpdates: Record<string, boolean> = {};
      
      Object.entries(newConfig).forEach(([key, value]) => {
        if (featuresConfig[key as keyof FeaturesConfig] !== value) {
          const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
          dbUpdates[snakeKey] = value;
        }
      });
      
      if (Object.keys(dbUpdates).length === 0) {
        return;
      }
      
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        throw new Error('No user authenticated');
      }
      
      const localData = {
        ...JSON.parse(localStorage.getItem('features_config') || '{}'),
        ...dbUpdates,
        user_id: userData.user.id,
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('features_config', JSON.stringify(localData));
      
      const { error } = await supabase
        .from('features_config')
        .upsert({
          user_id: userData.user.id,
          ...dbUpdates,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
        
      if (error) {
        throw error;
      }
      
      setFeaturesConfig(newConfig);
      toast.success('Configuración de características actualizada');
    } catch (err) {
      console.error('Error updating features:', err);
      setError(err instanceof Error ? err : new Error('Unknown error updating features'));
      toast.error(`Error al actualizar características: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const isFeatureEnabled = (feature: keyof FeaturesConfig): boolean => {
    return !!featuresConfig[feature];
  };
  
  const getFeatureDependencies = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
    return getAllDependencies(feature);
  };
  
  const getFeatureDependents = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
    return getAllDependents(feature);
  };
  
  const contextValue: FeaturesContextValue = {
    featuresConfig,
    isLoading,
    error,
    toggleFeature,
    isFeatureEnabled,
    updateFeatures,
    getFeatureDependencies,
    getFeatureDependents
  };
  
  return (
    <FeaturesContext.Provider value={contextValue}>
      {children}
    </FeaturesContext.Provider>
  );
};

export const useFeatures = (): FeaturesContextValue => {
  const context = useContext(FeaturesContext);
  
  if (context === undefined) {
    throw new Error('useFeatures debe ser usado dentro de un FeaturesProvider');
  }
  
  return context;
};

export type { FeaturesConfig } from './types';
export { defaultFeaturesConfig } from './types';
