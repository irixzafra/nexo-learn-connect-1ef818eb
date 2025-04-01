
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Lock, Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface DatabaseSettingsProps {
  isLoading?: boolean;
}

const DatabaseSettings: React.FC<DatabaseSettingsProps> = ({ isLoading = false }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-indigo-500" />
          Base de Datos
        </CardTitle>
        <CardDescription>
          Configuración y herramientas relacionadas con la base de datos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-4 border border-dashed">
          <div className="flex items-center mb-4">
            <Lock className="h-4 w-4 mr-2 text-amber-500" />
            <span className="text-muted-foreground font-medium">Funcionalidad restringida</span>
            <Badge variant="outline" className="ml-2">En desarrollo</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Esta sección está actualmente en desarrollo. Las opciones de configuración
            de base de datos estarán disponibles próximamente.
          </p>
        </div>

        <div className="flex items-center justify-between opacity-50">
          <div className="space-y-0.5">
            <Label htmlFor="enableBackups">Backups automáticos</Label>
            <p className="text-sm text-muted-foreground">
              Realiza copias de seguridad periódicas de la base de datos
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableBackups"
              disabled={true}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseSettings;
