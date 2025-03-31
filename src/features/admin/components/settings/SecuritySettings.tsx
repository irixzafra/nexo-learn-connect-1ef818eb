
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ShieldCheck, Loader2 } from 'lucide-react';
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
    <Card className="shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center mb-2">
          <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
          <h2 className="text-xl font-semibold">Seguridad</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Configura las opciones de seguridad y autenticación
        </p>

        <div className="space-y-6">
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="text-base font-medium">Autenticación de múltiples factores</h3>
              <p className="text-sm text-muted-foreground">
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
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="text-base font-medium">Bloqueo de cuentas</h3>
              <p className="text-sm text-muted-foreground">
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
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="text-base font-medium">Registros de auditoría</h3>
              <p className="text-sm text-muted-foreground">
                Mantiene un registro detallado de todas las actividades
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableAuditLog"
                checked={false}
                disabled={true}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="text-base font-medium">Cifrado de datos sensibles</h3>
              <p className="text-sm text-muted-foreground">
                Protege información crítica mediante cifrado avanzado
              </p>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200 mt-1">Próximamente</Badge>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableDataEncryption"
                checked={false}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
