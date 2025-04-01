
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CoreFeatureId, ExtendedFeatureId, FeatureId, Feature, FeaturesContextProps, FeaturesConfig, defaultFeaturesConfig } from './types';
import { getFeatureDependencies, getFeatureDependents } from './dependencies';
import { toast } from 'sonner';

// Default features configuration
const defaultFeatures: Record<CoreFeatureId, Feature> = {
  'user-management': {
    id: 'user-management',
    name: 'Gestión de Usuarios',
    description: 'Sistema de registro, autenticación y gestión de usuarios',
    enabled: true,
    isCore: true
  },
  'courses': {
    id: 'courses',
    name: 'Cursos',
    description: 'Funcionalidades para crear y gestionar cursos en la plataforma',
    enabled: true,
    isCore: true
  },
  'gamification': {
    id: 'gamification',
    name: 'Gamificación',
    description: 'Sistema de puntos, logros y recompensas para aumentar la motivación',
    enabled: false
  },
  'payment-system': {
    id: 'payment-system',
    name: 'Sistema de Pagos',
    description: 'Procesamiento de pagos y suscripciones',
    enabled: false
  },
  'certificates': {
    id: 'certificates',
    name: 'Certificados',
    description: 'Generación y verificación de certificados para cursos completados',
    enabled: true
  },
  'analytics': {
    id: 'analytics',
    name: 'Analítica',
    description: 'Análisis de rendimiento y comportamiento de usuarios',
    enabled: false
  },
  'community': {
    id: 'community',
    name: 'Comunidad',
    description: 'Foros, grupos y mensajería entre usuarios',
    enabled: false
  },
  'theming': {
    id: 'theming',
    name: 'Temas y Personalización',
    description: 'Personalización avanzada de la apariencia de la plataforma',
    enabled: false
  }
};

export const FeaturesContext = createContext<FeaturesContextProps | undefined>(undefined);

interface FeaturesProviderProps {
  children: React.ReactNode;
  initialFeatures?: Partial<Record<CoreFeatureId, Feature>>;
}

