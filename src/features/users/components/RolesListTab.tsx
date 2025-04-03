
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { UserRole } from "@/types/auth/UserRole";
import { EditableDataTable } from "@/components/shared/EditableDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X, Shield, Key, Users } from "lucide-react";
import { createColumn, createActionsColumn } from "@/components/shared/DataTableUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export const RolesListTab: React.FC = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("roles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setRoles(data as UserRole[]);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Error al cargar los roles");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRole = async (role: UserRole) => {
    try {
      const { error } = await supabase
        .from("roles")
        .update({
          name: role.name,
          description: role.description,
        })
        .eq("id", role.id);

      if (error) throw error;

      // Update the local state
      setRoles((prevRoles) =>
        prevRoles.map((r) => (r.id === role.id ? role : r))
      );
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Error al actualizar el rol");
      return Promise.reject(error);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    try {
      const { error } = await supabase
        .from("roles")
        .delete()
        .eq("id", roleId);

      if (error) throw error;

      // Update the local state
      setRoles((prevRoles) => prevRoles.filter((r) => r.id !== roleId));
      toast.success("Rol eliminado correctamente");
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Error al eliminar el rol");
    }
  };

  const handleAddRole = async () => {
    try {
      const newRole: Partial<UserRole> = {
        name: "Nuevo Rol",
        description: "Descripción del nuevo rol",
      };

      const { data, error } = await supabase
        .from("roles")
        .insert([newRole])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setRoles((prevRoles) => [...prevRoles, data[0] as UserRole]);
        toast.success("Rol creado correctamente");
      }
    } catch (error) {
      console.error("Error adding role:", error);
      toast.error("Error al crear el rol");
    }
  };

  const renderRoleForm = ({ data, onChange }: { data: UserRole | null; onChange: (data: UserRole) => void }) => {
    if (!data) return null;
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nombre del rol</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={data.name || ""}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={data.description || ""}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Permisos</label>
          <div className="bg-muted/40 p-4 rounded-md text-center">
            <Key className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              La gestión de permisos estará disponible próximamente
            </p>
          </div>
        </div>
      </div>
    );
  };

  const columns: ColumnDef<UserRole>[] = [
    createColumn<UserRole>({
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      ),
    }),
    createColumn<UserRole>({
      accessorKey: "description",
      header: "Descripción",
    }),
    createColumn<UserRole>({
      accessorKey: "created_at",
      header: "Fecha de creación",
      cell: ({ getValue }) => format(new Date(getValue() as string), "dd/MM/yyyy"),
    }),
    createActionsColumn<UserRole>(({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost" 
          className="h-8 w-8 p-0"
          onClick={() => handleDeleteRole(row.original.id)}
        >
          <X className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    )),
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Roles del Sistema</CardTitle>
        <Button size="sm" onClick={handleAddRole}>
          <Shield className="h-4 w-4 mr-2" />
          Nuevo Rol
        </Button>
      </CardHeader>
      <CardContent>
        <EditableDataTable<UserRole>
          columns={columns}
          data={roles}
          title="Rol"
          description="Información del rol"
          searchPlaceholder="Buscar rol..."
          searchColumn="name"
          exportFilename="roles"
          onSave={handleSaveRole}
          renderForm={renderRoleForm}
          emptyState={
            <div className="text-center py-10">
              <Shield className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron roles</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleAddRole}
              >
                Crear un nuevo rol
              </Button>
            </div>
          }
        />
      </CardContent>
    </Card>
  );
};
