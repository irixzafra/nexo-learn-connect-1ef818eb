
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserRoleType } from '@/types/auth';
import { NavigationRoleEditor } from './NavigationRoleEditor';
import { SaveIcon, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigationItems } from '@/hooks/useNavigationItems';

export const NavigationManager: React.FC = () => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRoleType>('admin');
  const { 
    items, 
    isLoading, 
    saveNavigationChanges, 
    syncNavigationWithCode,
    hasUnsavedChanges
  } = useNavigationItems(selectedRole);
  
  const handleSaveChanges = async () => {
    try {
      await saveNavigationChanges();
      toast({
        title: "Cambios guardados",
        description: "La configuración de navegación ha sido actualizada correctamente.",
        variant: "success",
      });
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleSyncWithCode = async () => {
    try {
      await syncNavigationWithCode();
      toast({
        title: "Sincronización completada",
        description: "La navegación se ha sincronizado con la definición del código.",
        variant: "success",
      });
    } catch (error) {
      console.error('Error al sincronizar con código:', error);
      toast({
        title: "Error",
        description: "No se pudo sincronizar con el código. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs defaultValue={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRoleType)}>
          <TabsList>
            <TabsTrigger value="admin">Administrador</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="student">Participante</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSyncWithCode}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Sincronizar con código
          </Button>
          
          <Button
            onClick={handleSaveChanges}
            disabled={!hasUnsavedChanges || isLoading}
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            Guardar cambios
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <TabsContent value="admin" className="mt-0">
          <NavigationRoleEditor role="admin" />
        </TabsContent>
        <TabsContent value="instructor" className="mt-0">
          <NavigationRoleEditor role="instructor" />
        </TabsContent>
        <TabsContent value="student" className="mt-0">
          <NavigationRoleEditor role="student" />
        </TabsContent>
      </Card>
    </div>
  );
};
