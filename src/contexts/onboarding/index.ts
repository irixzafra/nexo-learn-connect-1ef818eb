
// Export types but avoid duplicate exports
export * from './useOnboardingState';
export * from './OnboardingProvider';

// Explicitly re-export types to avoid ambiguity
export type { 
  OnboardingStep,
  OnboardingContextValue
} from '../OnboardingContext';

// Note: FeaturesConfig and defaultFeaturesConfig are already exported from OnboardingProvider
