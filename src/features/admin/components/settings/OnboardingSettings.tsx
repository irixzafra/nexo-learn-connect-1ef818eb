
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { FeaturesConfig } from '@/contexts/OnboardingContext';

interface OnboardingSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
}

export const OnboardingSettings: React.FC<OnboardingSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Tutorial de Onboarding
        </CardTitle>
        <CardDescription>
          Configura cómo se muestra el tutorial de onboarding para nuevos usuarios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableOnboardingSystem">Habilitar sistema de onboarding</Label>
            <p className="text-sm text-muted-foreground">
              Activa o desactiva completamente el sistema de onboarding
            </p>
          </div>
          <Switch
            id="enableOnboardingSystem"
            checked={featuresConfig.enableOnboardingSystem}
            onCheckedChange={(value) => onToggleFeature('enableOnboardingSystem', value)}
          />
        </div>

        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="autoStartOnboarding">Iniciar automáticamente</Label>
            <p className="text-sm text-muted-foreground">
              Inicia automáticamente el tutorial para usuarios nuevos
            </p>
          </div>
          <Switch
            id="autoStartOnboarding"
            checked={featuresConfig.autoStartOnboarding}
            onCheckedChange={(value) => onToggleFeature('autoStartOnboarding', value)}
            disabled={!featuresConfig.enableOnboardingSystem}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="showOnboardingTrigger">Mostrar botón de tutorial</Label>
            <p className="text-sm text-muted-foreground">
              Muestra el botón para iniciar el tutorial en la barra de navegación
            </p>
          </div>
          <Switch
            id="showOnboardingTrigger"
            checked={featuresConfig.showOnboardingTrigger}
            onCheckedChange={(value) => onToggleFeature('showOnboardingTrigger', value)}
            disabled={!featuresConfig.enableOnboardingSystem}
          />
        </div>
      </CardContent>
    </Card>
  );
};
