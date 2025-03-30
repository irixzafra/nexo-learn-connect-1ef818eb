
import React from 'react';
import { UserProfile, UserRole } from '@/types/auth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { UserRoleType } from "@/features/users/UserRoleType";

interface UserRolesTableProps {
  users: UserProfile[];
  isLoading: boolean;
  handleRoleChange: (userId: string, newRole: UserRole) => Promise<void>;
}

const UserRolesTable: React.FC<UserRolesTableProps> = ({ 
  users, 
  isLoading, 
  handleRoleChange 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Rol Actual</TableHead>
            <TableHead>Cambiar Rol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.full_name || 'Usuario sin nombre'}
                </TableCell>
                <TableCell>
                  <UserRoleType role={user.role as UserRole} />
                </TableCell>
                <TableCell>
                  <UserRoleSwitcher 
                    userId={user.id}
                    currentRole={user.role as UserRole}
                    onRoleChange={handleRoleChange}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center h-24">
                No se encontraron usuarios con los criterios de búsqueda
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserRolesTable;
