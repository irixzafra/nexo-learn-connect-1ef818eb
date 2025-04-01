
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCw } from 'lucide-react';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { toast } from 'sonner';

const OnboardingSettings = () => {
  const { features, toggleFeature } = useFeatures();

  const handleToggleFeature = async (feature: string, enabled: boolean) => {
    try {
      await toggleFeature(feature as any, enabled);
      toast.success(`Configuración actualizada: ${feature}`);
    } catch (error) {
      toast.error('Error al actualizar la configuración');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Incorporación</CardTitle>
          <CardDescription>Gestionar la experiencia de onboarding de la plataforma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="enableOnboarding">Habilitar sistema de onboarding</Label>
            <Switch
              id="enableOnboarding"
              checked={features.enableOnboarding}
              onCheckedChange={(checked) => handleToggleFeature('enableOnboarding', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="autoStartOnboarding">Iniciar automáticamente para nuevos usuarios</Label>
            <Switch
              id="autoStartOnboarding"
              checked={features.autoStartOnboarding || false}
              onCheckedChange={(checked) => handleToggleFeature('autoStartOnboarding', checked)}
              disabled={!features.enableOnboarding}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="showOnboardingTrigger">Mostrar botón de guía en la interfaz</Label>
            <Switch
              id="showOnboardingTrigger"
              checked={features.showOnboardingTrigger || false}
              onCheckedChange={(checked) => handleToggleFeature('showOnboardingTrigger', checked)}
              disabled={!features.enableOnboarding}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="enableContextualHelp">Habilitar ayuda contextual</Label>
            <Switch
              id="enableContextualHelp"
              checked={features.enableContextualHelp}
              onCheckedChange={(checked) => handleToggleFeature('enableContextualHelp', checked)}
            />
          </div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reiniciar datos de onboarding para todos los usuarios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingSettings;
