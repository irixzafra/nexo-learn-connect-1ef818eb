import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Loader2 } from 'lucide-react';
import type { FeaturesConfig } from '@/contexts/features/types';

interface NotificationSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading = false
}) => {
  return (
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
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableNotifications"
              checked={featuresConfig.enableNotifications}
              onCheckedChange={(value) => onToggleFeature('enableNotifications', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
