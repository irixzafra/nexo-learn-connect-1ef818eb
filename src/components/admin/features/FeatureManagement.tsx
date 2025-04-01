
import React, { useState } from 'react';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { FeaturesConfig } from '@/contexts/features/types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, Check, Info } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FeatureSwitchProps {
  feature: keyof FeaturesConfig;
  label: string;
  description?: string;
  disabled?: boolean;
  isExperimental?: boolean;
  requiresReload?: boolean;
}

const FeatureSwitch: React.FC<FeatureSwitchProps> = ({
  feature,
  label,
  description,
  disabled = false,
  isExperimental = false,
  requiresReload = false
}) => {
  const { 
    featuresConfig, 
    toggleFeature, 
    isLoading,
    getFeatureDependencies,
    getFeatureDependents
  } = useFeatures();
  
  const isEnabled = featuresConfig[feature];
  const [showDependencyInfo, setShowDependencyInfo] = useState(false);
  
  const dependencies = getFeatureDependencies(feature);
  const dependents = getFeatureDependents(feature);
  
  const handleToggle = async (checked: boolean) => {
    await toggleFeature(feature, checked);
  };
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between py-1">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">{label}</h3>
            {isExperimental && (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200">
                Experimental
              </Badge>
            )}
            {requiresReload && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200">
                Requiere recarga
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          
          {(dependencies.length > 0 || dependents.length > 0) && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-1 h-auto p-1 text-xs"
              onClick={() => setShowDependencyInfo(!showDependencyInfo)}
            >
              <Info className="h-3 w-3 mr-1" />
              {showDependencyInfo ? 'Ocultar dependencias' : 'Ver dependencias'}
            </Button>
          )}
          
          {showDependencyInfo && (dependencies.length > 0 || dependents.length > 0) && (
            <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
              {dependencies.length > 0 && (
                <div className="mb-1">
                  <span className="font-semibold">Requiere:</span>{' '}
                  {dependencies.map((dep, i) => (
                    <span key={dep}>
                      {String(dep).replace(/^enable/, '')}
                      {i < dependencies.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
              )}
              
              {dependents.length > 0 && (
                <div>
                  <span className="font-semibold">Lo necesitan:</span>{' '}
                  {dependents.map((dep, i) => (
                    <span key={dep}>
                      {String(dep).replace(/^enable/, '')}
                      {i < dependents.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center">
          {isLoading && (
            <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Switch
                    id={`feature-${feature}`}
                    checked={isEnabled}
                    onCheckedChange={handleToggle}
                    disabled={disabled || isLoading}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                {disabled 
                  ? 'Esta característica está deshabilitada actualmente'
                  : isEnabled
                    ? `Desactivar ${label}`
                    : `Activar ${label}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {dependents.length > 0 && isEnabled && (
        <Alert variant="warning" className="py-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Desactivar esta característica también desactivará {dependents.length} características que dependen de ella.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export const FeatureManagement: React.FC = () => {
  const { featuresConfig, isLoading, error, updateFeatures } = useFeatures();
  
  const handleResetToDefault = async () => {
    if (confirm('¿Estás seguro de que quieres restablecer todas las características a sus valores predeterminados?')) {
      await updateFeatures({
        // Onboarding
        autoStartOnboarding: true,
        showOnboardingTrigger: true,
        enableOnboardingSystem: true,
        
        // UI
        enableEditMode: false,
        enableContentReordering: false,
        enableThemeSwitcher: true,
        enableMultiLanguage: false,
        enableDesignSystem: true,
        
        // Content
        enableAdvancedEditor: true,
        enableCategoryManagement: false,
        
        // User Management
        enableInvitations: true,
        enableCustomRoles: false,
        enableRoleManagement: true,
        enableRoleSwitcher: true,
        
        // Notifications
        enableNotifications: true,
        enableRealTimeNotifications: true,
        enableEmailNotifications: true,
        
        // Security
        enable2FA: false,
        enableMultipleSessions: true,
        enablePublicRegistration: false,
        requireEmailVerification: true,
        enableActivityLog: true,
        
        // Other
        enableLeaderboard: false,
        enableAI: false,
        enablePublicApi: false,
        enableWebhooks: false,
        enableTestDataGenerator: false,
        enableDatabaseDevMode: false,
        enableAutoBackups: true,
        enableQueryCache: true,
        enableMaintenanceMode: false,
      });
    }
  };
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || 'Error al cargar la configuración de características'}
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Características</CardTitle>
        <CardDescription>
          Activa o desactiva funcionalidades para personalizar la plataforma.
          Las características tienen dependencias automáticas.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isLoading && !featuresConfig ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2">Cargando configuración...</span>
          </div>
        ) : (
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="onboarding">
              <AccordionTrigger>Onboarding y Asistentes</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FeatureSwitch
                    feature="enableOnboardingSystem"
                    label="Sistema de Onboarding"
                    description="Habilita todo el sistema de asistentes y guías de inicio"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="autoStartOnboarding"
                    label="Inicio automático"
                    description="Lanzar onboarding automáticamente para nuevos usuarios"
                    disabled={!featuresConfig.enableOnboardingSystem}
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="showOnboardingTrigger"
                    label="Botón de inicio"
                    description="Mostrar botón para iniciar el tutorial manualmente"
                    disabled={!featuresConfig.enableOnboardingSystem}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ui">
              <AccordionTrigger>Interfaz de Usuario</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FeatureSwitch
                    feature="enableThemeSwitcher"
                    label="Selector de temas"
                    description="Permite cambiar entre tema claro y oscuro"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableDesignSystem"
                    label="Sistema de Diseño"
                    description="Activa el sistema de diseño personalizado"
                    requiresReload={true}
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableMultiLanguage"
                    label="Multi-idioma"
                    description="Habilita el soporte para múltiples idiomas"
                    isExperimental={true}
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableEditMode"
                    label="Edición en línea"
                    description="Permite editar el contenido directamente en la página"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableContentReordering"
                    label="Reordenar contenido"
                    description="Permite arrastrar y soltar para reordenar contenido"
                    disabled={!featuresConfig.enableEditMode}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="content">
              <AccordionTrigger>Contenido</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FeatureSwitch
                    feature="enableAdvancedEditor"
                    label="Editor avanzado"
                    description="Habilita el editor avanzado para el contenido"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableCategoryManagement"
                    label="Gestión de categorías"
                    description="Permite crear y administrar categorías de contenido"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="users">
              <AccordionTrigger>Usuarios y Roles</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FeatureSwitch
                    feature="enableRoleManagement"
                    label="Gestión de roles"
                    description="Permite administrar roles y permisos"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableRoleSwitcher"
                    label="Cambio de roles"
                    description="Permite a usuarios cambiar entre sus roles asignados"
                    disabled={!featuresConfig.enableRoleManagement}
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableInvitations"
                    label="Invitaciones"
                    description="Permite a usuarios invitar a otros usuarios"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableCustomRoles"
                    label="Roles personalizados"
                    description="Permite crear roles personalizados"
                    disabled={!featuresConfig.enableRoleManagement}
                    isExperimental={true}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="notifications">
              <AccordionTrigger>Notificaciones</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FeatureSwitch
                    feature="enableNotifications"
                    label="Sistema de notificaciones"
                    description="Activa el sistema de notificaciones general"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableRealTimeNotifications"
                    label="Notificaciones en tiempo real"
                    description="Notificaciones instantáneas en la interfaz"
                    disabled={!featuresConfig.enableNotifications}
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableEmailNotifications"
                    label="Notificaciones por email"
                    description="Envía notificaciones por correo electrónico"
                    disabled={!featuresConfig.enableNotifications}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="security">
              <AccordionTrigger>Seguridad</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FeatureSwitch
                    feature="enable2FA"
                    label="Autenticación de dos factores"
                    description="Habilita 2FA para mayor seguridad"
                    isExperimental={true}
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableMultipleSessions"
                    label="Sesiones múltiples"
                    description="Permite iniciar sesión desde múltiples dispositivos"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="requireEmailVerification"
                    label="Verificación de correo"
                    description="Requiere verificar el email al registrarse"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enablePublicRegistration"
                    label="Registro público"
                    description="Permite que cualquier persona se registre"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableActivityLog"
                    label="Registro de actividad"
                    description="Guarda un historial de acciones de usuarios"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="advanced">
              <AccordionTrigger>Características Avanzadas</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FeatureSwitch
                    feature="enableAI"
                    label="Funciones de IA"
                    description="Habilita herramientas de inteligencia artificial"
                    isExperimental={true}
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableLeaderboard"
                    label="Tabla de clasificación"
                    description="Habilita la tabla de líderes y clasificaciones"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enablePublicApi"
                    label="API pública"
                    description="Expone endpoints de API para integraciones externas"
                    isExperimental={true}
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableWebhooks"
                    label="Webhooks"
                    description="Permite configurar webhooks para eventos"
                    isExperimental={true}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="development">
              <AccordionTrigger>Desarrollo y Datos</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FeatureSwitch
                    feature="enableTestDataGenerator"
                    label="Generador de datos de prueba"
                    description="Herramientas para generar datos de prueba"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableDatabaseDevMode"
                    label="Modo desarrollo BD"
                    description="Opciones avanzadas para desarrollo de base de datos"
                    isExperimental={true}
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableAutoBackups"
                    label="Respaldos automáticos"
                    description="Genera copias de seguridad periódicas"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableQueryCache"
                    label="Caché de consultas"
                    description="Mejora el rendimiento con caché de consultas"
                  />
                  
                  <Separator className="my-2" />
                  
                  <FeatureSwitch
                    feature="enableMaintenanceMode"
                    label="Modo mantenimiento"
                    description="Activa el modo de mantenimiento para el sitio"
                    requiresReload={true}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleResetToDefault}
          disabled={isLoading}
        >
          Restablecer predeterminados
        </Button>
        
        <Alert variant="success" className="max-w-[350px] p-2 flex items-center">
          <Check className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Los cambios en características se aplican automáticamente y respetan dependencias.
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
};
