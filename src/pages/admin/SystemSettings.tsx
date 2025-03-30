
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Settings, Bell, Lightbulb, Shield, Database } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const { featuresConfig, updateFeaturesConfig } = useOnboarding();

  const handleToggleFeature = (feature: keyof typeof featuresConfig, value: boolean) => {
    updateFeaturesConfig({ [feature]: value });
    toast.success(`Configuración "${feature}" actualizada`);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Configuración del Sistema</h1>
        </div>

        <Tabs defaultValue="features" className="space-y-4">
          <TabsList>
            <TabsTrigger value="features">Funcionalidades</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-4">
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
                    onCheckedChange={(value) => handleToggleFeature('enableOnboardingSystem', value)}
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
                    onCheckedChange={(value) => handleToggleFeature('autoStartOnboarding', value)}
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
                    onCheckedChange={(value) => handleToggleFeature('showOnboardingTrigger', value)}
                    disabled={!featuresConfig.enableOnboardingSystem}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-500" />
                  Notificaciones
                </CardTitle>
                <CardDescription>
                  Configura el sistema de notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableNotifications">Habilitar notificaciones</Label>
                    <p className="text-sm text-muted-foreground">
                      Muestra el indicador de notificaciones en la barra de navegación
                    </p>
                  </div>
                  <Switch
                    id="enableNotifications"
                    checked={featuresConfig.enableNotifications}
                    onCheckedChange={(value) => handleToggleFeature('enableNotifications', value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-purple-500" />
                  Generador de Datos de Prueba
                </CardTitle>
                <CardDescription>
                  Configura la herramienta de generación de datos de prueba
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableTestDataGenerator">Habilitar generador de datos</Label>
                    <p className="text-sm text-muted-foreground">
                      Activa la funcionalidad de generación de datos de prueba para administradores
                    </p>
                  </div>
                  <Switch
                    id="enableTestDataGenerator"
                    checked={featuresConfig.enableTestDataGenerator}
                    onCheckedChange={(value) => handleToggleFeature('enableTestDataGenerator', value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Configuración de Seguridad
                </CardTitle>
                <CardDescription>
                  Estas opciones se añadirán en futuras actualizaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No hay opciones de seguridad configurables en esta versión.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Apariencia</CardTitle>
                <CardDescription>
                  Estas opciones se añadirán en futuras actualizaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No hay opciones de apariencia configurables en esta versión.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SystemSettings;
