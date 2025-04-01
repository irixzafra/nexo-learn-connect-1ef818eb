
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useContext } from 'react';
import { OnboardingContext, OnboardingStep } from '@/contexts/OnboardingContext';

// Step components
import WelcomeStep from './steps/WelcomeStep';
import ProfileStep from './steps/ProfileStep';
import ExploreCoursesStep from './steps/ExploreCoursesStep';
import PlatformTourStep from './steps/PlatformTourStep';

const OnboardingModal: React.FC = () => {
  const {
    currentStep,
    isOpen,
    closeOnboarding,
    nextStep,
    prevStep,
    skipOnboarding,
    isFirstStep,
    isLastStep,
    progress,
  } = useContext(OnboardingContext);

  // Render the appropriate step component based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case OnboardingStep.Welcome:
        return <WelcomeStep />;
      case OnboardingStep.Profile:
        return <ProfileStep />;
      case OnboardingStep.ExploreCourses:
        return <ExploreCoursesStep />;
      case OnboardingStep.PlatformTour:
        return <PlatformTourStep />;
      default:
        return null;
    }
  };

  // Don't render if onboarding is completed
  if (currentStep === OnboardingStep.Completed) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeOnboarding}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="relative">
          <Progress
            value={progress}
            className="absolute top-0 left-0 right-0 h-1 rounded-none"
          />
        </div>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl">
            {currentStep === OnboardingStep.Welcome && 'Bienvenido a la plataforma'}
            {currentStep === OnboardingStep.Profile && 'Configura tu perfil'}
            {currentStep === OnboardingStep.ExploreCourses && 'Explora nuestros cursos'}
            {currentStep === OnboardingStep.PlatformTour && 'Conoce la plataforma'}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2">{renderStepContent()}</div>

        <DialogFooter className="flex justify-between bg-muted/50 p-4 border-t">
          <div>
            {!isFirstStep ? (
              <Button variant="outline" onClick={prevStep}>
                Anterior
              </Button>
            ) : (
              <Button variant="ghost" onClick={skipOnboarding}>
                Omitir guía
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
