
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useFeatures } from './features/FeaturesContext';
import { useAuth } from './AuthContext';
import { OnboardingStep, OnboardingContextValue } from './onboarding/types';
import { useOnboardingState } from './onboarding/useOnboardingState';

// Valor por defecto del contexto
const defaultContextValue: OnboardingContextValue = {
  isActive: false,
  isOpen: false,
  openOnboarding: () => {},
  closeOnboarding: () => {},
  currentStep: null,
  totalSteps: 0,
  goToStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
  isFirstStep: true,
  isLastStep: false,
  progress: 0,
  restartOnboarding: () => {},
  completeOnboarding: () => {},
  isOnboardingComplete: false,
};

const OnboardingContext = createContext<OnboardingContextValue>(defaultContextValue);

export const useOnboarding = () => useContext(OnboardingContext);

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { featuresConfig } = useFeatures();
  const [isOnboardingComplete, setIsOnboardingComplete] = useLocalStorage('onboarding-completed', false);
  const [isOpen, setIsOpen] = useState(false);
  const [forceStart, setForceStart] = useState(false);

  const { 
    isActive,
    currentStep,
    totalSteps,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    progress,
    allSteps,
    restartOnboarding,
    setActive
  } = useOnboardingState();

  // Auto-iniciar el onboarding para usuarios nuevos si la función está habilitada
  useEffect(() => {
    if (
      user && 
      featuresConfig.enableOnboardingSystem && 
      !isOnboardingComplete &&
      featuresConfig.autoStartOnboardingForNewUsers
    ) {
      // Verificar si el usuario es nuevo (creado en los últimos 7 días)
      const userCreationDate = user.created_at ? new Date(user.created_at) : null;
      const now = new Date();
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      
      if (userCreationDate && userCreationDate > sevenDaysAgo) {
        openOnboarding();
      }
    }
  }, [user, featuresConfig.enableOnboardingSystem, isOnboardingComplete]);

  // Abrir el onboarding cuando se solicita explícitamente
  useEffect(() => {
    if (forceStart) {
      setIsOpen(true);
      setForceStart(false);
    }
  }, [forceStart]);

  const openOnboarding = () => {
    if (!featuresConfig.enableOnboardingSystem) {
      return;
    }
    
    setActive(true);
    setIsOpen(true);
  };

  const closeOnboarding = () => {
    setIsOpen(false);
    
    // Dejamos un pequeño retraso antes de desactivar para que la animación
    // de cierre del diálogo termine correctamente
    setTimeout(() => {
      setActive(false);
    }, 300);
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    closeOnboarding();
    toast.success('¡Onboarding completado! Ya puedes empezar a usar la plataforma.');
  };

  const value: OnboardingContextValue = {
    isActive,
    isOpen,
    openOnboarding,
    closeOnboarding,
    currentStep,
    totalSteps,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    progress,
    restartOnboarding,
    completeOnboarding,
    isOnboardingComplete,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Re-exportar los tipos
export type { OnboardingContextValue };
