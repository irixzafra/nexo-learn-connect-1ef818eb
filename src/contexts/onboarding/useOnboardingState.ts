
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { FeaturesConfig, defaultFeaturesConfig } from './types';

interface OnboardingStateProps {
  userId: string | undefined;
}

export function useOnboardingState({ userId }: OnboardingStateProps) {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>(defaultFeaturesConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Alias for isOnboardingOpen
  const isOnboardingActive = isOnboardingOpen;

  // Load configuration from Supabase
  useEffect(() => {
    const loadFeaturesConfig = async () => {
      if (!userId) return;

      try {
        // Try to fetch the user's features config
        const { data, error } = await supabase
          .from('features_config')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error) {
          // If the error is not "no rows returned", log it
          if (error.code !== 'PGRST116') {
            console.error('Error loading features config:', error);
          }
          
          // Check if the error is due to the table not existing
          if (error.code === '42P01' || error.message.includes('does not exist')) {
            console.warn('Features config table does not exist yet. Using default values.');
            // We'll attempt to create the config when user saves
          }
          
          // Continue with default values regardless of error
          return;
        }

        if (data) {
          setFeaturesConfig({
            autoStartOnboarding: data.auto_start_onboarding ?? defaultFeaturesConfig.autoStartOnboarding,
            showOnboardingTrigger: data.show_onboarding_trigger ?? defaultFeaturesConfig.showOnboardingTrigger,
            enableNotifications: data.enable_notifications ?? defaultFeaturesConfig.enableNotifications,
            enableTestDataGenerator: data.enable_test_data_generator ?? defaultFeaturesConfig.enableTestDataGenerator,
            enableOnboardingSystem: data.enable_onboarding_system ?? defaultFeaturesConfig.enableOnboardingSystem,
            enableRoleManagement: data.enable_role_management ?? defaultFeaturesConfig.enableRoleManagement,
            enableRoleSwitcher: data.enable_role_switcher ?? defaultFeaturesConfig.enableRoleSwitcher,
            enableMultiLanguage: data.enable_multi_language ?? defaultFeaturesConfig.enableMultiLanguage,
            enableLeaderboard: data.enable_leaderboard ?? defaultFeaturesConfig.enableLeaderboard,
            enableThemeSwitcher: data.enable_theme_switcher ?? defaultFeaturesConfig.enableThemeSwitcher,
            enableCategoryManagement: data.enable_category_management ?? defaultFeaturesConfig.enableCategoryManagement,
            enableContentReordering: data.enable_content_reordering ?? defaultFeaturesConfig.enableContentReordering,
          });
        }
      } catch (error) {
        console.error('Error in loadFeaturesConfig:', error);
      }
    };

    loadFeaturesConfig();
  }, [userId]);

  // Save configuration to Supabase with better error handling
  const saveFeaturesToSupabase = async (updatedConfig: FeaturesConfig) => {
    if (!userId) return;
    
    setIsSaving(true);
    setSaveError(null);

    try {
      const configData = {
        user_id: userId,
        auto_start_onboarding: updatedConfig.autoStartOnboarding,
        show_onboarding_trigger: updatedConfig.showOnboardingTrigger,
        enable_notifications: updatedConfig.enableNotifications,
        enable_test_data_generator: updatedConfig.enableTestDataGenerator,
        enable_onboarding_system: updatedConfig.enableOnboardingSystem,
        enable_role_management: updatedConfig.enableRoleManagement,
        enable_role_switcher: updatedConfig.enableRoleSwitcher,
        enable_multi_language: updatedConfig.enableMultiLanguage,
        enable_leaderboard: updatedConfig.enableLeaderboard,
        enable_theme_switcher: updatedConfig.enableThemeSwitcher,
        enable_category_management: updatedConfig.enableCategoryManagement,
        enable_content_reordering: updatedConfig.enableContentReordering,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('features_config')
        .upsert(configData, { onConflict: 'user_id' });

      if (error) {
        // If the table doesn't exist, we still want to store the config locally
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.warn('Features config table not available. Config will be stored locally only.');
          // Store in localStorage as a fallback
          localStorage.setItem('features_config', JSON.stringify(configData));
          toast.success('Configuración guardada localmente');
          return;
        }
        
        throw error;
      }
      
      toast.success('Configuración guardada correctamente');
    } catch (error: any) {
      console.error('Error saving features config:', error);
      setSaveError(error.message || 'Error al guardar la configuración');
      
      // Show a more specific error message to the user
      if (error.code === '42P01') {
        toast.error('La tabla de configuración no existe. Contacte al administrador.');
      } else if (error.code === 'PGRST301') {
        toast.error('No tiene permisos para esta acción.');
      } else {
        toast.error('Error al guardar la configuración');
      }
      
      // Still update the local state so the UI shows the intended changes
      // even if we couldn't persist them to the database
    } finally {
      setIsSaving(false);
    }
  };

  // Functions to manipulate onboarding state
  const openOnboarding = () => {
    // Only open if the onboarding system is enabled
    if (featuresConfig.enableOnboardingSystem) {
      setIsOnboardingOpen(true);
      setCurrentStep(0);
    } else {
      console.log('El sistema de onboarding está desactivado');
    }
  };

  const closeOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const updateFeaturesConfig = (updates: Partial<FeaturesConfig>) => {
    const newConfig = { ...featuresConfig, ...updates };
    setFeaturesConfig(newConfig);
    saveFeaturesToSupabase(newConfig);
  };

  return {
    isOnboardingOpen,
    isOnboardingActive,
    currentStep,
    featuresConfig,
    isSaving,
    saveError,
    openOnboarding,
    closeOnboarding,
    nextStep,
    prevStep,
    goToStep,
    updateFeaturesConfig,
  };
}
