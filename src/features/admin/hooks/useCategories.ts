
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  created_at: string;
}

export function useCategories() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw new Error(error.message);
      return data as Category[];
    }
  });

  const createCategory = useMutation({
    mutationFn: async (newCategory: Omit<Category, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('categories')
        .insert(newCategory)
        .select('*')
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Categoría creada",
        description: "La categoría ha sido creada exitosamente"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al crear la categoría: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const updateCategory = useMutation({
    mutationFn: async (category: Partial<Category> & { id: string }) => {
      const { data, error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', category.id)
        .select('*')
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Categoría actualizada",
        description: "La categoría ha sido actualizada exitosamente"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al actualizar la categoría: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Categoría eliminada",
        description: "La categoría ha sido eliminada exitosamente"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar la categoría: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const filteredCategories = categories?.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    categories,
    filteredCategories,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    createCategory,
    updateCategory,
    deleteCategory
  };
}
