
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useOnboarding, OnboardingStep } from '@/contexts/OnboardingContext';
import WelcomeStep from './steps/WelcomeStep';
import ProfileStep from './steps/ProfileStep';
import ExploreCoursesStep from './steps/ExploreCoursesStep';
import PlatformTourStep from './steps/PlatformTourStep';

export const OnboardingModal: React.FC = () => {
  const { 
    isOpen, 
    closeOnboarding, 
    currentStep, 
    nextStep, 
    previousStep, 
    skipOnboarding 
  } = useOnboarding();

  // Render the appropriate step content
  const renderStepContent = () => {
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
        return <WelcomeStep />;
    }
  };

  // Step navigation controls (back, next, skip)
  const renderControls = () => {
    const isFirstStep = currentStep === OnboardingStep.WELCOME;
    const isLastStep = currentStep === OnboardingStep.TOUR;

    return (
      <div className="flex justify-between items-center mt-6">
        <Button
          variant="ghost"
          onClick={skipOnboarding}
          className="text-muted-foreground"
        >
          Omitir
        </Button>
        
        <div className="flex gap-2">
          {!isFirstStep && (
            <Button variant="outline" onClick={previousStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
          )}
          
          <Button onClick={nextStep}>
            {isLastStep ? 'Finalizar' : 'Siguiente'}
            {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeOnboarding}>
      <DialogContent className="sm:max-w-[500px]">
        <Button
          variant="ghost"
          className="absolute right-4 top-4"
          onClick={closeOnboarding}
          size="icon"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Cerrar</span>
        </Button>

        <div className="pt-2">
          {renderStepContent()}
          {renderControls()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
