
import React, { useState } from 'react';
import { Shield, User, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GlobalDataTable } from '@/components/global-table';
import { TableColumn } from '@/components/global-table/types';
import { TableDrawer } from '@/components/global-table/TableDrawer';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';

interface Role {
  id: string;
  name: string;
  description: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

const RoleManagement: React.FC = () => {
  const { toast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Define table columns
  const columns: TableColumn<Role>[] = [
    {
      id: 'name',
      header: 'Nombre',
      accessorKey: 'name',
      type: 'text',
      required: true,
      editable: true,
    },
    {
      id: 'description',
      header: 'Descripción',
      accessorKey: 'description',
      type: 'text',
      editable: true,
    },
    {
      id: 'is_default',
      header: 'Por defecto',
      accessorKey: 'is_default',
      type: 'boolean',
      editable: true,
      cell: ({ getValue }) => {
        const isDefault = getValue() as boolean;
        return isDefault ? (
          <Badge className="bg-primary hover:bg-primary/80">Por defecto</Badge>
        ) : null;
      }
    },
    {
      id: 'updated_at',
      header: 'Actualizado',
      accessorKey: 'updated_at',
      type: 'date',
      editable: false,
    },
  ];

  // Handle role creation
  const handleCreate = () => {
    setSelectedRole(null);
    setIsDrawerOpen(true);
  };

  // Handle role editing
  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsDrawerOpen(true);
  };

  // Handle role deletion
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('roles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: 'Rol eliminado',
        description: 'El rol ha sido eliminado correctamente',
      });
    } catch (error) {
      console.error('Error al eliminar rol:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el rol',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission for create/update
  const handleSubmit = async (data: Role) => {
    setIsLoading(true);
    try {
      if (selectedRole) {
        // Update existing role
        const { error } = await supabase
          .from('roles')
          .update({
            name: data.name,
            description: data.description,
            is_default: data.is_default,
          })
          .eq('id', selectedRole.id);
        
        if (error) throw error;
        
        toast({
          title: 'Rol actualizado',
          description: 'El rol ha sido actualizado correctamente',
        });
      } else {
        // Create new role
        const { error } = await supabase
          .from('roles')
          .insert({
            name: data.name,
            description: data.description,
            is_default: data.is_default || false,
          });
        
        if (error) throw error;
        
        toast({
          title: 'Rol creado',
          description: 'El rol ha sido creado correctamente',
        });
      }
      
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error al guardar rol:', error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar el rol',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center">
            <Shield className="mr-2 h-5 w-5" /> Gestión de Roles
          </h1>
          <p className="text-muted-foreground">
            Administra los roles del sistema y sus permisos
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Rol
        </Button>
      </div>

      <Card>
        <GlobalDataTable<Role>
          tablePath="roles"
          columns={columns}
          title="Roles"
          description="Lista de roles del sistema"
          searchPlaceholder="Buscar roles..."
          onEdit={handleEdit}
          onDelete={handleDelete}
          showSearch={true}
          exportable={true}
          exportFilename="roles"
          emptyState={
            <div className="flex flex-col items-center justify-center py-10">
              <Shield className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-center">No hay roles definidos</p>
              <Button variant="outline" className="mt-4" onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" /> Añadir el primer rol
              </Button>
            </div>
          }
        />
      </Card>

      <TableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedRole ? "Editar Rol" : "Crear Rol"}
        data={selectedRole}
        columns={columns}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RoleManagement;
