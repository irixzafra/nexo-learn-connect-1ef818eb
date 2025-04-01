
import { createContext } from 'react';

export interface FeaturesConfig {
  enableThemeSwitcher: boolean;
  enableDesignSystem: boolean;
  enableMultiLanguage: boolean;
  enableAutoTheme: boolean;
  enableCourseRecommendations: boolean;
  enableLearningPaths: boolean;
  enableCommunity: boolean;
  enableStudentProfiles: boolean;
  enableAIAssistant: boolean;
  enableGamification: boolean;
  enableEmailNotifications: boolean;
  enablePushNotifications: boolean;
  enable2FA: boolean;
  enableSocialLogin: boolean;
  enablePasswordless: boolean;
}

interface OnboardingContextType {
  isOnboardingCompleted: boolean;
  currentStep: number;
  completeOnboarding: () => void;
  setCurrentStep: (step: number) => void;
}

export const OnboardingContext = createContext<OnboardingContextType>({
  isOnboardingCompleted: false,
  currentStep: 1,
  completeOnboarding: () => {},
  setCurrentStep: () => {},
});

export default OnboardingContext;
