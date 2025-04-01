
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { FeaturesConfig } from './types';

// Re-export the type
export type { FeaturesConfig } from './types';

// Context interface
interface FeaturesContextProps {
  features: FeaturesConfig;
  updateFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
  error: string | null;
}

// Default context
const defaultContext: FeaturesContextProps = {
  features: {
    designSystemEnabled: true,
    enableContentReordering: false,
    enableCategoryManagement: false,
    enableThemeSwitcher: true,
    enableRoleSwitcher: true,
    enableRoleManagement: true,
    enableOnboardingSystem: true,
    enableTestDataGenerator: false,
    enableNotifications: true,
    showOnboardingTrigger: true,
    autoStartOnboarding: true,
  },
  updateFeature: () => {},
  isLoading: true,
  error: null
};

// Create context
const FeaturesContext = createContext<FeaturesContextProps>(defaultContext);

// Provider component
export const FeaturesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [features, setFeatures] = useState<FeaturesConfig>(defaultContext.features);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load features from database
  useEffect(() => {
    const loadFeatures = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('features_config')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setFeatures({
            designSystemEnabled: data.design_system_enabled ?? true,
            enableContentReordering: data.enable_content_reordering ?? false,
            enableCategoryManagement: data.enable_category_management ?? false,
            enableThemeSwitcher: data.enable_theme_switcher ?? true,
            enableRoleSwitcher: data.enable_role_switcher ?? true,
            enableRoleManagement: data.enable_role_management ?? true,
            enableOnboardingSystem: data.enable_onboarding_system ?? true,
            enableTestDataGenerator: data.enable_test_data_generator ?? false,
            enableNotifications: data.enable_notifications ?? true,
            showOnboardingTrigger: data.show_onboarding_trigger ?? true,
            autoStartOnboarding: data.auto_start_onboarding ?? true,
          });
        }

      } catch (err) {
        console.error('Error loading features:', err);
        setError('Failed to load features configuration');
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatures();
  }, [user?.id]);

  // Update a feature
  const updateFeature = async (feature: keyof FeaturesConfig, value: boolean) => {
    if (!user?.id) return;

    try {
      // Update local state immediately for responsive UI
      setFeatures(prev => ({ ...prev, [feature]: value }));

      // Map the feature key to database column name
      const featureColumnMapping: Record<keyof FeaturesConfig, string> = {
        designSystemEnabled: 'design_system_enabled',
        enableContentReordering: 'enable_content_reordering',
        enableCategoryManagement: 'enable_category_management',
        enableThemeSwitcher: 'enable_theme_switcher', 
        enableRoleSwitcher: 'enable_role_switcher',
        enableRoleManagement: 'enable_role_management',
        enableOnboardingSystem: 'enable_onboarding_system',
        enableTestDataGenerator: 'enable_test_data_generator',
        enableNotifications: 'enable_notifications',
        showOnboardingTrigger: 'show_onboarding_trigger',
        autoStartOnboarding: 'auto_start_onboarding',
      };

      const column = featureColumnMapping[feature];
      
      // Update database
      const { error } = await supabase
        .from('features_config')
        .upsert({ 
          user_id: user.id, 
          [column]: value,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'user_id'
        });

      if (error) throw error;
      toast.success(`Feature "${feature}" updated successfully`);

    } catch (err) {
      console.error('Error updating feature:', err);
      toast.error(`Failed to update feature "${feature}"`);
      
      // Revert local state on error
      setFeatures(prev => ({ ...prev, [feature]: !value }));
    }
  };

  return (
    <FeaturesContext.Provider value={{ features, updateFeature, isLoading, error }}>
      {children}
    </FeaturesContext.Provider>
  );
};

// Hook for using the features context
export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  return context;
};
