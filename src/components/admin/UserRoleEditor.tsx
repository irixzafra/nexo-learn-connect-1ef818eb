
import React, { useState } from 'react';
import { UserRole } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';
import { UserCog, Shield, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface UserRoleEditorProps {
  userId: string;
  userName: string;
  currentRole: UserRole;
  onRoleChanged?: () => void;
}

const UserRoleEditor: React.FC<UserRoleEditorProps> = ({ 
  userId,
  userName,
  currentRole,
  onRoleChanged
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const handleRoleChange = async () => {
    if (selectedRole === currentRole) {
      return;
    }
    
    setIsUpdating(true);
    setIsSuccess(false);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          role: selectedRole,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        console.error('Error al actualizar el rol:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo actualizar el rol del usuario.",
        });
        return;
      }
      
      toast({
        title: "Rol actualizado",
        description: `El rol de "${userName}" ha sido actualizado a ${selectedRole}.`,
      });
      
      setIsSuccess(true);
      
      if (onRoleChanged) {
        onRoleChanged();
      }
    } catch (error) {
      console.error('Error en la actualización del rol:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al cambiar el rol del usuario.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <UserCog className="h-4 w-4" />;
      case 'student':
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Cambiar rol de usuario</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Select
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value as UserRole)}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
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
                <span>Estudiante</span>
              </SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            className="w-full sm:w-auto"
            variant={selectedRole !== currentRole ? "default" : "outline"}
            onClick={handleRoleChange}
            disabled={selectedRole === currentRole || isUpdating}
          >
            {isUpdating ? (
              <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></span>
            ) : isSuccess ? (
              <CheckCircle className="h-4 w-4 mr-1" />
            ) : (
              "Guardar cambios"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRoleEditor;
