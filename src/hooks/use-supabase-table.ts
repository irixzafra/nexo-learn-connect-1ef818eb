
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface UseSupabaseTableOptions<TData> {
  tableName: string;
  queryKey?: string[];
  select?: string;
  orderBy?: { column: string; ascending?: boolean };
  filterBy?: { column: string; value: any }[];
  onError?: (error: Error) => void;
  transformer?: (data: any) => TData;
}

export function useSupabaseTable<TData extends Record<string, any> = Record<string, any>>({
  tableName,
  queryKey = [tableName],
  select = '*',
  orderBy,
  filterBy,
  onError,
  transformer
}: UseSupabaseTableOptions<TData>) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch data query
  const {
    data,
    error,
    isLoading: isQueryLoading,
    refetch
  } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        let query = supabase.from(tableName).select(select);
        
        // Apply filters if any
        if (filterBy && filterBy.length > 0) {
          filterBy.forEach(filter => {
            query = query.eq(filter.column, filter.value);
          });
        }
        
        // Apply ordering if specified
        if (orderBy) {
          query = query.order(orderBy.column, {
            ascending: orderBy.ascending ?? false
          });
        }
        
        const { data: queryData, error: queryError } = await query;
        
        if (queryError) throw queryError;
        
        // Fix type safety by proper type assertion
        if (transformer && queryData) {
          // First convert to unknown to avoid direct type conversion
          const unknownData = queryData as unknown[];
          return unknownData.map(item => transformer(item)) as TData[];
        }
        
        // Safely convert to TData[]
        return (queryData || []) as unknown as TData[];
      } catch (error) {
        console.error('Error fetching data:', error);
        if (onError) onError(error as Error);
        throw error;
      }
    }
  });
  
  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newItem: Partial<TData>) => {
      setIsLoading(true);
      try {
        const { data: newData, error } = await supabase
          .from(tableName)
          .insert([newItem])
          .select();
        
        if (error) throw error;
        return newData?.[0] as unknown as TData;
      } catch (error) {
        console.error('Error creating item:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success('Item created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create item');
      if (onError) onError(error as Error);
    }
  });
  
  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data: updateData }: { id: string; data: Partial<TData> }) => {
      setIsLoading(true);
      try {
        const { data: updatedData, error } = await supabase
          .from(tableName)
          .update(updateData)
          .eq('id', id)
          .select();
        
        if (error) throw error;
        return updatedData?.[0] as unknown as TData;
      } catch (error) {
        console.error('Error updating item:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success('Item updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update item');
      if (onError) onError(error as Error);
    }
  });
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      setIsLoading(true);
      try {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return id;
      } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success('Item deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete item');
      if (onError) onError(error as Error);
    }
  });
  
  return {
    data,
    isLoading: isLoading || isQueryLoading,
    error,
    refetch,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
  };
}
