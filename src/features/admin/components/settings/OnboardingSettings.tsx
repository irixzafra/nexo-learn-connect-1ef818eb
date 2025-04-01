
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FeaturesConfig } from '@/contexts/features/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface OnboardingSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => Promise<void>;
  isLoading: boolean;
}

/**
 * Componente para configurar las opciones de onboarding
 */
const OnboardingSettings: React.FC<OnboardingSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-muted">
        <Info className="h-4 w-4" />
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>
          Configure las opciones del sistema de onboarding para nuevos usuarios.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Onboarding de Usuarios</CardTitle>
          <CardDescription>
            Configuración del sistema de inducción para nuevos usuarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Habilitar Onboarding */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-onboarding">Sistema de Onboarding</Label>
              <p className="text-sm text-muted-foreground">
                Activar el sistema completo de onboarding
              </p>
            </div>
            <Switch
              id="enable-onboarding"
              checked={featuresConfig.enableOnboarding}
              onCheckedChange={(checked) => onToggleFeature('enableOnboarding', checked)}
              disabled={isLoading}
            />
          </div>
          
          <Separator />
          
          {/* Mostrar el botón de ayuda contextual */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="contextual-help">Ayuda Contextual</Label>
              <p className="text-sm text-muted-foreground">
                Mostrar botones de ayuda en diferentes secciones
              </p>
            </div>
            <Switch
              id="contextual-help"
              checked={featuresConfig.enableContextualHelp}
              onCheckedChange={(checked) => onToggleFeature('enableContextualHelp', checked)}
              disabled={isLoading || !featuresConfig.enableOnboarding}
            />
          </div>
          
          <Separator />
          
          {/* Onboarding Obligatorio */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-onboarding">Onboarding Obligatorio</Label>
              <p className="text-sm text-muted-foreground">
                Obligar a los nuevos usuarios a completar el proceso de inducción
              </p>
            </div>
            <Switch
              id="require-onboarding"
              checked={featuresConfig.requireOnboarding}
              onCheckedChange={(checked) => onToggleFeature('requireOnboarding', checked)}
              disabled={isLoading || !featuresConfig.enableOnboarding}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingSettings;
