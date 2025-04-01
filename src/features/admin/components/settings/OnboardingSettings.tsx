import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Loader2, BookOpen, Info, Play, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { FeaturesConfig } from '@/contexts/features/types';

export interface OnboardingSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

export const OnboardingSettings: React.FC<OnboardingSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading = false
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <BookOpen className="h-4 w-4 text-orange-500" />
          Onboarding
        </CardTitle>
        <CardDescription className="text-xs">
          Configura el sistema de onboarding y los asistentes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Sistema de Onboarding</h3>
            <p className="text-xs text-muted-foreground">
              Habilita todo el sistema de asistentes y guías de inicio
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
            <h3 className="text-sm font-medium">Inicio automático</h3>
            <p className="text-xs text-muted-foreground">
              Lanzar onboarding automáticamente para nuevos usuarios
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
            <h3 className="text-sm font-medium">Botón de inicio</h3>
            <p className="text-xs text-muted-foreground">
              Mostrar botón para iniciar el tutorial manualmente
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
      </CardContent>
    </Card>
  );
};
