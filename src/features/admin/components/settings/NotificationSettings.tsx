
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Mail, Smartphone, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { FeaturesConfig } from '@/contexts/features/types';

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
          <Bell className="h-5 w-5 text-indigo-500" />
          Notificaciones
        </CardTitle>
        <CardDescription>
          Configura las opciones del sistema de notificaciones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableNotifications">Habilitar notificaciones</Label>
            <p className="text-sm text-muted-foreground">
              Activar el sistema de notificaciones en la plataforma
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableNotifications"
              checked={!!featuresConfig.enableNotifications}
              onCheckedChange={(value) => onToggleFeature('enableNotifications', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-500" />
            Notificaciones por correo electrónico
          </h3>
          <div className="space-y-4 ml-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableEmailNotifications">Notificaciones por email</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar notificaciones importantes por correo electrónico
                </p>
              </div>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id="enableEmailNotifications"
                  checked={!!featuresConfig.enableEmailNotifications}
                  onCheckedChange={(value) => onToggleFeature('enableEmailNotifications', value)}
                  disabled={isLoading || !featuresConfig.enableNotifications}
                />
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-blue-500" />
            Notificaciones push
          </h3>
          <div className="space-y-4 ml-6">
            <div className="bg-muted/50 p-4 rounded-md border border-dashed">
              <div className="flex gap-2 items-start">
                <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Las notificaciones push están actualmente en desarrollo y estarán disponibles próximamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            Programación
          </h3>
          <div className="space-y-4 ml-6">
            <div className="bg-muted/50 p-4 rounded-md border border-dashed">
              <div className="flex gap-2 items-start">
                <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    La programación de notificaciones está actualmente en desarrollo y estará disponible próximamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
