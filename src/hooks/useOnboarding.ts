
import { useOnboarding as useOnboardingContext } from '@/contexts/OnboardingContext';

export const useOnboarding = () => {
  return useOnboardingContext();
};

export default useOnboarding;
