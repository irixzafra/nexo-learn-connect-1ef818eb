
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FeaturesConfig } from '@/contexts/features/types';
import { Book, LayoutDashboard, Lightbulb, Users } from 'lucide-react';

interface OnboardingSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

export const OnboardingSettings: React.FC<OnboardingSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          Configuración de Onboarding
        </h2>
        <p className="text-muted-foreground">
          Personaliza la experiencia de onboarding para usuarios nuevos
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5" />
              Características Básicas
            </CardTitle>
            <CardDescription>Funcionalidades principales del sistema de onboarding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="onboardingSystem">Sistema de Onboarding</Label>
                <p className="text-sm text-muted-foreground">Habilitar sistema de onboarding para nuevos usuarios</p>
              </div>
              <Switch
                id="onboardingSystem"
                checked={featuresConfig.enableOnboardingSystem}
                onCheckedChange={(checked) => onToggleFeature('enableOnboardingSystem', checked)}
                disabled={isLoading}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="onboardingTrigger">Mostrar Botón de Onboarding</Label>
                <p className="text-sm text-muted-foreground">Mostrar el botón para iniciar el tutorial</p>
              </div>
              <Switch
                id="onboardingTrigger"
                checked={featuresConfig.showOnboardingTrigger}
                onCheckedChange={(checked) => onToggleFeature('showOnboardingTrigger', checked)}
                disabled={isLoading || !featuresConfig.enableOnboardingSystem}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoStartOnboarding">Inicio Automático</Label>
                <p className="text-sm text-muted-foreground">Iniciar onboarding automáticamente para nuevos usuarios</p>
              </div>
              <Switch
                id="autoStartOnboarding"
                checked={featuresConfig.autoStartOnboarding}
                onCheckedChange={(checked) => onToggleFeature('autoStartOnboarding', checked)}
                disabled={isLoading || !featuresConfig.enableOnboardingSystem}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Personalización por Rol
            </CardTitle>
            <CardDescription>Personaliza el onboarding según el rol del usuario</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Cada rol de usuario tiene un flujo de onboarding diferente para mostrar las características relevantes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Estudiantes</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Exploración de cursos</li>
                  <li>• Completar perfil</li>
                  <li>• Iniciar primer curso</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Instructores</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Crear contenido</li>
                  <li>• Herramientas de enseñanza</li>
                  <li>• Estadísticas y análisis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Tips y Ayudas Contextuales
            </CardTitle>
            <CardDescription>Configura ayudas y consejos para usuarios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="contextualHelp">Ayudas Contextuales</Label>
                <p className="text-sm text-muted-foreground">Mostrar consejos de ayuda según el contexto</p>
              </div>
              <Switch
                id="contextualHelp"
                checked={true}
                disabled={true}
                aria-readonly={true}
              />
            </div>
            <p className="text-xs text-muted-foreground italic">
              Esta característica estará disponible próximamente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingSettings;
