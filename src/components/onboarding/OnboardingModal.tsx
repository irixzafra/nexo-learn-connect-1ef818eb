
import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOnboarding, OnboardingStep } from '@/contexts/OnboardingContext';
import { WelcomeStep } from './steps/WelcomeStep';
import { ProfileStep } from './steps/ProfileStep';
import { ExploreCoursesStep } from './steps/ExploreCoursesStep';
import { PlatformTourStep } from './steps/PlatformTourStep';

export const OnboardingModal: React.FC = () => {
  const { 
    isOnboardingActive, 
    currentStep, 
    nextStep, 
    previousStep, 
    skipOnboarding 
  } = useOnboarding();

  // Render the appropriate step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep />;
      case 'profile':
        return <ProfileStep />;
      case 'explore-courses':
        return <ExploreCoursesStep />;
      case 'platform-tour':
        return <PlatformTourStep />;
      default:
        return <WelcomeStep />;
    }
  };

  // Get appropriate step title
  const getStepTitle = (step: OnboardingStep): string => {
    switch (step) {
      case 'welcome':
        return 'Bienvenido a Nexo';
      case 'profile':
        return 'Completa tu perfil';
      case 'explore-courses':
        return 'Explora cursos disponibles';
      case 'platform-tour':
        return 'Conoce la plataforma';
      default:
        return 'Bienvenido';
    }
  };

  // Check if it's the first or last step
  const isFirstStep = currentStep === 'welcome';
  const isLastStep = currentStep === 'platform-tour';

  return (
    <Dialog open={isOnboardingActive} onOpenChange={skipOnboarding}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 bg-primary/5">
          <DialogTitle className="text-2xl">{getStepTitle(currentStep)}</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderStepContent()}
        </div>
        
        <DialogFooter className="p-6 pt-4 border-t flex justify-between">
          <div>
            {!isFirstStep && (
              <Button variant="ghost" onClick={previousStep}>
                Anterior
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={skipOnboarding}>
              Saltar
            </Button>
            <Button onClick={nextStep}>
              {isLastStep ? 'Completar' : 'Siguiente'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
