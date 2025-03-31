
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ShieldCheck, Lock, KeyRound, Fingerprint, Loader2 } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckboxWithLabel } from '@/components/ui/checkbox';

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
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          Seguridad
        </CardTitle>
        <CardDescription className="text-xs">
          Configura las opciones de seguridad y autenticación
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Autenticación de múltiples factores</h3>
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
                checked={false}
                disabled={true}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Registro con redes sociales</h3>
              <p className="text-xs text-muted-foreground">
                Permite iniciar sesión con Google, Facebook, etc.
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableSocial"
                checked={featuresConfig.enableSocial}
                onCheckedChange={(value) => onToggleFeature('enableSocial', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Bloqueo de cuentas</h3>
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
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Políticas de contraseñas</h3>
              <p className="text-xs text-muted-foreground">
                Establece requisitos mínimos para contraseñas seguras
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enablePasswordPolicy"
                checked={featuresConfig.enablePasswordPolicy}
                onCheckedChange={(value) => onToggleFeature('enablePasswordPolicy', value)}
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