export const FeaturesProvider: React.FC<FeaturesProviderProps> = ({ 
  children, 
  initialFeatures = {} 
}) => {
  // Merge default features with any provided initial features
  const [features, setFeatures] = useState<Record<CoreFeatureId, Feature>>(() => {
    const merged = { ...defaultFeatures };
    
    Object.entries(initialFeatures).forEach(([id, feature]) => {
      if (id in merged) {
        merged[id as CoreFeatureId] = { ...merged[id as CoreFeatureId], ...feature };
      }
    });
    
    return merged;
  });

  // Extended feature flags with boolean values
  const [extendedFeatures, setExtendedFeatures] = useState<Record<ExtendedFeatureId, boolean>>({
    enableDarkMode: false,
    enableNotifications: true,
    enableAnalytics: false,
    enableFeedback: true,
    enableUserRegistration: true,
    enableSocialLogin: false,
    enablePublicProfiles: false,
    designSystemEnabled: true,
    enableThemeSwitcher: true,
    enableMultiLanguage: false,
    enableAdvancedEditor: false,
    enableContentReordering: false,
    enableCategoryManagement: false,
    enableLeaderboard: false,
    enableAutoBackups: false,
    enableQueryCache: false,
    enableMaintenanceMode: false,
    enableDatabaseDevMode: false,
    enable2FA: false,
    enableMultipleSessions: true,
    enablePublicRegistration: true,
    requireEmailVerification: true,
    enableActivityLog: false,
    enableTestDataGenerator: true,
    enableOnboarding: true,
    enableContextualHelp: true,
    requireOnboarding: false,
    autoStartOnboarding: true,
    showOnboardingTrigger: true,
    enableRoleManagement: true,
    enableRoleSwitcher: false
  });

  // Loading state for async operations
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load features from localStorage on mount
  useEffect(() => {
    try {
      const savedFeatures = localStorage.getItem('app_features');
      if (savedFeatures) {
        const parsedFeatures = JSON.parse(savedFeatures);
        setFeatures(currentFeatures => {
          const updatedFeatures = { ...currentFeatures };
          
          // Only update enabled status, keep other properties from default
          Object.keys(parsedFeatures).forEach(key => {
            if (key in updatedFeatures) {
              updatedFeatures[key as CoreFeatureId].enabled = parsedFeatures[key].enabled;
            }
          });
          
          return updatedFeatures;
        });

        // Load extended features
        const savedExtendedFeatures = localStorage.getItem('app_extended_features');
        if (savedExtendedFeatures) {
          setExtendedFeatures(prev => ({
            ...prev,
            ...JSON.parse(savedExtendedFeatures)
          }));
        }
      }
    } catch (error) {
      console.error('Error loading features from localStorage:', error);
    }
  }, []);
  
  // Save features to localStorage whenever they change
  useEffect(() => {
    try {
      // Only save the id and enabled status to keep localStorage size small
      const featuresToSave = Object.entries(features).reduce((acc, [id, feature]) => {
        acc[id] = { enabled: feature.enabled };
        return acc;
      }, {} as Record<string, { enabled: boolean }>);
      
      localStorage.setItem('app_features', JSON.stringify(featuresToSave));
      localStorage.setItem('app_extended_features', JSON.stringify(extendedFeatures));
    } catch (error) {
      console.error('Error saving features to localStorage:', error);
    }
  }, [features, extendedFeatures]);
  
  // Utility function to check if a feature is enabled
  const isEnabled = (featureId: FeatureId): boolean => {
    // First check if it's a core feature
    if (featureId in features) {
      return features[featureId as CoreFeatureId]?.enabled || false;
    }
    // Then check if it's an extended feature
    return extendedFeatures[featureId as ExtendedFeatureId] || false;
  };

  // Check if a feature flag is enabled
  const isFeatureEnabled = (featureFlag: ExtendedFeatureId): boolean => {
    return extendedFeatures[featureFlag] || false;
  };
  
  // Get a feature by ID
  const getFeature = (featureId: FeatureId): Feature | undefined => {
    if (featureId in features) {
      return features[featureId as CoreFeatureId];
    }
    return undefined;
  };
  
  // Enable a feature and its dependencies
  const enableFeature = (featureId: FeatureId) => {
    if (featureId in features) {
      setFeatures(prev => {
        // If already enabled, no change needed
        if (prev[featureId as CoreFeatureId]?.enabled) return prev;
        
        const updated = { ...prev };
        
        // Get all dependencies
        const dependencies = getFeatureDependencies(featureId);
        
        // Check if all dependencies are enabled
        const missingDeps = dependencies.filter(depId => {
          if (depId in prev) {
            return !prev[depId as CoreFeatureId]?.enabled;
          }
          return !extendedFeatures[depId as ExtendedFeatureId];
        });
        
        if (missingDeps.length > 0) {
          // Also enable dependencies
          missingDeps.forEach(depId => {
            if (depId in updated) {
              updated[depId as CoreFeatureId] = { ...updated[depId as CoreFeatureId], enabled: true };
            } else if (depId in extendedFeatures) {
              setExtendedFeatures(prev => ({
                ...prev,
                [depId as ExtendedFeatureId]: true
              }));
            }
          });
          
          const depNames = missingDeps.map(depId => {
            if (depId in prev) {
              return prev[depId as CoreFeatureId]?.name || depId;
            }
            return depId;
          }).join(', ');
          
          toast.info(`También se activaron las dependencias: ${depNames}`);
        }
        
        // Enable the feature itself
        updated[featureId as CoreFeatureId] = { ...updated[featureId as CoreFeatureId], enabled: true };
        
        return updated;
      });
    } else if (featureId in extendedFeatures) {
      // Handle extended feature enablement
      setExtendedFeatures(prev => {
        if (prev[featureId as ExtendedFeatureId]) return prev;
        
        // Check dependencies
        const dependencies = getFeatureDependencies(featureId);
        const missingDeps = dependencies.filter(depId => !isEnabled(depId));
        
        if (missingDeps.length > 0) {
          // Enable dependencies
          missingDeps.forEach(depId => {
            if (depId in features) {
              setFeatures(prevF => ({
                ...prevF,
                [depId as CoreFeatureId]: { 
                  ...prevF[depId as CoreFeatureId], 
                  enabled: true 
                }
              }));
            } else if (depId in extendedFeatures) {
              // This will be handled in the return below
            }
          });
          
          const depNames = missingDeps.join(', ');
          toast.info(`También se activaron las dependencias: ${depNames}`);
        }
        
        return {
          ...prev,
          [featureId as ExtendedFeatureId]: true,
          ...missingDeps.reduce((acc, depId) => {
            if (depId in extendedFeatures) {
              acc[depId as ExtendedFeatureId] = true;
            }
            return acc;
          }, {} as Record<ExtendedFeatureId, boolean>)
        };
      });
    }
  };
  
  // Disable a feature (if possible)
  const disableFeature = (featureId: FeatureId) => {
    if (featureId in features) {
      setFeatures(prev => {
        // If already disabled or is a core feature, no change needed
        if (!prev[featureId as CoreFeatureId]?.enabled || prev[featureId as CoreFeatureId]?.isCore) return prev;
        
        const updated = { ...prev };
        
        // Get all dependents
        const dependents = getFeatureDependents(featureId);
        
        // Check if any enabled features depend on this one
        const activeDependents = dependents.filter(depId => isEnabled(depId));
        
        if (activeDependents.length > 0) {
          // Cannot disable because others depend on it
          const depNames = activeDependents.map(depId => {
            if (depId in prev) {
              return prev[depId as CoreFeatureId]?.name || depId;
            }
            return depId;
          }).join(', ');
          
          toast.error(`No se puede desactivar. Primero desactive: ${depNames}`);
          return prev;
        }
        
        // If we got here, it's safe to disable
        updated[featureId as CoreFeatureId] = { ...updated[featureId as CoreFeatureId], enabled: false };
        
        return updated;
      });
    } else if (featureId in extendedFeatures) {
      // Handle extended feature disablement
      const dependents = getFeatureDependents(featureId);
      const activeDependents = dependents.filter(depId => isEnabled(depId));
      
      if (activeDependents.length > 0) {
        toast.error(`No se puede desactivar. Primero desactive: ${activeDependents.join(', ')}`);
        return;
      }
      
      setExtendedFeatures(prev => ({
        ...prev,
        [featureId as ExtendedFeatureId]: false
      }));
    }
  };
  
  // Toggle a feature
  const toggleFeature = (featureId: FeatureId) => {
    if (isEnabled(featureId)) {
      disableFeature(featureId);
    } else {
      enableFeature(featureId);
    }
  };

  // Toggle extended feature with promise
  const toggleExtendedFeature = async (featureFlag: ExtendedFeatureId, value: boolean): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setExtendedFeatures(prev => ({
        ...prev,
        [featureFlag]: value
      }));
      
      toast.success(`Característica "${String(featureFlag)}" ${value ? 'activada' : 'desactivada'}`);
      return Promise.resolve();
    } catch (error) {
      console.error('Error toggling feature:', error);
      setError(`Error al cambiar el estado de "${String(featureFlag)}"`);
      toast.error(`Error al cambiar el estado de "${String(featureFlag)}"`);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update multiple features at once
  const updateFeatures = async (newConfig: Partial<FeaturesConfig>): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update core features if present
      if (newConfig.features) {
        setFeatures(prev => ({
          ...prev,
          ...newConfig.features as Record<CoreFeatureId, Feature>
        }));
      }
      
      // Update extended features
      const extendedUpdates: Partial<Record<ExtendedFeatureId, boolean>> = {};
      Object.entries(newConfig).forEach(([key, value]) => {
        if (key !== 'features' && typeof value === 'boolean') {
          extendedUpdates[key as ExtendedFeatureId] = value;
        }
      });
      
      if (Object.keys(extendedUpdates).length > 0) {
        setExtendedFeatures(prev => ({
          ...prev,
          ...extendedUpdates as Record<ExtendedFeatureId, boolean>
        }));
      }
      
      toast.success("Configuración actualizada correctamente");
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating features:', error);
      setError("Error al actualizar la configuración");
      toast.error("Error al actualizar la configuración");
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Combine features and extended features for the complete config
  const featuresConfig: FeaturesConfig = useMemo(() => {
    const config = {
      features,
      ...extendedFeatures
    };
    return config;
  }, [features, extendedFeatures]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    features,
    isEnabled,
    enableFeature,
    disableFeature,
    toggleFeature,
    getFeature,
    // Extended feature handling
    featuresConfig,
    isFeatureEnabled,
    toggleExtendedFeature,
    updateFeatures,
    isLoading,
    error
  }), [features, extendedFeatures, featuresConfig, isLoading, error]);
  
  return (
    <FeaturesContext.Provider value={contextValue}>
      {children}
    </FeaturesContext.Provider>
  );
};

export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  if (context === undefined) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  return context;
};
