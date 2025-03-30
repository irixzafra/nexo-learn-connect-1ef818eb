
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

// Define OnboardingStep type
export type OnboardingStep = 'welcome' | 'profile' | 'explore-courses' | 'platform-tour';

// Configuración de características
type FeaturesConfig = {
  autoStartOnboarding: boolean;
  showOnboardingTrigger: boolean;
  enableNotifications: boolean;
  enableTestDataGenerator: boolean;
  enableOnboardingSystem: boolean; // Nueva opción para desactivar completamente el onboarding
};

interface OnboardingContextValue {
  isOnboardingOpen: boolean;
  currentStep: number;
  featuresConfig: FeaturesConfig;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateFeaturesConfig: (updates: Partial<FeaturesConfig>) => void;
  
  // Added missing properties
  isOnboardingActive: boolean;
  startOnboarding: () => void;
  skipOnboarding: () => void;
  previousStep: () => void;
}

// Valor predeterminado para el contexto
const defaultContextValue: OnboardingContextValue = {
  isOnboardingOpen: false,
  currentStep: 0,
  featuresConfig: {
    autoStartOnboarding: true,
    showOnboardingTrigger: true,
    enableNotifications: true,
    enableTestDataGenerator: false,
    enableOnboardingSystem: true, // Por defecto, el sistema de onboarding está activado
  },
  openOnboarding: () => {},
  closeOnboarding: () => {},
  nextStep: () => {},
  prevStep: () => {},
  goToStep: () => {},
  updateFeaturesConfig: () => {},
  
  // Added missing properties
  isOnboardingActive: false,
  startOnboarding: () => {},
  skipOnboarding: () => {},
  previousStep: () => {},
};

// Creación del contexto
const OnboardingContext = createContext<OnboardingContextValue>(defaultContextValue);

// Hook para usar el contexto
export const useOnboarding = () => useContext(OnboardingContext);

// Proveedor del contexto
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>(defaultContextValue.featuresConfig);
  const { user } = useAuth();

  // Added isOnboardingActive alias for compatibility
  const isOnboardingActive = isOnboardingOpen;

  // Cargar configuración desde Supabase (si está disponible)
  useEffect(() => {
    const loadFeaturesConfig = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('features_config')
          .select('*')
          .eq('user_id', user.id)
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
            enableOnboardingSystem: data.enable_onboarding_system ?? true, // Cargar valor de la base de datos
          });
        }
      } catch (error) {
        console.error('Error in loadFeaturesConfig:', error);
      }
    };

    loadFeaturesConfig();
  }, [user]);

  // Guardar configuración en Supabase
  const saveFeaturesToSupabase = async (updatedConfig: FeaturesConfig) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('features_config')
        .upsert({
          user_id: user.id,
          auto_start_onboarding: updatedConfig.autoStartOnboarding,
          show_onboarding_trigger: updatedConfig.showOnboardingTrigger,
          enable_notifications: updatedConfig.enableNotifications,
          enable_test_data_generator: updatedConfig.enableTestDataGenerator,
          enable_onboarding_system: updatedConfig.enableOnboardingSystem, // Guardar en la base de datos
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

  // Funciones para manipular el estado del onboarding
  const openOnboarding = () => {
    // Solo abrir si el sistema de onboarding está habilitado
    if (featuresConfig.enableOnboardingSystem) {
      setIsOnboardingOpen(true);
      setCurrentStep(0);
    } else {
      console.log('El sistema de onboarding está desactivado');
    }
  };

  // Alias for openOnboarding for compatibility
  const startOnboarding = () => {
    openOnboarding();
  };

  const closeOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  // Alias for closeOnboarding for compatibility
  const skipOnboarding = () => {
    closeOnboarding();
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  // Alias for prevStep for compatibility
  const previousStep = () => {
    prevStep();
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  // Actualizar la configuración de características
  const updateFeaturesConfig = (updates: Partial<FeaturesConfig>) => {
    const newConfig = { ...featuresConfig, ...updates };
    setFeaturesConfig(newConfig);
    saveFeaturesToSupabase(newConfig);
  };

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingOpen,
        currentStep,
        featuresConfig,
        openOnboarding,
        closeOnboarding,
        nextStep,
        prevStep,
        goToStep,
        updateFeaturesConfig,
        // Added missing properties
        isOnboardingActive,
        startOnboarding,
        skipOnboarding,
        previousStep
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
