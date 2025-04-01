
// Export types but avoid duplicate exports
export * from './useOnboardingState';
export * from './OnboardingProvider';

// Explicitly re-export from types to avoid ambiguity
export { 
  OnboardingStep,
  OnboardingContextValue
} from './types';

// Note: FeaturesConfig and defaultFeaturesConfig are already exported from OnboardingProvider
