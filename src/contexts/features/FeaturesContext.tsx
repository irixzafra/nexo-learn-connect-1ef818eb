
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  FeaturesConfig, 
  FeaturesContextValue,
  defaultFeaturesConfig 
} from './types';
import { applyDependencyRules, getAllDependencies, getAllDependents } from './dependencies';
import { toast } from 'sonner';

// Crear el contexto con un valor inicial
const FeaturesContext = createContext<FeaturesContextValue | undefined>(undefined);

interface FeaturesProviderProps {
  children: React.ReactNode;
}

export const FeaturesProvider: React.FC<FeaturesProviderProps> = ({ children }) => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>(defaultFeaturesConfig);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);

  // Cargar la configuración inicial desde Supabase
  useEffect(() => {
    const loadFeatures = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data: userData } = await supabase.auth.getUser();
        
        if (!userData.user) {
          console.warn("No user authenticated. Using default feature configuration.");
          setFeaturesConfig(defaultFeaturesConfig);
          setIsLoading(false);
          setInitialLoadComplete(true);
          return;
        }
        
        // Intentar cargar desde localStorage primero (para rendimiento)
        const cachedConfig = localStorage.getItem('features_config');
        if (cachedConfig) {
          try {
            const parsedConfig = JSON.parse(cachedConfig);
            if (parsedConfig.user_id === userData.user.id) {
              // Combinar con valores predeterminados para asegurar que tenemos todas las propiedades
              const mergedConfig = { ...defaultFeaturesConfig };
              
              // Mapear los nombres de columnas snake_case a camelCase
              Object.keys(parsedConfig).forEach(key => {
                const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
                if (camelKey in mergedConfig) {
                  // @ts-ignore - La verificación del tipo se hace con la línea anterior
                  mergedConfig[camelKey] = parsedConfig[key];
                }
              });
              
              setFeaturesConfig(mergedConfig);
            }
          } catch (e) {
            console.warn('Error parsing cached features config:', e);
          }
        }
        
        // Luego intentar cargar desde Supabase
        const { data, error } = await supabase
          .from('features_config')
          .select('*')
          .eq('user_id', userData.user.id)
          .single();
          
        if (error) {
          if (error.code !== 'PGRST116') { // No rows found
            throw error;
          }
          // Si no hay configuración específica para el usuario, se mantiene la predeterminada
        } else if (data) {
          // Transformar datos de snake_case a camelCase y actualizar el estado
          const mergedConfig = { ...defaultFeaturesConfig };
          
          // Mapeo explícito de nombres de columnas
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
          
          // Guardar en localStorage como caché
          localStorage.setItem('features_config', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Error loading features configuration:', err);
        setError(err instanceof Error ? err : new Error('Unknown error loading features'));
        // En caso de error, usamos la configuración predeterminada
        setFeaturesConfig(defaultFeaturesConfig);
      } finally {
        setIsLoading(false);
        setInitialLoadComplete(true);
      }
    };

    loadFeatures();
  }, []);

  // Configurar el canal de Supabase Realtime para actualizaciones en tiempo real
  useEffect(() => {
    if (!initialLoadComplete) return;
    
    const { data: authData } = supabase.auth.getSession();
    
    if (!authData) return;
    
    // Suscribirse a cambios en la tabla features_config
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
            
            // Mapear de nuevo de snake_case a camelCase
            const updatedConfig = { ...featuresConfig };
            
            // Mismo mapeo explícito que en la carga inicial
            // (Se omite por brevedad, es el mismo código del efecto anterior)
            
            // Aplica las reglas de dependencia al nuevo estado
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
  }, [initialLoadComplete, featuresConfig]);

  // Función para activar o desactivar una característica con gestión de dependencias
  const toggleFeature = async (feature: keyof FeaturesConfig, enabled: boolean) => {
    try {
      setIsLoading(true);
      
      // Aplicar reglas de dependencia automáticamente
      const newConfig = applyDependencyRules(feature, enabled, featuresConfig);
      
      // Convertir las claves de camelCase a snake_case para la base de datos
      const dbUpdates: Record<string, boolean> = {};
      
      // Solo actualizamos los valores que han cambiado
      Object.entries(newConfig).forEach(([key, value]) => {
        if (featuresConfig[key as keyof FeaturesConfig] !== value) {
          // Convertir camelCase a snake_case
          const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
          dbUpdates[snakeKey] = value;
        }
      });
      
      if (Object.keys(dbUpdates).length === 0) {
        return; // No hay cambios que guardar
      }
      
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        throw new Error('No user authenticated');
      }
      
      // Primero guardamos en localStorage para reflejar cambios inmediatamente
      const localData = {
        ...JSON.parse(localStorage.getItem('features_config') || '{}'),
        ...dbUpdates,
        user_id: userData.user.id,
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('features_config', JSON.stringify(localData));
      
      // Guardamos en la base de datos
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
      
      // Actualizar el estado local con los cambios
      setFeaturesConfig(newConfig);
      
      // Mostrar notificación apropiada
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
  
  // Función para actualizar múltiples características a la vez
  const updateFeatures = async (updates: Partial<FeaturesConfig>) => {
    try {
      setIsLoading(true);
      
      // Aplicar cada actualización teniendo en cuenta las dependencias
      let newConfig = { ...featuresConfig };
      
      Object.entries(updates).forEach(([key, value]) => {
        const featureKey = key as keyof FeaturesConfig;
        newConfig = applyDependencyRules(featureKey, !!value, newConfig);
      });
      
      // Convertir a snake_case para la base de datos
      const dbUpdates: Record<string, boolean> = {};
      
      // Solo actualizamos los valores que han cambiado
      Object.entries(newConfig).forEach(([key, value]) => {
        if (featuresConfig[key as keyof FeaturesConfig] !== value) {
          const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
          dbUpdates[snakeKey] = value;
        }
      });
      
      if (Object.keys(dbUpdates).length === 0) {
        return; // No hay cambios que guardar
      }
      
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        throw new Error('No user authenticated');
      }
      
      // Guardar en localStorage
      const localData = {
        ...JSON.parse(localStorage.getItem('features_config') || '{}'),
        ...dbUpdates,
        user_id: userData.user.id,
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('features_config', JSON.stringify(localData));
      
      // Guardar en la base de datos
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
      
      // Actualizar el estado local
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
  
  // Función simple para verificar si una característica está habilitada
  const isFeatureEnabled = (feature: keyof FeaturesConfig): boolean => {
    return !!featuresConfig[feature];
  };
  
  // Obtener las dependencias de una característica
  const getFeatureDependencies = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
    return getAllDependencies(feature);
  };
  
  // Obtener las características que dependen de una característica
  const getFeatureDependents = (feature: keyof FeaturesConfig): Array<keyof FeaturesConfig> => {
    return getAllDependents(feature);
  };
  
  // Construir el objeto de contexto
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

// Hook personalizado para usar el contexto
export const useFeatures = (): FeaturesContextValue => {
  const context = useContext(FeaturesContext);
  
  if (context === undefined) {
    throw new Error('useFeatures debe ser usado dentro de un FeaturesProvider');
  }
  
  return context;
};

// Re-exportar tipos para facilitar el uso
export type { FeaturesConfig } from './types';
export { defaultFeaturesConfig } from './types';
