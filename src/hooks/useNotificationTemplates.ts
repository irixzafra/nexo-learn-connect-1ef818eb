
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { NotificationType } from '@/types/notifications';

export interface NotificationTemplate {
  id: string;
  name: string;
  description: string;
  type: NotificationType;
  title_template: string;
  content_template: string;
  created_at: string;
  updated_at: string;
}

export const useNotificationTemplates = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  // Fetch notification templates
  const {
    data: templates = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['notification-templates'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('notification_templates')
          .select('*')
          .order('name');

        if (error) {
          console.error('Error fetching notification templates:', error);
          setError(error.message);
          return [];
        }

        return data as NotificationTemplate[];
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Ocurrió un error inesperado');
        return [];
      }
    },
  });

  // Create notification template
  const createTemplate = useMutation({
    mutationFn: async (template: Omit<NotificationTemplate, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('notification_templates')
        .insert(template)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
      toast.success('Plantilla creada exitosamente');
    },
    onError: (error: Error) => {
      console.error('Error creating template:', error);
      toast.error(`Error al crear plantilla: ${error.message}`);
    },
  });

  // Update notification template
  const updateTemplate = useMutation({
    mutationFn: async ({
      id,
      ...template
    }: Partial<NotificationTemplate> & { id: string }) => {
      const { data, error } = await supabase
        .from('notification_templates')
        .update(template)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
      toast.success('Plantilla actualizada exitosamente');
    },
    onError: (error: Error) => {
      console.error('Error updating template:', error);
      toast.error(`Error al actualizar plantilla: ${error.message}`);
    },
  });

  // Delete notification template
  const deleteTemplate = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('notification_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
      toast.success('Plantilla eliminada exitosamente');
    },
    onError: (error: Error) => {
      console.error('Error deleting template:', error);
      toast.error(`Error al eliminar plantilla: ${error.message}`);
    },
  });

  return {
    templates,
    isLoading,
    error,
    refreshTemplates: refetch,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  };
};
