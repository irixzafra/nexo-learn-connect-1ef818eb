
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingStep } from '@/contexts/onboarding/types';
import { Progress } from '@/components/ui/progress';
import { WelcomeStep } from './steps/WelcomeStep';
import { ProfileStep } from './steps/ProfileStep';
import { ExploreCoursesStep } from './steps/ExploreCoursesStep';
import { PlatformTourStep } from './steps/PlatformTourStep';

export const OnboardingModal: React.FC = () => {
  const { 
    isOpen, 
    closeOnboarding, 
    currentStep, 
    nextStep, 
    prevStep,
    previousStep,
    skipOnboarding,
    isFirstStep, 
    isLastStep, 
    progress 
  } = useOnboarding();

  // Renderizar el componente según el paso actual
  const renderStepComponent = () => {
    switch (currentStep) {
      case OnboardingStep.WELCOME:
        return <WelcomeStep />;
      case OnboardingStep.PROFILE:
        return <ProfileStep />;
      case OnboardingStep.EXPLORE:
        return <ExploreCoursesStep />;
      case OnboardingStep.TOUR:
        return <PlatformTourStep />;
      default:
        return <div>Paso no encontrado</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeOnboarding}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Bienvenido a Nexo</DialogTitle>
          <DialogDescription>
            Sigue los pasos para comenzar a usar la plataforma
          </DialogDescription>
        </DialogHeader>
        
        <Progress value={progress} className="my-2" />
        
        <div className="py-4">
          {renderStepComponent()}
        </div>
        
        <DialogFooter className="flex justify-between">
          <div>
            {!isFirstStep && (
              <Button variant="outline" onClick={previousStep} className="mr-2">
                Anterior
              </Button>
            )}
            {isFirstStep && (
              <Button variant="ghost" onClick={skipOnboarding}>
                Omitir
              </Button>
            )}
          </div>
          <Button onClick={nextStep}>
            {isLastStep ? 'Finalizar' : 'Siguiente'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
