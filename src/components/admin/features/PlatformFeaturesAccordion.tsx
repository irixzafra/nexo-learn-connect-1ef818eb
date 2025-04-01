
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { FeaturesConfig, FeatureId } from '@/contexts/features/types';
import { getFeatureDependencies, getDependencyDescription } from '@/contexts/features/dependencies';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface PlatformFeaturesAccordionProps {
  features: FeaturesConfig;
  onToggleFeature: (key: keyof FeaturesConfig, value: boolean) => void;
}

const PlatformFeaturesAccordion: React.FC<PlatformFeaturesAccordionProps> = ({
  features,
  onToggleFeature
}) => {
  const renderFeatureItem = (key: keyof FeaturesConfig, label: string, description: string) => {
    const dependencies = getFeatureDependencies(key as FeatureId);
    const hasDependencies = dependencies.length > 0;
    const hasDisabledDependencies = dependencies.some(dep => !features[dep]);
    
    return (
      <div className="border-b border-border last:border-0 py-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">{label}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <Switch
            checked={!!features[key]}
            onCheckedChange={(checked) => onToggleFeature(key, checked)}
            disabled={hasDisabledDependencies}
          />
        </div>
        
        {hasDependencies && hasDisabledDependencies && (
          <Alert variant="warning" className="mt-2 py-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {dependencies.filter(dep => !features[dep]).map(dep => (
                <div key={dep} className="mt-1">
                  {getDependencyDescription(key as FeatureId, dep)}
                </div>
              ))}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="user-experience">
        <AccordionTrigger>Experiencia de Usuario</AccordionTrigger>
        <AccordionContent>
          {renderFeatureItem(
            'enableDarkMode',
            'Modo Oscuro',
            'Permite a los usuarios cambiar entre tema claro y oscuro'
          )}
          {renderFeatureItem(
            'enableNotifications',
            'Notificaciones',
            'Habilita el sistema de notificaciones en la plataforma'
          )}
          {renderFeatureItem(
            'enableOnboarding',
            'Sistema de Onboarding',
            'Activa el proceso guiado para nuevos usuarios'
          )}
          {renderFeatureItem(
            'enableContextualHelp',
            'Ayuda Contextual',
            'Muestra información de ayuda contextual en diferentes partes de la interfaz'
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="content">
        <AccordionTrigger>Contenido</AccordionTrigger>
        <AccordionContent>
          {renderFeatureItem(
            'enableAdvancedEditor',
            'Editor Avanzado',
            'Activa el editor de contenido avanzado con más opciones de formato'
          )}
          {renderFeatureItem(
            'enableContentReordering',
            'Reordenación de Contenido',
            'Permite reorganizar el contenido mediante arrastrar y soltar'
          )}
          {renderFeatureItem(
            'enableCategoryManagement',
            'Gestión de Categorías',
            'Habilita la administración de categorías para el contenido'
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="users">
        <AccordionTrigger>Usuarios</AccordionTrigger>
        <AccordionContent>
          {renderFeatureItem(
            'enableUserRegistration',
            'Registro de Usuarios',
            'Permite a nuevos usuarios registrarse en la plataforma'
          )}
          {renderFeatureItem(
            'enableSocialLogin',
            'Login Social',
            'Permite iniciar sesión con cuentas de redes sociales'
          )}
          {renderFeatureItem(
            'enableRoleManagement',
            'Gestión de Roles',
            'Habilita la administración avanzada de roles de usuario'
          )}
          {renderFeatureItem(
            'enableRoleSwitcher',
            'Cambio Temporal de Rol',
            'Permite a los administradores cambiar temporalmente su rol para probar la experiencia'
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="technical">
        <AccordionTrigger>Técnico</AccordionTrigger>
        <AccordionContent>
          {renderFeatureItem(
            'enableTestDataGenerator',
            'Generador de Datos de Prueba',
            'Permite generar datos ficticios para probar la plataforma'
          )}
          {renderFeatureItem(
            'designSystemEnabled',
            'Sistema de Diseño',
            'Activa el sistema de diseño personalizable'
          )}
          {renderFeatureItem(
            'enableMultiLanguage',
            'Multi-idioma',
            'Habilita la funcionalidad multi-idioma en toda la plataforma'
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="security">
        <AccordionTrigger>Seguridad</AccordionTrigger>
        <AccordionContent>
          {renderFeatureItem(
            'enable2FA',
            'Autenticación de dos factores',
            'Activa la autenticación de dos factores para mayor seguridad'
          )}
          {renderFeatureItem(
            'requireEmailVerification',
            'Verificación de Email',
            'Requiere verificación de email antes de activar cuentas nuevas'
          )}
          {renderFeatureItem(
            'enableActivityLog',
            'Registro de Actividad',
            'Registra todas las acciones de los usuarios para auditoría'
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PlatformFeaturesAccordion;
