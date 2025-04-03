
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DownloadIcon, ZoomInIcon, ZoomOutIcon, RefreshCwIcon } from 'lucide-react';
import { UserRoleType } from '@/types/auth';

interface NavigationFlowControlsProps {
  activeRole: UserRoleType;
  setActiveRole: (role: UserRoleType) => void;
  showAllRoutes: boolean;
  setShowAllRoutes: (show: boolean) => void;
  onExport?: () => void;
  onRefresh?: () => void;
}

const NavigationFlowControls: React.FC<NavigationFlowControlsProps> = ({
  activeRole,
  setActiveRole,
  showAllRoutes,
  setShowAllRoutes,
  onExport,
  onRefresh,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4 p-3 border rounded-md bg-muted/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <Label htmlFor="role-selector">Ver como rol</Label>
          <Select
            value={activeRole}
            onValueChange={(value) => setActiveRole(value as UserRoleType)}
          >
            <SelectTrigger id="role-selector" className="w-[180px]">
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Estudiante</SelectItem>
              <SelectItem value="profesor">Instructor</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="sistemas">Sistemas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="show-all"
            checked={showAllRoutes}
            onCheckedChange={setShowAllRoutes}
          />
          <Label htmlFor="show-all">Mostrar todas las rutas</Label>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCwIcon className="h-4 w-4 mr-1" />
          Refrescar
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <DownloadIcon className="h-4 w-4 mr-1" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default NavigationFlowControls;
