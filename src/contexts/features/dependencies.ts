
export const featureDependencies = {
  // Core features
  authentication: ['database', 'email'],
  authorization: ['authentication', 'roles'],
  database: [],
  storage: ['database'],
  email: [],
  
  // UI features
  darkMode: [],
  responsiveDesign: [],
  animations: [],
  
  // User features
  userProfiles: ['authentication', 'storage'],
  userSettings: ['authentication', 'database'],
  userNotifications: ['authentication', 'email'],
  
  // Content features
  contentManagement: ['authentication', 'storage', 'database'],
  contentEditor: ['contentManagement'],
  mediaLibrary: ['storage', 'contentManagement'],
  
  // Learning features
  courses: ['contentManagement', 'userProfiles'],
  lessons: ['courses'],
  quizzes: ['lessons'],
  certificates: ['courses', 'userProfiles'],
  progress: ['courses', 'userProfiles', 'database'],
  
  // Community features
  comments: ['authentication', 'database'],
  forums: ['authentication', 'database', 'contentManagement'],
  chat: ['authentication', 'database'],
  
  // Admin features
  admin: ['authentication', 'authorization', 'database', 'userProfiles', 'contentManagement', 'analytics', 'dashboard', 'reports'],
  dashboard: ['authentication', 'database', 'analytics'],
  reports: ['authentication', 'database', 'analytics'],
  
  // Analytics features
  analytics: ['database', 'userProfiles', 'courses'],
  tracking: ['database', 'userProfiles'],
  
  // Payment features
  payments: ['authentication', 'database', 'email'],
  subscriptions: ['payments', 'userProfiles'],
  invoices: ['payments', 'userProfiles', 'email'],
  
  // Gamification features
  gamification: ['userProfiles', 'courses', 'progress'],
  badges: ['gamification'],
  leaderboards: ['gamification'],
  points: ['gamification'],
  
  // Integration features
  thirdPartyAuth: ['authentication'],
  apiIntegration: ['authentication', 'authorization'],
  webhooks: ['database', 'events'],
  
  // Advanced features
  ai: ['database', 'contentManagement'],
  recommendations: ['ai', 'userProfiles', 'courses'],
  search: ['database', 'contentManagement'],
  
  // System features
  logging: ['database'],
  monitoring: ['logging'],
  backup: ['database', 'storage'],
  caching: ['database'],
  
  // Development features
  devTools: [],
  testData: ['database'],
  documentation: []
};

// Helper functions to get dependencies and dependents
export const getFeatureDependencies = (feature: string): string[] => {
  return featureDependencies[feature as keyof typeof featureDependencies] || [];
};

export const getFeatureDependents = (feature: string): string[] => {
  const dependents: string[] = [];
  
  Object.entries(featureDependencies).forEach(([key, dependencies]) => {
    if (dependencies.includes(feature)) {
      dependents.push(key);
    }
  });
  
  return dependents;
};

export default featureDependencies;
