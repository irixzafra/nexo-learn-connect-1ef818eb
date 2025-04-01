
import React, { useState } from 'react';
import { useFeatures } from '@/contexts/features/FeatureContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FeatureAccordionGroup } from './FeatureAccordionGroup';
import { PlatformFeaturesAccordion } from './PlatformFeaturesAccordion';
import { Loader2, AlertTriangle, Info, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { FeaturesConfig } from '@/contexts/features/types';
import OnboardingSettings from '@/features/admin/components/settings/OnboardingSettings';

/**
 * Componente para gestionar las características del sistema
 */
export const FeatureManagement: React.FC = () => {
  const { features, updateFeatures, isLoading, error } = useFeatures();
  const [activeTab, setActiveTab] = useState<string>('general');
  const { toast } = useToast();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleToggleFeature = async (featureKey: keyof FeaturesConfig, value: boolean) => {
    try {
      setSaveStatus('saving');
      await updateFeatures({
        ...features,
        [featureKey]: value
      });
      setSaveStatus('success');
      
      toast({
        title: "Configuración actualizada",
        description: `La característica ha sido ${value ? 'activada' : 'desactivada'}.`,
      });
      
      // Reset status after a delay
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      console.error("Error toggling feature:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar la configuración.",
      });
    }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          No se pudo cargar la configuración de características. Por favor, intente nuevamente.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading || !features) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Cargando configuración...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="advanced">Avanzado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Alert variant="default" className="bg-muted">
            <Info className="h-4 w-4" />
            <AlertTitle>Información</AlertTitle>
            <AlertDescription>
              Active o desactive las funcionalidades generales del sistema. Algunos cambios pueden requerir actualizar la página.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Características Principales</CardTitle>
              <CardDescription>
                Habilite o deshabilite las características principales del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Modo Oscuro</Label>
                  <p className="text-sm text-muted-foreground">Permitir cambiar entre modo claro y oscuro</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={features.enableDarkMode}
                  onCheckedChange={(checked) => handleToggleFeature('enableDarkMode', checked)}
                  disabled={isLoading}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notificaciones</Label>
                  <p className="text-sm text-muted-foreground">Sistema de notificaciones en tiempo real</p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={features.enableNotifications}
                  onCheckedChange={(checked) => handleToggleFeature('enableNotifications', checked)}
                  disabled={isLoading}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Analíticas</Label>
                  <p className="text-sm text-muted-foreground">Recolección de datos de uso anónimos</p>
                </div>
                <Switch 
                  id="analytics" 
                  checked={features.enableAnalytics}
                  onCheckedChange={(checked) => handleToggleFeature('enableAnalytics', checked)}
                  disabled={isLoading}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="feedback">Sistema de Feedback</Label>
                  <p className="text-sm text-muted-foreground">Permitir que los usuarios envíen feedback</p>
                </div>
                <Switch 
                  id="feedback" 
                  checked={features.enableFeedback}
                  onCheckedChange={(checked) => handleToggleFeature('enableFeedback', checked)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Características de Usuarios</CardTitle>
              <CardDescription>
                Configure las opciones relacionadas con usuarios y perfiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="user-registration">Registro de Usuarios</Label>
                  <p className="text-sm text-muted-foreground">Permitir que nuevos usuarios se registren</p>
                </div>
                <Switch 
                  id="user-registration" 
                  checked={features.enableUserRegistration}
                  onCheckedChange={(checked) => handleToggleFeature('enableUserRegistration', checked)}
                  disabled={isLoading}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="social-login">Login Social</Label>
                  <p className="text-sm text-muted-foreground">Permitir inicio de sesión con redes sociales</p>
                </div>
                <Switch 
                  id="social-login" 
                  checked={features.enableSocialLogin}
                  onCheckedChange={(checked) => handleToggleFeature('enableSocialLogin', checked)}
                  disabled={isLoading}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profiles">Perfiles Públicos</Label>
                  <p className="text-sm text-muted-foreground">Permitir que los perfiles sean visibles para otros usuarios</p>
                </div>
                <Switch 
                  id="profiles" 
                  checked={features.enablePublicProfiles}
                  onCheckedChange={(checked) => handleToggleFeature('enablePublicProfiles', checked)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="onboarding" className="space-y-4 mt-4">
          <OnboardingSettings 
            featuresConfig={features} 
            onToggleFeature={handleToggleFeature}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Todas las Características</CardTitle>
              <CardDescription>
                Vista completa de todas las características disponibles en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformFeaturesAccordion 
                features={features} 
                onToggleFeature={handleToggleFeature}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {saveStatus === 'saving' && (
        <Alert>
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertTitle>Guardando cambios</AlertTitle>
          <AlertDescription>
            Aplicando la configuración, espere un momento...
          </AlertDescription>
        </Alert>
      )}
      
      {saveStatus === 'success' && (
        <Alert>
          <Check className="h-4 w-4 text-green-500" />
          <AlertTitle>Cambios guardados</AlertTitle>
          <AlertDescription>
            La configuración ha sido actualizada correctamente.
          </AlertDescription>
        </Alert>
      )}
      
      {saveStatus === 'error' && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No se pudieron guardar los cambios. Intente nuevamente.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FeatureManagement;
