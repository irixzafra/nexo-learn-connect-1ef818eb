
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FeaturesConfig } from '@/contexts/features/types';
import { useFeatureDependencies } from '@/hooks/useFeatureDependencies';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { LockIcon } from 'lucide-react';

// Descripción de las características por grupo
const featureDescriptions: Record<string, Record<keyof FeaturesConfig, string>> = {
  general: {
    enableDarkMode: "Permite cambiar entre temas claro y oscuro",
    enableNotifications: "Habilita el sistema de notificaciones en la plataforma",
    enableAnalytics: "Recopilación de datos de uso para análisis",
    enableFeedback: "Permite a los usuarios enviar comentarios y sugerencias"
  },
  user: {
    enableUserRegistration: "Permite que los usuarios se registren en la plataforma",
    enableSocialLogin: "Habilita inicio de sesión con redes sociales",
    enablePublicProfiles: "Permite perfiles públicos para los usuarios"
  },
  design: {
    designSystemEnabled: "Habilita el sistema de diseño unificado",
    enableThemeSwitcher: "Permite cambiar entre diferentes temas visuales",
    enableMultiLanguage: "Soporte para múltiples idiomas"
  },
  content: {
    enableAdvancedEditor: "Editor avanzado con más opciones de formato",
    enableContentReordering: "Permite reordenar el contenido mediante arrastrar y soltar",
    enableCategoryManagement: "Gestión avanzada de categorías para el contenido",
    enableLeaderboard: "Muestra una tabla de clasificación para usuarios"
  },
  data: {
    enableAutoBackups: "Copias de seguridad automáticas de los datos",
    enableQueryCache: "Caché de consultas para mejor rendimiento",
    enableMaintenanceMode: "Modo de mantenimiento para realizar actualizaciones",
    enableDatabaseDevMode: "Herramientas de desarrollo para la base de datos"
  },
  security: {
    enable2FA: "Autenticación de dos factores para mayor seguridad",
    enableMultipleSessions: "Permite múltiples sesiones activas para un usuario",
    enablePublicRegistration: "Registro público abierto (sin invitación)",
    requireEmailVerification: "Requiere verificación de email para nuevas cuentas",
    enableActivityLog: "Registro de actividad de los usuarios"
  },
  testing: {
    enableTestDataGenerator: "Herramienta para generar datos de prueba"
  },
  onboarding: {
    enableOnboarding: "Habilita el sistema de iniciación para nuevos usuarios",
    enableContextualHelp: "Ayuda contextual en diferentes partes de la aplicación",
    requireOnboarding: "Hace obligatorio completar el proceso de iniciación",
    autoStartOnboarding: "Inicia automáticamente el proceso de iniciación",
    showOnboardingTrigger: "Muestra un botón para iniciar el proceso de iniciación"
  }
};

interface FeatureGroupConfig {
  id: string;
  title: string;
  features: Array<keyof FeaturesConfig>;
}

// Grupos de características para mostrar en acordeones
export const featureGroups: FeatureGroupConfig[] = [
  {
    id: "general",
    title: "General",
    features: ["enableDarkMode", "enableNotifications", "enableAnalytics", "enableFeedback"]
  },
  {
    id: "user",
    title: "Usuarios",
    features: ["enableUserRegistration", "enableSocialLogin", "enablePublicProfiles"]
  },
  {
    id: "design",
    title: "Diseño",
    features: ["designSystemEnabled", "enableThemeSwitcher", "enableMultiLanguage"]
  },
  {
    id: "content",
    title: "Contenido",
    features: ["enableAdvancedEditor", "enableContentReordering", "enableCategoryManagement", "enableLeaderboard"]
  },
  {
    id: "data",
    title: "Datos",
    features: ["enableAutoBackups", "enableQueryCache", "enableMaintenanceMode", "enableDatabaseDevMode"]
  },
  {
    id: "security",
    title: "Seguridad",
    features: ["enable2FA", "enableMultipleSessions", "enablePublicRegistration", "requireEmailVerification", "enableActivityLog"]
  },
  {
    id: "testing",
    title: "Pruebas",
    features: ["enableTestDataGenerator"]
  },
  {
    id: "onboarding",
    title: "Iniciación",
    features: ["enableOnboarding", "enableContextualHelp", "requireOnboarding", "autoStartOnboarding", "showOnboardingTrigger"]
  }
];

interface FeatureAccordionGroupProps {
  features: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, enabled: boolean) => void;
  isLoading?: boolean;
}

export const FeatureAccordionGroup: React.FC<FeatureAccordionGroupProps> = ({
  features,
  onToggleFeature,
  isLoading = false
}) => {
  const { checkIfCanDisable, checkIfCanEnable, getDependentFeatures, getDependencies } = useFeatureDependencies();

  const getFeatureDescription = (groupId: string, featureKey: keyof FeaturesConfig): string => {
    return featureDescriptions[groupId]?.[featureKey] || "No hay descripción disponible";
  };

  return (
    <Accordion type="multiple" className="w-full" defaultValue={["general"]}>
      {featureGroups.map((group) => (
        <AccordionItem key={group.id} value={group.id}>
          <AccordionTrigger className="text-lg font-medium py-4">
            {group.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {group.features.map((featureKey) => {
                // Verificar dependencias
                const canDisable = checkIfCanDisable(featureKey);
                const canEnable = checkIfCanEnable(featureKey);
                const isEnabled = features[featureKey];
                const dependencies = getDependencies(featureKey);
                const dependents = getDependentFeatures(featureKey);
                
                let disabledReason = "";
                
                if (!canEnable && !isEnabled) {
                  disabledReason = "No se puede activar: requiere activar otras características primero";
                } else if (!canDisable && isEnabled) {
                  disabledReason = "No se puede desactivar: otras características dependen de esta";
                }
                
                return (
                  <div key={String(featureKey)} className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`switch-${featureKey}`} className="text-base font-medium">
                            {String(featureKey).replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </Label>
                          
                          {disabledReason && (
                            <InfoTooltip content={disabledReason}>
                              <LockIcon className="h-4 w-4 text-muted-foreground" />
                            </InfoTooltip>
                          )}
                          
                          {dependencies.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              Requiere: {dependencies.join(', ')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {getFeatureDescription(group.id, featureKey)}
                        </p>
                      </div>
                      <Switch
                        id={`switch-${featureKey}`}
                        checked={isEnabled}
                        onCheckedChange={(checked) => onToggleFeature(featureKey, checked)}
                        disabled={
                          isLoading || 
                          (!canEnable && !isEnabled) || 
                          (!canDisable && isEnabled)
                        }
                      />
                    </div>
                    
                    {dependents.length > 0 && isEnabled && (
                      <div className="ml-6 mt-1">
                        <p className="text-xs text-muted-foreground">
                          Características que dependen de esta: {dependents.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
