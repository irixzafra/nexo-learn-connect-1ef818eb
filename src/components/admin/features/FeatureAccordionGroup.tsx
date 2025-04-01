import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { FeaturesConfig, FeatureId } from '@/contexts/features/types';
import { getFeatureDependencies } from '@/contexts/features/dependencies';
import { Badge } from "@/components/ui/badge";
import InfoTooltip from '@/components/ui/info-tooltip';

export interface FeatureAccordionGroupProps {
  features: FeaturesConfig;
  onToggleFeature: (key: keyof FeaturesConfig, value: boolean) => void;
}

const FeatureAccordionGroup: React.FC<FeatureAccordionGroupProps> = ({ features, onToggleFeature }) => {
  const featureDescriptions: Partial<Record<keyof FeaturesConfig, string>> = {
    // Interface
    enableDarkMode: "Permite a los usuarios cambiar entre temas claro y oscuro",
    enableNotifications: "Habilita el sistema de notificaciones en la plataforma",
    enableAnalytics: "Recopila datos anónimos de uso para mejorar la plataforma",
    enableFeedback: "Permite a los usuarios enviar comentarios sobre la plataforma",
    
    // User features
    enableUserRegistration: "Habilita el registro de nuevos usuarios",
    enableSocialLogin: "Permite iniciar sesión con cuentas de redes sociales",
    enablePublicProfiles: "Hace que los perfiles de usuario sean visibles públicamente",
    
    // Design system
    designSystemEnabled: "Activa el sistema de diseño personalizable",
    enableThemeSwitcher: "Permite a los usuarios cambiar entre diferentes temas visuales",
    enableMultiLanguage: "Habilita la funcionalidad multi-idioma en la plataforma",
    
    // Content features
    enableAdvancedEditor: "Activa el editor avanzado con más opciones de formato",
    enableContentReordering: "Permite reorganizar el contenido mediante arrastrar y soltar",
    enableCategoryManagement: "Habilita la gestión de categorías para el contenido",
    enableLeaderboard: "Muestra una tabla de clasificación de usuarios basada en puntos",
    
    // Technical features
    enableAutoBackups: "Realiza copias de seguridad automáticas de los datos",
    enableQueryCache: "Almacena en caché las consultas para mejorar el rendimiento",
    enableMaintenanceMode: "Permite activar el modo de mantenimiento",
    enableDatabaseDevMode: "Habilita herramientas avanzadas para desarrolladores de base de datos",
    
    // Security features
    enable2FA: "Activa la autenticación de dos factores para mayor seguridad",
    enableMultipleSessions: "Permite iniciar sesión en múltiples dispositivos a la vez",
    enablePublicRegistration: "Permite que cualquier persona se registre sin invitación",
    requireEmailVerification: "Requiere verificación de email antes de activar cuentas",
    enableActivityLog: "Registra todas las acciones de los usuarios para auditoría",
    
    // Development features
    enableTestDataGenerator: "Permite generar datos de prueba para desarrollo",
    
    // Onboarding features
    enableOnboarding: "Activa el sistema de introducción para nuevos usuarios",
    enableContextualHelp: "Muestra ayuda contextual en diferentes partes de la plataforma",
    requireOnboarding: "Obliga a completar el proceso de introducción",
    autoStartOnboarding: "Inicia automáticamente el proceso de introducción para nuevos usuarios",
    showOnboardingTrigger: "Muestra un botón para volver a iniciar el proceso de introducción",
    
    // Role management
    enableRoleManagement: "Habilita la gestión avanzada de roles de usuario",
    enableRoleSwitcher: "Permite a los administradores cambiar temporalmente su rol"
  };

  // Feature grouping
  const interfaceFeatures: (keyof FeaturesConfig)[] = [
    'enableDarkMode', 'enableNotifications', 'enableAnalytics', 'enableFeedback'
  ];
  
  const userFeatures: (keyof FeaturesConfig)[] = [
    'enableUserRegistration', 'enableSocialLogin', 'enablePublicProfiles'
  ];
  
  const designFeatures: (keyof FeaturesConfig)[] = [
    'designSystemEnabled', 'enableThemeSwitcher', 'enableMultiLanguage'
  ];
  
  const contentFeatures: (keyof FeaturesConfig)[] = [
    'enableAdvancedEditor', 'enableContentReordering', 'enableCategoryManagement', 'enableLeaderboard'
  ];
  
  const technicalFeatures: (keyof FeaturesConfig)[] = [
    'enableAutoBackups', 'enableQueryCache', 'enableMaintenanceMode', 'enableDatabaseDevMode'
  ];
  
  const securityFeatures: (keyof FeaturesConfig)[] = [
    'enable2FA', 'enableMultipleSessions', 'enablePublicRegistration', 
    'requireEmailVerification', 'enableActivityLog'
  ];
  
  const developmentFeatures: (keyof FeaturesConfig)[] = [
    'enableTestDataGenerator'
  ];
  
  const onboardingFeatures: (keyof FeaturesConfig)[] = [
    'enableOnboarding', 'enableContextualHelp', 'requireOnboarding', 
    'autoStartOnboarding', 'showOnboardingTrigger'
  ];
  
  const roleFeatures: (keyof FeaturesConfig)[] = [
    'enableRoleManagement', 'enableRoleSwitcher'
  ];

  // Check if a feature can be enabled based on dependencies
  const canBeEnabled = (featureKey: string): boolean => {
    const dependencies = getFeatureDependencies(featureKey as FeatureId);
    return dependencies.every(dep => !!features[dep]);
  };

  // Render feature group
  const renderFeatureGroup = (
    groupTitle: string, 
    featureKeys: (keyof FeaturesConfig)[]
  ) => {
    return (
      <AccordionItem value={groupTitle.toLowerCase().replace(/\s/g, '-')}>
        <AccordionTrigger className="hover:bg-muted/50 px-4 py-2 rounded-md">
          {groupTitle}
        </AccordionTrigger>
        <AccordionContent className="px-2">
          <div className="space-y-4 py-2">
            {featureKeys.map(key => {
              const isDisabled = !canBeEnabled(key as string);
              const dependencies = getFeatureDependencies(key as FeatureId);
              
              return (
                <div key={key} className="flex items-center justify-between py-1">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {key}
                      </span>
                      {dependencies.length > 0 && (
                        <InfoTooltip content={
                          <div className="text-xs">
                            <p className="font-medium mb-1">Dependencias:</p>
                            <ul className="list-disc pl-4">
                              {dependencies.map(dep => (
                                <li key={dep}>{dep}</li>
                              ))}
                            </ul>
                          </div>
                        } />
                      )}
                      {isDisabled && (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          Requiere dependencias
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {featureDescriptions[key] || ""}
                    </p>
                  </div>
                  <Switch
                    checked={!!features[key]}
                    onCheckedChange={(checked) => onToggleFeature(key, checked)}
                    disabled={isDisabled}
                  />
                </div>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <Accordion type="multiple" className="w-full" defaultValue={["interface"]}>
      {renderFeatureGroup("Interfaz", interfaceFeatures)}
      {renderFeatureGroup("Usuarios", userFeatures)}
      {renderFeatureGroup("Diseño", designFeatures)}
      {renderFeatureGroup("Contenido", contentFeatures)}
      {renderFeatureGroup("Técnico", technicalFeatures)}
      {renderFeatureGroup("Seguridad", securityFeatures)}
      {renderFeatureGroup("Desarrollo", developmentFeatures)}
      {renderFeatureGroup("Onboarding", onboardingFeatures)}
      {renderFeatureGroup("Roles", roleFeatures)}
    </Accordion>
  );
};

export default FeatureAccordionGroup;
