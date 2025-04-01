
import { FeatureId } from './types';

/**
 * Define dependencies between features
 * The key is the feature that depends on the values
 */
export const featureDependencies: Record<FeatureId, FeatureId[]> = {
  'user-management': [],
  'courses': ['user-management'],
  'gamification': ['courses'],
  'payment-system': ['user-management'],
  'certificates': ['courses'],
  'analytics': ['courses'],
  'community': ['user-management'],
  'theming': []
};

/**
 * Get all required dependencies for a feature
 * @param featureId The feature ID to check dependencies for
 * @returns Array of feature IDs that are required
 */
export const getFeatureDependencies = (featureId: FeatureId): FeatureId[] => {
  return featureDependencies[featureId] || [];
};

/**
 * Get all features that depend on a specific feature
 * @param featureId The feature ID to check dependents for
 * @returns Array of feature IDs that depend on the specified feature
 */
export const getFeatureDependents = (featureId: FeatureId): FeatureId[] => {
  return Object.entries(featureDependencies)
    .filter(([_, deps]) => deps.includes(featureId))
    .map(([id]) => id as FeatureId);
};
