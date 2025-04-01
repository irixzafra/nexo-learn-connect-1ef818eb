
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { FeaturesConfig } from '@/contexts/features/types';
import { LucideIcon, Settings, Shield, Bell, Palette, Database, BookOpen, ToggleRight } from 'lucide-react';

interface FeatureItem {
  key: keyof FeaturesConfig;
  label: string;
  description: string;
}

interface FeatureGroupProps {
  id: string;
  title: string;
  icon: LucideIcon;
  features: FeatureItem[];
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

/**
 * Grupo de características en formato acordeón
 */
export const FeatureAccordionGroup: React.FC = () => {
  const { features, toggleFeature, isLoading } = useFeatures();

  const featureGroups = [
    {
      id: "general",
      title: "Funcionalidades Generales",
      icon: Settings,
      features: [
        { key: "enableDarkMode", label: "Modo Oscuro", description: "Permite cambiar al tema oscuro" },
        { key: "enableNotifications", label: "Notificaciones", description: "Habilita el sistema de notificaciones" },
        { key: "enableAnalytics", label: "Analíticas", description: "Recolecta datos de uso para análisis" },
        { key: "enableFeedback", label: "Feedback", description: "Permite a los usuarios enviar comentarios" }
      ]
    },
    {
      id: "onboarding",
      title: "Onboarding y Ayuda",
      icon: BookOpen,
      features: [
        { key: "enableOnboarding", label: "Onboarding", description: "Guía inicial para nuevos usuarios" },
        { key: "requireOnboarding", label: "Onboarding Obligatorio", description: "Requiere completar el onboarding" },
        { key: "enableContextualHelp", label: "Ayuda Contextual", description: "Muestra ayuda según el contexto" },
        { key: "autoStartOnboarding", label: "Inicio Automático", description: "Inicia el onboarding automáticamente" },
        { key: "showOnboardingTrigger", label: "Mostrar Botón de Ayuda", description: "Muestra un botón para iniciar el onboarding" }
      ]
    },
    {
      id: "security",
      title: "Seguridad",
      icon: Shield,
      features: [
        { key: "enable2FA", label: "Autenticación de Dos Factores", description: "Habilita 2FA para mayor seguridad" },
        { key: "enableMultipleSessions", label: "Múltiples Sesiones", description: "Permite iniciar sesión en varios dispositivos" },
        { key: "requireEmailVerification", label: "Verificación de Email", description: "Requiere verificar el email al registrarse" },
        { key: "enableActivityLog", label: "Registro de Actividad", description: "Guarda un historial de acciones del usuario" }
      ]
    }
  ];

  return (
    <Accordion type="multiple" defaultValue={["general"]} className="w-full">
      {featureGroups.map((group) => (
        <AccordionItem key={group.id} value={group.id} className="border rounded-lg my-2">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex items-center space-x-2">
              <group.icon className="h-5 w-5 text-primary" />
              <span>{group.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ScrollArea className={group.features.length > 6 ? "h-[400px]" : undefined}>
              <div className="space-y-4 pr-4">
                {group.features.map((feature, index) => (
                  <React.Fragment key={feature.key}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor={`${group.id}-${feature.key}`}>{feature.label}</Label>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <Switch
                        id={`${group.id}-${feature.key}`}
                        checked={features[feature.key] || false}
                        onCheckedChange={(checked) => toggleFeature(feature.key, checked)}
                        disabled={isLoading}
                      />
                    </div>
                    {index < group.features.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

// Export named component
export default FeatureAccordionGroup;

// Missing import
import { useFeatures } from '@/contexts/features/FeaturesContext';
