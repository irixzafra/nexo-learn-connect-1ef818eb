
import React, { useState, useEffect } from 'react';
import { UserRoleType, asUserRoleType } from '@/types/auth';
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

interface RoleOption {
  id: string;
  name: string;
  description: string | null;
}

interface UserRoleEditorProps {
  userId: string;
  userName: string;
  currentRole: UserRoleType;
  onRoleChanged?: () => void;
}

const UserRoleEditor: React.FC<UserRoleEditorProps> = ({ 
  userId,
  userName,
  currentRole,
  onRoleChanged
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRoleType>(currentRole);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<RoleOption[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Cargar los roles disponibles desde la base de datos
    const fetchRoles = async () => {
      try {
        const { data, error } = await supabase
          .from('roles')
          .select('id, name, description')
          .order('name');
          
        if (error) {
          console.error('Error fetching roles:', error);
          return;
        }
        
        setAvailableRoles(data || []);
      } catch (error) {
        console.error('Error loading roles:', error);
      }
    };
    
    fetchRoles();
  }, []);
  
  const handleRoleChange = async () => {
    if (selectedRole === currentRole) {
      return;
    }
    
    setIsUpdating(true);
    setIsSuccess(false);
    
    try {
      // 1. Actualizar el rol en la tabla profiles (para compatibilidad)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          role: selectedRole,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (profileError) {
        console.error('Error al actualizar el rol en el perfil:', profileError);
        throw profileError;
      }
      
      // 2. Buscar el ID del rol seleccionado
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .select('id')
        .eq('name', selectedRole)
        .single();
        
      if (roleError || !roleData) {
        console.error('Error al buscar el rol:', roleError);
        throw roleError || new Error('No se encontró el rol');
      }
      
      // 3. Eliminar los roles actuales del usuario
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
        
      if (deleteError) {
        console.error('Error al eliminar roles actuales:', deleteError);
      }
      
      // 4. Asignar el nuevo rol
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role_id: roleData.id
        });
        
      if (insertError) {
        console.error('Error al asignar el nuevo rol:', insertError);
        throw insertError;
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

  const getRoleIcon = (role: UserRoleType) => {
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
            onValueChange={(value) => setSelectedRole(asUserRoleType(value))}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <div className="flex items-center gap-2">
                {getRoleIcon(selectedRole)}
                <SelectValue placeholder="Seleccionar rol" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {availableRoles.map(role => (
                <SelectItem key={role.id} value={role.name}>
                  <div className="flex items-center gap-2">
                    {role.name === 'admin' && <Shield className="h-4 w-4" />}
                    {role.name === 'instructor' && <UserCog className="h-4 w-4" />}
                    <span>{role.name}</span>
                  </div>
                </SelectItem>
              ))}
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
