
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Users, UserPlus, UserCheck, Shield, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { FeaturesConfig } from '@/contexts/features/types';

interface UserManagementSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

const UserManagementSettings: React.FC<UserManagementSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-500" />
          Gestión de Usuarios
        </CardTitle>
        <CardDescription>
          Configura las opciones relacionadas con la gestión de usuarios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-blue-500" />
            Registro de usuarios
          </h3>
          <div className="space-y-4 ml-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enablePublicRegistration">Registro público</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir que cualquier persona pueda registrarse
                </p>
              </div>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id="enablePublicRegistration"
                  checked={!!featuresConfig.enablePublicRegistration}
                  onCheckedChange={(value) => onToggleFeature('enablePublicRegistration', value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="requireEmailVerification">Verificación de email obligatoria</Label>
                <p className="text-sm text-muted-foreground">
                  Exigir que los usuarios verifiquen su correo electrónico
                </p>
              </div>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id="requireEmailVerification"
                  checked={!!featuresConfig.requireEmailVerification}
                  onCheckedChange={(value) => onToggleFeature('requireEmailVerification', value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-blue-500" />
            Opciones de cuenta
          </h3>
          <div className="space-y-4 ml-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableMultipleSessions">Sesiones múltiples</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir que un usuario tenga varias sesiones activas
                </p>
              </div>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id="enableMultipleSessions"
                  checked={!!featuresConfig.enableMultipleSessions}
                  onCheckedChange={(value) => onToggleFeature('enableMultipleSessions', value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-500" />
            Seguridad
          </h3>
          <div className="space-y-4 ml-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable2FA">Autenticación de dos factores (2FA)</Label>
                <p className="text-sm text-muted-foreground">
                  Habilitar la posibilidad de usar 2FA
                </p>
              </div>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id="enable2FA"
                  checked={!!featuresConfig.enable2FA}
                  onCheckedChange={(value) => onToggleFeature('enable2FA', value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableActivityLog">Registro de actividad</Label>
                <p className="text-sm text-muted-foreground">
                  Mantener un registro de las acciones de los usuarios
                </p>
              </div>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id="enableActivityLog"
                  checked={!!featuresConfig.enableActivityLog}
                  onCheckedChange={(value) => onToggleFeature('enableActivityLog', value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagementSettings;
