
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Users, 
  LogIn, 
  UserCheck,
  ClipboardList
} from 'lucide-react';
import { FeaturesConfig } from '@/contexts/features/types';

interface SecuritySettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Seguridad
        </h2>
        <p className="text-muted-foreground">
          Configura las opciones de seguridad y autenticación del sistema
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Autenticación
            </CardTitle>
            <CardDescription>Configura cómo los usuarios inician sesión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="2fa">Autenticación de dos factores</Label>
                <p className="text-sm text-muted-foreground">Requerir 2FA para usuarios</p>
              </div>
              <Switch
                id="2fa"
                checked={!!featuresConfig.enable2FA}
                onCheckedChange={(checked) => onToggleFeature('enable2FA', checked)}
                disabled={isLoading}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="multipleSessions">Sesiones múltiples</Label>
                <p className="text-sm text-muted-foreground">Permitir iniciar sesión en varios dispositivos</p>
              </div>
              <Switch
                id="multipleSessions"
                checked={!!featuresConfig.enableMultipleSessions}
                onCheckedChange={(checked) => onToggleFeature('enableMultipleSessions', checked)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Registro de usuarios
            </CardTitle>
            <CardDescription>Configura cómo los usuarios se registran</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="publicRegistration">Registro público</Label>
                <p className="text-sm text-muted-foreground">Permitir registro público de usuarios</p>
              </div>
              <Switch
                id="publicRegistration"
                checked={!!featuresConfig.enablePublicRegistration}
                onCheckedChange={(checked) => onToggleFeature('enablePublicRegistration', checked)}
                disabled={isLoading}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailVerification">Verificación por email</Label>
                <p className="text-sm text-muted-foreground">Requerir verificación de email</p>
              </div>
              <Switch
                id="emailVerification"
                checked={!!featuresConfig.requireEmailVerification}
                onCheckedChange={(checked) => onToggleFeature('requireEmailVerification', checked)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Registro de actividad
            </CardTitle>
            <CardDescription>Configura el registro de actividad de usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="activityLog">Registro de actividad</Label>
                <p className="text-sm text-muted-foreground">Mantener registro de actividad de usuarios</p>
              </div>
              <Switch
                id="activityLog"
                checked={!!featuresConfig.enableActivityLog}
                onCheckedChange={(checked) => onToggleFeature('enableActivityLog', checked)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecuritySettings;
