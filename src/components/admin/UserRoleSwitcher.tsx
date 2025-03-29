
import React, { useState } from 'react';
import { UserRole } from '@/types/auth';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserCog } from 'lucide-react';

interface UserRoleSwitcherProps {
  userId: string;
  currentRole: UserRole;
  onRoleChange: (userId: string, newRole: UserRole) => Promise<void>;
}

export const UserRoleSwitcher: React.FC<UserRoleSwitcherProps> = ({ 
  userId,
  currentRole,
  onRoleChange
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [isChanging, setIsChanging] = useState(false);
  
  const handleChange = async () => {
    if (selectedRole !== currentRole) {
      setIsChanging(true);
      await onRoleChange(userId, selectedRole);
      setIsChanging(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedRole}
        onValueChange={(value) => setSelectedRole(value as UserRole)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Seleccionar rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="instructor">Instructor</SelectItem>
          <SelectItem value="student">Estudiante</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        size="sm" 
        variant={selectedRole !== currentRole ? "default" : "outline"}
        onClick={handleChange}
        disabled={selectedRole === currentRole || isChanging}
      >
        {isChanging ? (
          <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></span>
        ) : (
          <UserCog className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
