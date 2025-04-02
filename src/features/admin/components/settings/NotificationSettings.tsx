
import React from 'react';
import { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell } from 'lucide-react';

interface NotificationSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: ExtendedFeatureId | FeatureId, value: boolean) => void | Promise<void>;
  isLoading: boolean;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notificaciones
        </h2>
        <p className="text-muted-foreground">
          Configura las opciones de notificaciones del sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Notificaciones</CardTitle>
          <CardDescription>
            Gestiona cómo y cuándo se envían notificaciones a los usuarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableNotifications">Habilitar Notificaciones</Label>
              <p className="text-sm text-muted-foreground">Activar el sistema de notificaciones</p>
            </div>
            <Switch
              id="enableNotifications"
              checked={!!featuresConfig.enableNotifications}
              onCheckedChange={(checked) => onToggleFeature('enableNotifications', checked)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableEmailNotifications">Notificaciones por Email</Label>
              <p className="text-sm text-muted-foreground">Enviar notificaciones por correo electrónico</p>
            </div>
            <Switch
              id="enableEmailNotifications"
              checked={!!featuresConfig.enableEmailNotifications}
              onCheckedChange={(checked) => onToggleFeature('enableEmailNotifications', checked)}
              disabled={isLoading || !featuresConfig.enableNotifications}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
