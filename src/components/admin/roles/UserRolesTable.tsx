
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { UserAvatar } from '@/components/UserAvatar';
import { getInitials } from '@/lib/utils';

interface UserProfile {
  id: string;
  role: string;
  full_name: string;
  email?: string;
  avatar_url?: string;
}

interface UserRolesTableProps {
  users: UserProfile[];
  isLoading: boolean;
  handleRoleChange: (userId: string, newRole: string) => void;
}

const UserRolesTable: React.FC<UserRolesTableProps> = ({ 
  users, 
  isLoading, 
  handleRoleChange 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No se encontraron usuarios con los criterios de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Usuario</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[150px]">Rol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    src={user.avatar_url}
                    fallback={getInitials(user.full_name)}
                    className="h-8 w-8"
                  />
                  <span>{user.full_name}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select defaultValue={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserRolesTable;
