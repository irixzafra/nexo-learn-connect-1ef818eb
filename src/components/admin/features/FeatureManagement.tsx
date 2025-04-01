
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  RefreshCw,
  ToggleLeft,
  Paintbrush,
  Shield,
  Bell,
  Layout,
  Book,
  Database
} from 'lucide-react';
import FeatureAccordionGroup from './FeatureAccordionGroup';
import PlatformFeaturesAccordion from './PlatformFeaturesAccordion';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { defaultFeaturesConfig } from '@/contexts/features/types';

export const FeatureManagement: React.FC = () => {
  const { 
    featuresConfig, 
    toggleFeature, 
    isLoading,
    getFeatureDependencies,
    getFeatureDependents,
    updateFeatures
  } = useFeatures();
  
  const [showDisabled, setShowDisabled] = useState(false);
  const [showDependencies, setShowDependencies] = useState(false);
  
  const handleResetToDefaults = async () => {
    try {
      await updateFeatures(defaultFeaturesConfig);
      toast.success('Configuración restablecida a los valores predeterminados');
    } catch (error) {
      toast.error('Error al restablecer la configuración');
    }
  };
  
  // Helper to display dependency warnings
  const getDependencyWarning = (featureKey: keyof typeof featuresConfig) => {
    const dependencies = getFeatureDependencies(featureKey);
    if (dependencies.length === 0) return null;
    
    // Check if any dependency is disabled
    const disabledDependencies = dependencies.filter(
      (dep) => !featuresConfig[dep]
    );
    
    if (disabledDependencies.length === 0) return null;
    
    return (
      <div className="mt-2 text-xs bg-amber-50 text-amber-800 p-2 rounded-md flex gap-2 items-start">
        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <div>
          <span>Requiere activar:</span>
          <ul className="list-disc pl-4 mt-1">
            {disabledDependencies.map((dep) => (
              <li key={dep as string}>{dep as string}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  // Helper to display dependent features warnings
  const getDependentWarning = (featureKey: keyof typeof featuresConfig) => {
    if (!featuresConfig[featureKey]) return null;
    
    const dependents = getFeatureDependents(featureKey);
    if (dependents.length === 0) return null;
    
    // Find dependents that are enabled
    const enabledDependents = dependents.filter(
      (dep) => featuresConfig[dep]
    );
    
    if (enabledDependents.length === 0) return null;
    
    return (
      <div className="mt-2 text-xs bg-blue-50 text-blue-800 p-2 rounded-md flex gap-2 items-start">
        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <div>
          <span>Al desactivar esto también se desactivarán:</span>
          <ul className="list-disc pl-4 mt-1">
            {enabledDependents.map((dep) => (
              <li key={dep as string}>{dep as string}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ToggleLeft className="h-5 w-5 text-primary" />
            Gestión de Características
          </CardTitle>
          <CardDescription>
            Activa o desactiva características del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDisabled(!showDisabled)}
                className="gap-2 text-xs"
              >
                {showDisabled ? (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    Ver activas
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3.5 w-3.5" />
                    Ver todas
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDependencies(!showDependencies)}
                className="gap-2 text-xs"
              >
                {showDependencies ? "Ocultar dependencias" : "Mostrar dependencias"}
              </Button>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetToDefaults}
              disabled={isLoading}
              className="gap-2 text-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Restablecer
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <FeatureAccordionGroup
              title="Diseño y Apariencia"
              icon={<Paintbrush className="h-5 w-5" />}
              features={[
                {
                  id: "designSystemEnabled",
                  title: "Sistema de Diseño",
                  description: "Habilitar sistema de diseño personalizable",
                  checked: featuresConfig.designSystemEnabled,
                  onCheckedChange: (checked) => 
                    toggleFeature('designSystemEnabled', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('designSystemEnabled'),
                  dependent: getDependentWarning('designSystemEnabled'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableMultiLanguage",
                  title: "Multi-idioma",
                  description: "Soporte para múltiples idiomas",
                  checked: !!featuresConfig.enableMultiLanguage,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableMultiLanguage', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableMultiLanguage'),
                  dependent: getDependentWarning('enableMultiLanguage'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableEditMode",
                  title: "Modo de Edición",
                  description: "Edición visual de contenido",
                  checked: !!featuresConfig.enableEditMode,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableEditMode', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableEditMode'),
                  dependent: getDependentWarning('enableEditMode'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableThemeSwitcher",
                  title: "Selector de Temas",
                  description: "Cambio entre temas claro y oscuro",
                  checked: featuresConfig.enableThemeSwitcher,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableThemeSwitcher', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableThemeSwitcher'),
                  dependent: getDependentWarning('enableThemeSwitcher'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableAdvancedEditor",
                  title: "Editor Avanzado",
                  description: "Editor de contenido con más opciones",
                  checked: !!featuresConfig.enableAdvancedEditor,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableAdvancedEditor', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableAdvancedEditor'),
                  dependent: getDependentWarning('enableAdvancedEditor'),
                  showDependencies: showDependencies
                }
              ]}
            />
            
            <FeatureAccordionGroup
              title="Usuarios y Permisos"
              icon={<Shield className="h-5 w-5" />}
              features={[
                {
                  id: "enableRoleSwitcher",
                  title: "Selector de Rol",
                  description: "Cambiar entre roles de usuario",
                  checked: featuresConfig.enableRoleSwitcher,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableRoleSwitcher', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableRoleSwitcher'),
                  dependent: getDependentWarning('enableRoleSwitcher'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableRoleManagement",
                  title: "Gestión de Roles",
                  description: "Administrar roles y permisos",
                  checked: featuresConfig.enableRoleManagement,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableRoleManagement', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableRoleManagement'),
                  dependent: getDependentWarning('enableRoleManagement'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableInvitations",
                  title: "Invitaciones",
                  description: "Sistema de invitaciones de usuarios",
                  checked: !!featuresConfig.enableInvitations,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableInvitations', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableInvitations'),
                  dependent: getDependentWarning('enableInvitations'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableCustomRoles",
                  title: "Roles Personalizados",
                  description: "Crear roles personalizados",
                  checked: !!featuresConfig.enableCustomRoles,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableCustomRoles', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableCustomRoles'),
                  dependent: getDependentWarning('enableCustomRoles'),
                  showDependencies: showDependencies
                }
              ]}
            />
            
            <FeatureAccordionGroup
              title="Contenido y Categorías"
              icon={<Layout className="h-5 w-5" />}
              features={[
                {
                  id: "enableContentReordering",
                  title: "Reordenación de Contenido",
                  description: "Reordenar contenido via drag & drop",
                  checked: featuresConfig.enableContentReordering,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableContentReordering', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableContentReordering'),
                  dependent: getDependentWarning('enableContentReordering'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableCategoryManagement",
                  title: "Gestión de Categorías",
                  description: "Sistema avanzado de categorías",
                  checked: featuresConfig.enableCategoryManagement,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableCategoryManagement', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableCategoryManagement'),
                  dependent: getDependentWarning('enableCategoryManagement'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableLeaderboard",
                  title: "Tabla de Clasificación",
                  description: "Sistema de clasificación de usuarios",
                  checked: !!featuresConfig.enableLeaderboard,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableLeaderboard', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableLeaderboard'),
                  dependent: getDependentWarning('enableLeaderboard'),
                  showDependencies: showDependencies
                }
              ]}
            />
            
            <FeatureAccordionGroup
              title="Notificaciones"
              icon={<Bell className="h-5 w-5" />}
              features={[
                {
                  id: "enableNotifications",
                  title: "Sistema de Notificaciones",
                  description: "Sistema de notificaciones básicas",
                  checked: featuresConfig.enableNotifications,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableNotifications', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableNotifications'),
                  dependent: getDependentWarning('enableNotifications'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableRealTimeNotifications",
                  title: "Notificaciones en Tiempo Real",
                  description: "Notificaciones push instantáneas",
                  checked: !!featuresConfig.enableRealTimeNotifications,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableRealTimeNotifications', checked),
                  disabled: isLoading || !featuresConfig.enableNotifications,
                  warning: getDependencyWarning('enableRealTimeNotifications'),
                  dependent: getDependentWarning('enableRealTimeNotifications'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableEmailNotifications",
                  title: "Notificaciones por Email",
                  description: "Envío de emails de notificación",
                  checked: !!featuresConfig.enableEmailNotifications,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableEmailNotifications', checked),
                  disabled: isLoading || !featuresConfig.enableNotifications,
                  warning: getDependencyWarning('enableEmailNotifications'),
                  dependent: getDependentWarning('enableEmailNotifications'),
                  showDependencies: showDependencies
                }
              ]}
            />
            
            <FeatureAccordionGroup
              title="Seguridad"
              icon={<Shield className="h-5 w-5" />}
              features={[
                {
                  id: "enable2FA",
                  title: "Autenticación 2FA",
                  description: "Autenticación de dos factores",
                  checked: !!featuresConfig.enable2FA,
                  onCheckedChange: (checked) => 
                    toggleFeature('enable2FA', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enable2FA'),
                  dependent: getDependentWarning('enable2FA'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableMultipleSessions",
                  title: "Sesiones Múltiples",
                  description: "Permitir múltiples sesiones",
                  checked: !!featuresConfig.enableMultipleSessions,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableMultipleSessions', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableMultipleSessions'),
                  dependent: getDependentWarning('enableMultipleSessions'),
                  showDependencies: showDependencies
                },
                {
                  id: "requireEmailVerification",
                  title: "Verificación de Email",
                  description: "Verificación obligatoria de email",
                  checked: !!featuresConfig.requireEmailVerification,
                  onCheckedChange: (checked) => 
                    toggleFeature('requireEmailVerification', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('requireEmailVerification'),
                  dependent: getDependentWarning('requireEmailVerification'),
                  showDependencies: showDependencies
                },
                {
                  id: "enablePublicRegistration",
                  title: "Registro Público",
                  description: "Permitir registro público",
                  checked: !!featuresConfig.enablePublicRegistration,
                  onCheckedChange: (checked) => 
                    toggleFeature('enablePublicRegistration', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enablePublicRegistration'),
                  dependent: getDependentWarning('enablePublicRegistration'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableActivityLog",
                  title: "Registro de Actividad",
                  description: "Log de actividad de usuarios",
                  checked: !!featuresConfig.enableActivityLog,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableActivityLog', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableActivityLog'),
                  dependent: getDependentWarning('enableActivityLog'),
                  showDependencies: showDependencies
                }
              ]}
            />
            
            <FeatureAccordionGroup
              title="Integración y APIs"
              icon={<Database className="h-5 w-5" />}
              features={[
                {
                  id: "enableAI",
                  title: "Inteligencia Artificial",
                  description: "Integración con IA",
                  checked: !!featuresConfig.enableAI,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableAI', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableAI'),
                  dependent: getDependentWarning('enableAI'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableLeaderboard",
                  title: "Tabla de Clasificación",
                  description: "Sistema de gamificación",
                  checked: !!featuresConfig.enableLeaderboard,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableLeaderboard', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableLeaderboard'),
                  dependent: getDependentWarning('enableLeaderboard'),
                  showDependencies: showDependencies
                },
                {
                  id: "enablePublicApi",
                  title: "API Pública",
                  description: "Acceso a API para desarrolladores",
                  checked: !!featuresConfig.enablePublicApi,
                  onCheckedChange: (checked) => 
                    toggleFeature('enablePublicApi', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enablePublicApi'),
                  dependent: getDependentWarning('enablePublicApi'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableWebhooks",
                  title: "Webhooks",
                  description: "Integración con webhooks",
                  checked: !!featuresConfig.enableWebhooks,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableWebhooks', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableWebhooks'),
                  dependent: getDependentWarning('enableWebhooks'),
                  showDependencies: showDependencies
                }
              ]}
            />
            
            <FeatureAccordionGroup
              title="Onboarding y Ayuda"
              icon={<Book className="h-5 w-5" />}
              features={[
                {
                  id: "enableOnboardingSystem",
                  title: "Sistema de Onboarding",
                  description: "Tutorial de introducción",
                  checked: featuresConfig.enableOnboardingSystem,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableOnboardingSystem', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableOnboardingSystem'),
                  dependent: getDependentWarning('enableOnboardingSystem'),
                  showDependencies: showDependencies
                },
                {
                  id: "showOnboardingTrigger",
                  title: "Botón de Onboarding",
                  description: "Mostrar acceso a tutorial",
                  checked: featuresConfig.showOnboardingTrigger,
                  onCheckedChange: (checked) => 
                    toggleFeature('showOnboardingTrigger', checked),
                  disabled: isLoading || !featuresConfig.enableOnboardingSystem,
                  warning: getDependencyWarning('showOnboardingTrigger'),
                  dependent: getDependentWarning('showOnboardingTrigger'),
                  showDependencies: showDependencies
                },
                {
                  id: "autoStartOnboarding",
                  title: "Onboarding Automático",
                  description: "Iniciar tutorial automáticamente",
                  checked: featuresConfig.autoStartOnboarding,
                  onCheckedChange: (checked) => 
                    toggleFeature('autoStartOnboarding', checked),
                  disabled: isLoading || !featuresConfig.enableOnboardingSystem,
                  warning: getDependencyWarning('autoStartOnboarding'),
                  dependent: getDependentWarning('autoStartOnboarding'),
                  showDependencies: showDependencies
                }
              ]}
            />
            
            <FeatureAccordionGroup
              title="Desarrollo y Herramientas"
              icon={<Database className="h-5 w-5" />}
              features={[
                {
                  id: "enableDatabaseDevMode",
                  title: "Modo Desarrollo DB",
                  description: "Herramientas de desarrollo DB",
                  checked: !!featuresConfig.enableDatabaseDevMode,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableDatabaseDevMode', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableDatabaseDevMode'),
                  dependent: getDependentWarning('enableDatabaseDevMode'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableAutoBackups",
                  title: "Respaldos Automáticos",
                  description: "Respaldos programados",
                  checked: !!featuresConfig.enableAutoBackups,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableAutoBackups', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableAutoBackups'),
                  dependent: getDependentWarning('enableAutoBackups'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableQueryCache",
                  title: "Caché de Consultas",
                  description: "Mejorar rendimiento",
                  checked: !!featuresConfig.enableQueryCache,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableQueryCache', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableQueryCache'),
                  dependent: getDependentWarning('enableQueryCache'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableMaintenanceMode",
                  title: "Modo Mantenimiento",
                  description: "Bloquear acceso a usuarios",
                  checked: !!featuresConfig.enableMaintenanceMode,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableMaintenanceMode', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableMaintenanceMode'),
                  dependent: getDependentWarning('enableMaintenanceMode'),
                  showDependencies: showDependencies
                },
                {
                  id: "enableTestDataGenerator",
                  title: "Datos de Prueba",
                  description: "Generador de datos de prueba",
                  checked: featuresConfig.enableTestDataGenerator,
                  onCheckedChange: (checked) => 
                    toggleFeature('enableTestDataGenerator', checked),
                  disabled: isLoading,
                  warning: getDependencyWarning('enableTestDataGenerator'),
                  dependent: getDependentWarning('enableTestDataGenerator'),
                  showDependencies: showDependencies
                }
              ]}
            />
          </div>
        </CardContent>
      </Card>
      
      <PlatformFeaturesAccordion />
    </div>
  );
};
