
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
import { useToast } from '@/components/ui/use-toast';
import { UserCog, Shield, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UserRoleSwitcherProps {
  userId?: string;
  currentRole?: UserRole;
  onRoleChange?: (userId: string, newRole: UserRole) => Promise<void>;
}

export const UserRoleSwitcher: React.FC<UserRoleSwitcherProps> = ({ 
  userId,
  currentRole: propCurrentRole,
  onRoleChange
}) => {
  const { userRole: contextUserRole, user } = useAuth();
  const { toast } = useToast();
  
  // Use the role from props if provided, otherwise use the context
  const currentRole = propCurrentRole || contextUserRole || 'student';
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole as UserRole);
  const [isChanging, setIsChanging] = useState(false);
  
  const handleChange = async () => {
    if (selectedRole === currentRole) {
      return;
    }
    
    setIsChanging(true);
    
    try {
      if (onRoleChange && userId) {
        // Use the provided callback if available
        await onRoleChange(userId, selectedRole);
      } else {
        // This is for view-mode switching only (doesn't change actual role in DB)
        toast({
          title: "Modo de vista cambiado",
          description: `Ahora estás viendo la aplicación como ${selectedRole}`,
        });
        
        // You might want to update some context or state here
        // This is just a visual change and doesn't modify the database
      }
    } catch (error) {
      console.error('Error changing role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cambiar el rol",
      });
    } finally {
      setIsChanging(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <UserCog className="h-4 w-4" />;
      case 'student':
        return <User className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedRole}
        onValueChange={(value) => setSelectedRole(value as UserRole)}
      >
        <SelectTrigger className="w-[150px]">
          <div className="flex items-center gap-2">
            {getRoleIcon(selectedRole)}
            <SelectValue placeholder="Seleccionar rol" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Administrador</span>
            </div>
          </SelectItem>
          <SelectItem value="instructor">
            <div className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              <span>Instructor</span>
            </div>
          </SelectItem>
          <SelectItem value="student">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Estudiante</span>
            </div>
          </SelectItem>
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
