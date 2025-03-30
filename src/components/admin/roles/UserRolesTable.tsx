
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
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { UserRoleType } from "@/features/users/UserRoleType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const handleEmailUser = (email?: string) => {
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="overflow-x-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[250px]">Usuario</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol Actual</TableHead>
            <TableHead>Cambiar Rol</TableHead>
            <TableHead className="w-[80px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url || ''} alt={user.full_name || 'Usuario'} />
                      <AvatarFallback>{getInitials(user.full_name || 'Usuario sin nombre')}</AvatarFallback>
                    </Avatar>
                    <div>
                      {user.full_name || 'Usuario sin nombre'}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email || '-'}</TableCell>
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
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEmailUser(user.email)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Ver perfil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24">
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
