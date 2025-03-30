
import React, { useState } from "react";
import { PencilLine } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { UserProfile, UserRoleType } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { UserRoleDisplay } from "@/features/users/UserRoleType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface UserManagementListProps {
  users: UserProfile[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onRoleChange: (userId: string, newRole: UserRoleType) => void;
}

export const UserManagementList: React.FC<UserManagementListProps> = ({
  users,
  isLoading,
  searchTerm,
  setSearchTerm,
  onRoleChange
}) => {
  const filteredUsers = searchTerm.trim() === "" 
    ? users 
    : users.filter(user => 
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <CardTitle>Lista de Usuarios</CardTitle>
            <CardDescription>
              Gestiona los usuarios de la plataforma y sus roles
            </CardDescription>
          </div>
          <div className="relative mt-4 md:mt-0 w-full md:w-64">
            <Input
              type="search"
              placeholder="Buscar usuarios..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      aria-label="Seleccionar todos"
                    />
                  </TableHead>
                  <TableHead className="w-[250px]">Usuario</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="hidden md:table-cell">Fecha de registro</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox 
                          aria-label={`Seleccionar ${user.full_name || 'Usuario sin nombre'}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.full_name || 'Usuario sin nombre'}
                      </TableCell>
                      <TableCell>
                        <UserRoleDisplay role={user.role} showIcon={true} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(user.created_at || '').toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                          >
                            <PencilLine className="h-4 w-4" />
                          </Button>
                          <UserRoleSwitcher 
                            userId={user.id}
                            currentRole={user.role}
                            onRoleChange={onRoleChange}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      {searchTerm.trim() !== "" 
                        ? "No se encontraron usuarios que coincidan con la búsqueda." 
                        : "No hay usuarios para mostrar."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
