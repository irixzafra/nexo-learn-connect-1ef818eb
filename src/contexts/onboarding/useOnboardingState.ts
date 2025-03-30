
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

  // Alias for isOnboardingOpen
  const isOnboardingActive = isOnboardingOpen;

  // Load configuration from Supabase
  useEffect(() => {
    const loadFeaturesConfig = async () => {
      if (!userId) return;

      try {
        const { data, error } = await supabase
          .from('features_config')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error) {
          console.error('Error loading features config:', error);
          return;
        }

        if (data) {
          setFeaturesConfig({
            autoStartOnboarding: data.auto_start_onboarding ?? true,
            showOnboardingTrigger: data.show_onboarding_trigger ?? true,
            enableNotifications: data.enable_notifications ?? true,
            enableTestDataGenerator: data.enable_test_data_generator ?? false,
            enableOnboardingSystem: data.enable_onboarding_system ?? true,
          });
        }
      } catch (error) {
        console.error('Error in loadFeaturesConfig:', error);
      }
    };

    loadFeaturesConfig();
  }, [userId]);

  // Save configuration to Supabase
  const saveFeaturesToSupabase = async (updatedConfig: FeaturesConfig) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('features_config')
        .upsert({
          user_id: userId,
          auto_start_onboarding: updatedConfig.autoStartOnboarding,
          show_onboarding_trigger: updatedConfig.showOnboardingTrigger,
          enable_notifications: updatedConfig.enableNotifications,
          enable_test_data_generator: updatedConfig.enableTestDataGenerator,
          enable_onboarding_system: updatedConfig.enableOnboardingSystem,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error saving features config to Supabase:', error);
      toast.error('Error al guardar la configuración');
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
    openOnboarding,
    closeOnboarding,
    nextStep,
    prevStep,
    goToStep,
    updateFeaturesConfig,
  };
}
