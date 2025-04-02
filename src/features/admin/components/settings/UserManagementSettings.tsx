
import React from 'react';
import { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';

interface UserManagementSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: ExtendedFeatureId | FeatureId, value: boolean) => void | Promise<void>;
  isLoading: boolean;
}

const UserManagementSettings: React.FC<UserManagementSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Gestión de Usuarios
        </h2>
        <p className="text-muted-foreground">
          Configura las opciones relacionadas con los usuarios y accesos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Usuarios</CardTitle>
          <CardDescription>
            Gestiona opciones de registro y acceso de usuarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enablePublicRegistration">Registro Público</Label>
              <p className="text-sm text-muted-foreground">Permitir registro abierto de nuevos usuarios</p>
            </div>
            <Switch
              id="enablePublicRegistration"
              checked={!!featuresConfig.enablePublicRegistration}
              onCheckedChange={(checked) => onToggleFeature('enablePublicRegistration', checked)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="requireEmailVerification">Verificación por Email</Label>
              <p className="text-sm text-muted-foreground">Requerir verificación de email al registrarse</p>
            </div>
            <Switch
              id="requireEmailVerification"
              checked={!!featuresConfig.requireEmailVerification}
              onCheckedChange={(checked) => onToggleFeature('requireEmailVerification', checked)}
              disabled={isLoading || !featuresConfig.enablePublicRegistration}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable2FA">Autenticación de Dos Factores</Label>
              <p className="text-sm text-muted-foreground">Habilitar 2FA para mayor seguridad</p>
            </div>
            <Switch
              id="enable2FA"
              checked={!!featuresConfig.enable2FA}
              onCheckedChange={(checked) => onToggleFeature('enable2FA', checked)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementSettings;
