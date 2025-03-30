
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

export interface Permission {
  id: string;
  code: string;
  name: string;
  description: string | null;
  category: string | null;
  created_at: string;
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const fetchPermissions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('permissions')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching permissions:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los permisos.",
        });
        return;
      }
      
      setPermissions(data || []);
    } catch (error) {
      console.error('Error in fetchPermissions:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al obtener los permisos.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const getPermissionsByCategory = () => {
    const result: Record<string, Permission[]> = {};
    
    permissions.forEach(permission => {
      const category = permission.category || 'Other';
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(permission);
    });
    
    return result;
  };

  return {
    permissions,
    permissionsByCategory: getPermissionsByCategory(),
    isLoading,
    fetchPermissions
  };
}
