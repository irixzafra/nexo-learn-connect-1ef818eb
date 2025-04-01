
import { useOnboarding as useOnboardingHook } from '@/contexts/OnboardingContext';

export const useOnboarding = () => {
  return useOnboardingHook();
};

export default useOnboarding;
