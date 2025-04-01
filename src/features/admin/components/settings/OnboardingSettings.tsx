
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Book, 
  Sparkles, 
  Info,
  HelpCircle,
  Loader2,
  Construction
} from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Badge } from '@/components/ui/badge';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';

interface OnboardingSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

const OnboardingSettings: React.FC<OnboardingSettingsProps> = ({ 
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  const onboardingSections: SettingsSection[] = [
    {
      id: "general",
      title: "Configuración General",
      icon: <Sparkles className="h-5 w-5" />,
      iconColor: "text-indigo-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Sistema de Onboarding</h3>
              <p className="text-xs text-muted-foreground">
                Habilita el sistema de onboarding para nuevos usuarios
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableOnboardingSystem"
                checked={featuresConfig.enableOnboardingSystem}
                onCheckedChange={(value) => onToggleFeature('enableOnboardingSystem', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Inicio Automático</h3>
              <p className="text-xs text-muted-foreground">
                Inicia el proceso de onboarding automáticamente
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="autoStartOnboarding"
                checked={featuresConfig.autoStartOnboarding}
                onCheckedChange={(value) => onToggleFeature('autoStartOnboarding', value)}
                disabled={isLoading || !featuresConfig.enableOnboardingSystem}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Mostrar Botón de Onboarding</h3>
              <p className="text-xs text-muted-foreground">
                Muestra el botón para iniciar el onboarding manualmente
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="showOnboardingTrigger"
                checked={featuresConfig.showOnboardingTrigger}
                onCheckedChange={(value) => onToggleFeature('showOnboardingTrigger', value)}
                disabled={isLoading || !featuresConfig.enableOnboardingSystem}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "help",
      title: "Ayuda y Soporte",
      icon: <HelpCircle className="h-5 w-5" />,
      iconColor: "text-cyan-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Documentación Contextual</h3>
              <p className="text-xs text-muted-foreground">
                Muestra documentación basada en el contexto actual
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <div className="flex items-center">
              <Switch id="contextualDocs" disabled />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Asistente IA</h3>
              <p className="text-xs text-muted-foreground">
                Habilita un asistente con IA para ayudar a los usuarios
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <div className="flex items-center">
              <Switch id="aiAssistant" disabled />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <SettingsAccordion 
      sections={onboardingSections}
      title="Onboarding"
      description="Configura las opciones de bienvenida y asistencia a usuarios"
    />
  );
};

export default OnboardingSettings;
