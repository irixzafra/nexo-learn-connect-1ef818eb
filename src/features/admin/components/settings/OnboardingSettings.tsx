
import React from 'react';
import { Book, Info } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { FeaturesConfig } from '@/contexts/features/types';

interface OnboardingSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

const OnboardingSettings: React.FC<OnboardingSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          Onboarding y Ayuda
        </h2>
        <p className="text-muted-foreground">
          Configura el proceso de onboarding para nuevos usuarios y las opciones de ayuda
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Onboarding</CardTitle>
          <CardDescription>
            Personaliza la experiencia de integración para nuevos usuarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableOnboarding">Activar Onboarding</Label>
              <p className="text-sm text-muted-foreground">Habilita el proceso de integración para nuevos usuarios</p>
            </div>
            <Switch
              id="enableOnboarding"
              checked={!!featuresConfig.enableOnboarding}
              onCheckedChange={(checked) => onToggleFeature('enableOnboarding', checked)}
              disabled={isLoading}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="requireOnboarding">Onboarding Obligatorio</Label>
              <p className="text-sm text-muted-foreground">Requiere que los usuarios completen el onboarding</p>
            </div>
            <Switch
              id="requireOnboarding"
              checked={!!featuresConfig.requireOnboarding}
              onCheckedChange={(checked) => onToggleFeature('requireOnboarding', checked)}
              disabled={isLoading || !featuresConfig.enableOnboarding}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoStartOnboarding">Inicio Automático</Label>
              <p className="text-sm text-muted-foreground">Inicia automáticamente el onboarding para nuevos usuarios</p>
            </div>
            <Switch
              id="autoStartOnboarding"
              checked={!!featuresConfig.autoStartOnboarding}
              onCheckedChange={(checked) => onToggleFeature('autoStartOnboarding', checked)}
              disabled={isLoading || !featuresConfig.enableOnboarding}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showOnboardingTrigger">Mostrar Botón de Ayuda</Label>
              <p className="text-sm text-muted-foreground">Muestra un botón para iniciar/reiniciar el onboarding</p>
            </div>
            <Switch
              id="showOnboardingTrigger"
              checked={!!featuresConfig.showOnboardingTrigger}
              onCheckedChange={(checked) => onToggleFeature('showOnboardingTrigger', checked)}
              disabled={isLoading || !featuresConfig.enableOnboarding}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Ayuda Contextual</CardTitle>
          <CardDescription>
            Configura opciones de ayuda para mejorar la experiencia del usuario
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableContextualHelp">Activar Ayuda Contextual</Label>
              <p className="text-sm text-muted-foreground">Muestra tooltips y guías contextuales en la interfaz</p>
            </div>
            <Switch
              id="enableContextualHelp"
              checked={!!featuresConfig.enableContextualHelp}
              onCheckedChange={(checked) => onToggleFeature('enableContextualHelp', checked)}
              disabled={isLoading}
            />
          </div>
          
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              La ayuda contextual mejora significativamente la experiencia de usuarios nuevos y reduce la curva de aprendizaje.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingSettings;
