
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { ShieldCheck, Users, CheckCircle, KeyRound, Fingerprint, AlertCircle, UserCog, Link, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SecuritySettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      {/* Gestión de Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Roles</CardTitle>
          <CardDescription>
            Administra los roles y permisos en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Roles de Usuario</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure, modifique y asigne roles a los usuarios de la plataforma
                  </p>
                </div>
              </div>
              <Button>
                Ir a Gestión de Roles
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="enable_role_switcher">Visibilidad "View As"</Label>
              <p className="text-sm text-muted-foreground">
                Permite a los administradores ver la plataforma como diferentes roles de usuario
              </p>
            </div>
            <Switch 
              id="enable_role_switcher"
              checked={featuresConfig.enable_role_switcher || false}
              onCheckedChange={(checked) => onToggleFeature('enable_role_switcher', checked)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="enable_role_management">Gestión Avanzada de Roles</Label>
              <p className="text-sm text-muted-foreground">
                Habilita creación y personalización de roles con permisos granulares
              </p>
            </div>
            <Switch 
              id="enable_role_management"
              checked={featuresConfig.enable_role_management || false}
              onCheckedChange={(checked) => onToggleFeature('enable_role_management', checked)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Configuración de Acceso */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Acceso</CardTitle>
          <CardDescription>
            Configura políticas de registro y acceso a la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="allow_public_registration">Permitir Registro Público</Label>
              <p className="text-sm text-muted-foreground">
                Permite que cualquier persona se registre en la plataforma
              </p>
            </div>
            <Switch 
              id="allow_public_registration"
              checked={true}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="require_email_verification">Verificación de Email</Label>
              <p className="text-sm text-muted-foreground">
                Requiere verificación de email antes de permitir acceso completo
              </p>
            </div>
            <Switch 
              id="require_email_verification"
              checked={true}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="allow_password_recovery">Recuperación de Contraseña</Label>
              <p className="text-sm text-muted-foreground">
                Permite a los usuarios recuperar su contraseña por email
              </p>
            </div>
            <Switch 
              id="allow_password_recovery"
              checked={true}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="default_access_level">Rol por Defecto para Nuevos Usuarios</Label>
            <Select defaultValue="student">
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol por defecto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Estudiante</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Seguridad Adicional */}
      <Card>
        <CardHeader>
          <CardTitle>Seguridad Adicional</CardTitle>
          <CardDescription>
            Configura opciones avanzadas de seguridad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="enable_2fa">Autenticación de Dos Factores (2FA)</Label>
                <Badge variant="outline">Próximamente</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Habilita 2FA para mayor seguridad en las cuentas
              </p>
            </div>
            <Switch 
              id="enable_2fa"
              disabled={true}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="session_timeout">Tiempo Límite de Sesión (minutos)</Label>
            <Input id="session_timeout" type="number" min="5" defaultValue="60" />
            <p className="text-xs text-muted-foreground">
              Tiempo máximo de inactividad antes de cerrar sesión automáticamente
            </p>
          </div>
          
          <div className="rounded-md border p-4 space-y-4">
            <h3 className="font-medium">Política de Contraseñas</h3>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="min_password_length">Longitud Mínima</Label>
                <Input 
                  id="min_password_length" 
                  type="number" 
                  min="6" 
                  max="32"
                  defaultValue="8"
                  className="w-20" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Requerir Caracteres Especiales</Label>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Requerir Mayúsculas y Minúsculas</Label>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Requerir Números</Label>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="password_expiry_days">Caducidad (días)</Label>
                <Input 
                  id="password_expiry_days" 
                  type="number" 
                  min="0" 
                  max="365"
                  defaultValue="0"
                  className="w-20" 
                />
              </div>
              <p className="text-xs text-muted-foreground">0 = Sin caducidad</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline">
              Restablecer Defaults
            </Button>
            <Button>
              Guardar Configuración
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Sesiones Activas */}
      <Card>
        <CardHeader>
          <CardTitle>Sesiones Activas</CardTitle>
          <CardDescription>
            Gestiona las sesiones activas de los administradores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border divide-y">
            <div className="p-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">admin@nexo.com</h4>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Actual</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Madrid, España • Chrome en Windows</p>
                  <p className="text-xs text-muted-foreground">Activo ahora • IP: 123.45.67.89</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" disabled>
                <LogOut className="h-4 w-4 mr-1" />
                Cerrar
              </Button>
            </div>
            
            <div className="p-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">admin@nexo.com</h4>
                  <p className="text-sm text-muted-foreground">Barcelona, España • Firefox en macOS</p>
                  <p className="text-xs text-muted-foreground">Último acceso: hace 2 horas • IP: 234.56.78.90</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-1" />
                Cerrar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
