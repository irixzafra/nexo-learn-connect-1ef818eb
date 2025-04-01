import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { FeatureId, Feature, FeaturesContextProps } from './types';
import { getFeatureDependencies, getFeatureDependents } from './dependencies';
import { toast } from 'sonner';

// Default features configuration
const defaultFeatures: Record<FeatureId, Feature> = {
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
  initialFeatures?: Partial<Record<FeatureId, Feature>>;
}

export const FeaturesProvider: React.FC<FeaturesProviderProps> = ({ 
  children, 
  initialFeatures = {} 
}) => {
  // Merge default features with any provided initial features
  const [features, setFeatures] = useState<Record<FeatureId, Feature>>(() => {
    const merged = { ...defaultFeatures };
    
    Object.entries(initialFeatures).forEach(([id, feature]) => {
      if (id in merged) {
        merged[id as FeatureId] = { ...merged[id as FeatureId], ...feature };
      }
    });
    
    return merged;
  });
  
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
              updatedFeatures[key as FeatureId].enabled = parsedFeatures[key].enabled;
            }
          });
          
          return updatedFeatures;
        });
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
    } catch (error) {
      console.error('Error saving features to localStorage:', error);
    }
  }, [features]);
  
  // Utility function to check if a feature is enabled
  const isEnabled = (featureId: FeatureId): boolean => {
    return features[featureId]?.enabled || false;
  };
  
  // Get a feature by ID
  const getFeature = (featureId: FeatureId): Feature | undefined => {
    return features[featureId];
  };
  
  // Enable a feature and its dependencies
  const enableFeature = (featureId: FeatureId) => {
    setFeatures(prev => {
      // If already enabled, no change needed
      if (prev[featureId]?.enabled) return prev;
      
      const updated = { ...prev };
      
      // Get all dependencies
      const dependencies = getFeatureDependencies(featureId);
      
      // Check if all dependencies are enabled
      const missingDeps = dependencies.filter(depId => !prev[depId]?.enabled);
      
      if (missingDeps.length > 0) {
        // Also enable dependencies
        missingDeps.forEach(depId => {
          updated[depId] = { ...updated[depId], enabled: true };
        });
        
        const depNames = missingDeps.map(depId => prev[depId]?.name || depId).join(', ');
        toast.info(`También se activaron las dependencias: ${depNames}`);
      }
      
      // Enable the feature itself
      updated[featureId] = { ...updated[featureId], enabled: true };
      
      return updated;
    });
  };
  
  // Disable a feature (if possible)
  const disableFeature = (featureId: FeatureId) => {
    setFeatures(prev => {
      // If already disabled or is a core feature, no change needed
      if (!prev[featureId]?.enabled || prev[featureId]?.isCore) return prev;
      
      const updated = { ...prev };
      
      // Get all dependents
      const dependents = getFeatureDependents(featureId);
      
      // Check if any enabled features depend on this one
      const activeDependents = dependents.filter(depId => prev[depId]?.enabled);
      
      if (activeDependents.length > 0) {
        // Cannot disable because others depend on it
        const depNames = activeDependents.map(depId => prev[depId]?.name || depId).join(', ');
        toast.error(`No se puede desactivar. Primero desactive: ${depNames}`);
        return prev;
      }
      
      // If we got here, it's safe to disable
      updated[featureId] = { ...updated[featureId], enabled: false };
      
      return updated;
    });
  };
  
  // Toggle a feature
  const toggleFeature = (featureId: FeatureId) => {
    if (isEnabled(featureId)) {
      disableFeature(featureId);
    } else {
      enableFeature(featureId);
    }
  };
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    features,
    isEnabled,
    enableFeature,
    disableFeature,
    toggleFeature,
    getFeature
  }), [features]);
  
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
