import React from 'react';
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { UserProfile, UserRoleType } from "@/types/auth";
import { EnhancedDataTable } from "@/components/shared/EnhancedDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { UserRoleSelector } from "./UserRoleSelector";
import { Check, X, MoreHorizontal, UserIcon, Plus, UserPlus } from "lucide-react";
import { createColumn, createActionsColumn } from "@/components/shared/DataTableUtils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const UsersListTab: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<UserProfile>>({
    full_name: "",
    email: "",
    phone: "",
    role: "student" as UserRoleType
  });

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

  const handleCreateUser = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          full_name: newUser.full_name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
        })
        .select();

      if (error) throw error;

      toast.success("Usuario creado correctamente");
      setUsers((prevUsers) => [...prevUsers, data[0] as UserProfile]);
      setIsUserFormOpen(false);
      setNewUser({
        full_name: "",
        email: "",
        phone: "",
        role: "student" as UserRoleType
      });
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error al crear el usuario");
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
        return <Badge variant="outline">{role || 'Desconocido'}</Badge>;
    }
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
      accessorKey: "phone",
      header: "Teléfono",
      cell: ({ getValue }) => getValue() || "-",
    }),
    createColumn<UserProfile>({
      accessorKey: "created_at",
      header: "Fecha de registro",
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return date ? format(new Date(date), "dd/MM/yyyy") : "-";
      },
    }),
    createActionsColumn<UserProfile>(({ row }) => {
      const user = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Usuario</DialogTitle>
              <DialogDescription>
                Editar información del usuario
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  defaultValue={user.full_name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={user.email}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  defaultValue={user.phone || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Rol
                </Label>
                <div className="col-span-3">
                  <UserRoleSelector
                    value={user.role as UserRoleType}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }),
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>
            Gestiona los usuarios registrados en la plataforma
          </CardDescription>
        </div>
        <Button onClick={() => setIsUserFormOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </CardHeader>
      <CardContent>
        <EnhancedDataTable
          columns={columns}
          data={users}
          searchPlaceholder="Buscar usuario..."
          searchColumn="full_name"
          exportFilename="usuarios"
          emptyState={
            <div className="text-center py-10">
              <UserIcon className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron usuarios</p>
            </div>
          }
        />
      </CardContent>

      <Dialog open={isUserFormOpen} onOpenChange={setIsUserFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Usuario</DialogTitle>
            <DialogDescription>
              Completa la información para crear un nuevo usuario
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">
                Nombre
              </Label>
              <Input
                id="new-name"
                value={newUser.full_name}
                onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-email" className="text-right">
                Email
              </Label>
              <Input
                id="new-email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-phone" className="text-right">
                Teléfono
              </Label>
              <Input
                id="new-phone"
                value={newUser.phone || ""}
                onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-role" className="text-right">
                Rol
              </Label>
              <div className="col-span-3">
                <UserRoleSelector
                  value={newUser.role as UserRoleType}
                  onChange={(role) => setNewUser({...newUser, role})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserFormOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreateUser}>Crear Usuario</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
