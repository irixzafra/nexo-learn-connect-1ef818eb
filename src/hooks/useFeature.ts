
import { useState, useEffect } from 'react';

// Define the feature IDs
export type FeatureId = 
  | 'enableAnalytics'
  | 'enableAdvancedAnalytics'
  | 'enableRealTimeUpdates'
  | 'enableCustomDashboards'
  | 'enableApiAccess'
  | 'enableMobileApp'
  | 'enableIntegrations'
  | 'enableBulkOperations'
  | 'enableExports'
  | 'enableAdvancedReporting'
  | 'enableAccessibility'
  | 'enableAdvancedAccessibility'
  | 'enableBetaFeatures'
  | 'enableLocalization'
  | 'enableMultitenancy'
  | 'enableCustomization'
  | 'enableAuditLogs'
  | 'enableSecurityControls'
  | 'enableAI'
  | 'enableChat'
  | 'enableFeedback'
  | 'enableHelp'
  | 'enableTutorials'
  | 'enableScorm'
  | 'enableCertificates'
  | 'enableGamification'
  | 'enableSso'
  | 'enableWhiteLabeling'
  | 'enableCustomFonts'
  | 'enableCustomColors'
  | 'enableCustomThemes'
  | 'enableCustomWidgets'
  | 'enableCustomFields'
  | 'enableCustomValidation'
  | 'enableCustomFilters'
  | 'enableCustomSorting'
  | 'enableCustomExports'
  | 'enableCustomImports'
  | 'enableCustomReports'
  | 'enableCustomDashboard'
  | 'enableCustomCharts'
  | 'enableCustomNotifications'
  | 'enableCustomEmails'
  | 'enableCustomSms'
  | 'enableCoreEditing';

// Extended to include custom features
export type ExtendedFeatureId = FeatureId | string;

// Default features
const defaultFeatures: Record<FeatureId, boolean> = {
  enableAnalytics: true,
  enableAdvancedAnalytics: true,
  enableRealTimeUpdates: false,
  enableCustomDashboards: true,
  enableApiAccess: true,
  enableMobileApp: true,
  enableIntegrations: true,
  enableBulkOperations: true,
  enableExports: true,
  enableAdvancedReporting: true,
  enableAccessibility: true,
  enableAdvancedAccessibility: true,
  enableBetaFeatures: false,
  enableLocalization: true,
  enableMultitenancy: false,
  enableCustomization: true,
  enableAuditLogs: true,
  enableSecurityControls: true,
  enableAI: false,
  enableChat: true,
  enableFeedback: true,
  enableHelp: true,
  enableTutorials: true,
  enableScorm: false,
  enableCertificates: true,
  enableGamification: true,
  enableSso: true,
  enableWhiteLabeling: false,
  enableCustomFonts: true,
  enableCustomColors: true,
  enableCustomThemes: true,
  enableCustomWidgets: false,
  enableCustomFields: true,
  enableCustomValidation: true,
  enableCustomFilters: true,
  enableCustomSorting: true,
  enableCustomExports: true,
  enableCustomImports: true,
  enableCustomReports: true,
  enableCustomDashboard: true,
  enableCustomCharts: true,
  enableCustomNotifications: true,
  enableCustomEmails: true,
  enableCustomSms: false,
  enableCoreEditing: true
};

// Type guards
const isFeatureId = (id: string): id is FeatureId => {
  return id in defaultFeatures;
};

// The hook implementation
export const useFeature = (featureId: ExtendedFeatureId) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    // First try localStorage
    const storedFeatures = localStorage.getItem('app_features');
    if (storedFeatures) {
      try {
        const parsedFeatures = JSON.parse(storedFeatures);
        if (featureId in parsedFeatures) {
          return parsedFeatures[featureId];
        }
      } catch (error) {
        console.error('Error parsing stored features:', error);
      }
    }
    
    // Fallback to default values for known features
    if (isFeatureId(featureId)) {
      return defaultFeatures[featureId];
    }
    
    // For custom/unknown features, default to false
    return false;
  });

  // For the future: we might want to sync with the server or listen for updates
  useEffect(() => {
    // This could be enhanced to subscribe to real-time updates from a server
    const handleFeaturesUpdate = (event: StorageEvent) => {
      if (event.key === 'app_features') {
        try {
          const updatedFeatures = JSON.parse(event.newValue || '{}');
          if (featureId in updatedFeatures) {
            setIsEnabled(updatedFeatures[featureId]);
          }
        } catch (error) {
          console.error('Error handling feature update:', error);
        }
      }
    };

    window.addEventListener('storage', handleFeaturesUpdate);
    return () => {
      window.removeEventListener('storage', handleFeaturesUpdate);
    };
  }, [featureId]);

  return isEnabled;
};

// Helper to update features
export const updateFeature = (featureId: ExtendedFeatureId, enabled: boolean): void => {
  try {
    // Get current features
    const storedFeatures = localStorage.getItem('app_features');
    const features = storedFeatures ? JSON.parse(storedFeatures) : {};
    
    // Update the specified feature
    features[featureId] = enabled;
    
    // Save back to localStorage
    localStorage.setItem('app_features', JSON.stringify(features));
    
    // Dispatch a storage event for other tabs/windows
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'app_features',
      newValue: JSON.stringify(features)
    }));
  } catch (error) {
    console.error('Error updating feature:', error);
  }
};
