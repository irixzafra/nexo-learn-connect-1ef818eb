
import { useEffect } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useLocalization } from '@/hooks/useLocalization';
import { toast } from 'sonner';

/**
 * Hook for accessing and managing accessibility features
 */
export const useAccessibility = () => {
  const { preferences, updatePreference } = useUserPreferences();
  const { t } = useLocalization();
  
  // Apply high contrast mode if enabled
  useEffect(() => {
    if (preferences?.accessibility_options?.high_contrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [preferences?.accessibility_options?.high_contrast]);
  
  // Apply reduced motion if enabled
  useEffect(() => {
    if (preferences?.accessibility_options?.reduce_animations) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [preferences?.accessibility_options?.reduce_animations]);
  
  // Apply text size adjustments if needed
  useEffect(() => {
    // Remove any previous text size classes
    document.documentElement.classList.remove(
      'text-size-small', 
      'text-size-normal', 
      'text-size-large', 
      'text-size-x-large'
    );
    
    // Add the current text size class if it's not "normal"
    const textSize = preferences?.accessibility_options?.text_size;
    if (textSize && textSize !== 'normal') {
      document.documentElement.classList.add(`text-size-${textSize}`);
    }
  }, [preferences?.accessibility_options?.text_size]);
  
  // Toggle high contrast mode
  const toggleHighContrast = async () => {
    const currentValue = preferences?.accessibility_options?.high_contrast || false;
    const success = await updatePreference('accessibility_options', {
      ...preferences?.accessibility_options,
      high_contrast: !currentValue
    });
    
    if (success) {
      toast.success(
        currentValue 
          ? t('accessibility.highContrast.disabled', { default: 'High contrast mode disabled' })
          : t('accessibility.highContrast.enabled', { default: 'High contrast mode enabled' })
      );
    }
  };
  
  // Toggle reduced animations
  const toggleReducedMotion = async () => {
    const currentValue = preferences?.accessibility_options?.reduce_animations || false;
    const success = await updatePreference('accessibility_options', {
      ...preferences?.accessibility_options,
      reduce_animations: !currentValue
    });
    
    if (success) {
      toast.success(
        currentValue 
          ? t('accessibility.reducedMotion.disabled', { default: 'Animations enabled' })
          : t('accessibility.reducedMotion.enabled', { default: 'Animations reduced' })
      );
    }
  };
  
  // Update text size
  const setTextSize = async (size: 'small' | 'normal' | 'large' | 'x-large') => {
    const success = await updatePreference('accessibility_options', {
      ...preferences?.accessibility_options,
      text_size: size
    });
    
    if (success) {
      toast.success(t('accessibility.textSize.updated', { default: 'Text size updated' }));
    }
  };
  
  // Check if a specific accessibility feature is enabled
  const isEnabled = (feature: string): boolean => {
    if (!preferences?.accessibility_options) return false;
    return !!preferences.accessibility_options[feature];
  };
  
  return {
    preferences,
    isHighContrastEnabled: isEnabled('high_contrast'),
    isReducedMotionEnabled: isEnabled('reduce_animations'),
    textSize: preferences?.accessibility_options?.text_size || 'normal',
    isScreenReaderOptimized: isEnabled('screen_reader'),
    toggleHighContrast,
    toggleReducedMotion,
    setTextSize,
    isEnabled
  };
};
