
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { UserProfile, UserRoleType } from "@/types/auth";
import { EditableDataTable } from "@/components/shared/EditableDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { UserRoleSelector } from "./UserRoleSelector";
import { Check, X, MoreHorizontal, UserIcon } from "lucide-react";
import { createColumn, createActionsColumn } from "@/components/shared/DataTableUtils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

export const UsersListTab: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setUsers(data as UserProfile[]);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUser = async (user: UserProfile) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: user.full_name,
          role: user.role,
          email: user.email,
          phone: user.phone
        })
        .eq("id", user.id);

      if (error) throw error;

      // Update the local state
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? user : u))
      );
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario");
      return Promise.reject(error);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="destructive">Administrador</Badge>;
      case "instructor":
        return <Badge variant="default">Instructor</Badge>;
      case "student":
        return <Badge variant="secondary">Estudiante</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const renderUserForm = ({ data, onChange }: { data: UserProfile | null; onChange: (data: UserProfile) => void }) => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nombre completo</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={data?.full_name || ""}
            onChange={(e) => onChange({ ...data, full_name: e.target.value } as UserProfile)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            value={data?.email || ""}
            onChange={(e) => onChange({ ...data, email: e.target.value } as UserProfile)}
            disabled
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Teléfono</label>
          <input
            type="tel"
            className="w-full p-2 border rounded-md"
            value={data?.phone || ""}
            onChange={(e) => onChange({ ...data, phone: e.target.value } as UserProfile)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Rol</label>
          <UserRoleSelector
            value={data?.role as UserRoleType}
            onChange={(role) => onChange({ ...data, role } as UserProfile)}
          />
        </div>
      </div>
    );
  };

  const columns: ColumnDef<UserProfile, any>[] = [
    createColumn<UserProfile>({
      accessorKey: "full_name",
      header: "Nombre",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("full_name") || "Usuario sin nombre"}</span>
        </div>
      ),
    }),
    createColumn<UserProfile>({
      accessorKey: "email",
      header: "Email",
    }),
    createColumn<UserProfile>({
      accessorKey: "role",
      header: "Rol",
      cell: ({ getValue }) => getRoleBadge(getValue() as string),
    }),
    createColumn<UserProfile>({
      accessorKey: "created_at",
      header: "Fecha de registro",
      cell: ({ getValue }) => format(new Date(getValue() as string), "dd/MM/yyyy"),
    }),
    createActionsColumn<UserProfile>(() => (
      <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    )),
  ];

  return (
    <Card className="p-4">
      <EditableDataTable
        columns={columns}
        data={users}
        title="Usuario"
        description="Información del usuario"
        searchPlaceholder="Buscar usuario..."
        searchColumn="full_name"
        exportFilename="usuarios"
        onSave={handleSaveUser}
        renderForm={renderUserForm}
        emptyState={
          <div className="text-center py-10">
            <UserIcon className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No se encontraron usuarios</p>
          </div>
        }
      />
    </Card>
  );
};
