
import { useContext } from 'react';
import { FeaturesContext } from '@/contexts/features/FeaturesContext';

/**
 * Hook to access feature flags and toggle functionality
 */
export const useFeatures = () => {
  const context = useContext(FeaturesContext);

  if (!context) {
    // Provide a fallback to avoid errors when the context is not available yet
    return {
      featuresConfig: {
        enableMultiLanguage: false,
        enableHreflangTags: false,
        enableRegionalContent: false,
        enableLangPrefixUrls: false
      },
      toggleFeature: () => console.warn('FeaturesContext not available'),
      isFeatureEnabled: () => false,
      isLoading: false
    };
  }

  return context;
};

export default useFeatures;
