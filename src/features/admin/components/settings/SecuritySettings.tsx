
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ShieldCheck, Lock, KeyRound, Fingerprint, Loader2 } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface SecuritySettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          Seguridad
        </CardTitle>
        <CardDescription>
          Configura las opciones de seguridad y autenticación
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium text-sm">Autenticación de múltiples factores</h3>
              <p className="text-xs text-muted-foreground">
                Requiere verificación adicional durante el inicio de sesión
              </p>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200 mt-1">Próximamente</Badge>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableMFA"
                checked={featuresConfig.enableMFA || false}
                onCheckedChange={(value) => onToggleFeature('enableMFA', value)}
                disabled={true}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium text-sm">Registro con redes sociales</h3>
              <p className="text-xs text-muted-foreground">
                Permite iniciar sesión con Google, Facebook, etc.
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableSocialLogin"
                checked={featuresConfig.enableSocialLogin || false}
                onCheckedChange={(value) => onToggleFeature('enableSocialLogin', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium text-sm">Bloqueo de cuentas</h3>
              <p className="text-xs text-muted-foreground">
                Bloquea la cuenta después de varios intentos fallidos
              </p>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200 mt-1">Próximamente</Badge>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableAccountLocking"
                checked={false}
                disabled={true}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium text-sm">Políticas de contraseñas</h3>
              <p className="text-xs text-muted-foreground">
                Establece requisitos mínimos para contraseñas seguras
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enablePasswordPolicies"
                checked={featuresConfig.enablePasswordPolicies || false}
                onCheckedChange={(value) => onToggleFeature('enablePasswordPolicies', value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
