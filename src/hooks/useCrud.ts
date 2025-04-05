
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface CrudOptions<T> {
  tableName: string;
  primaryKey?: string;
  onSuccess?: (action: 'create' | 'update' | 'delete', data?: T) => void;
  onError?: (error: Error, action: 'create' | 'update' | 'delete') => void;
  successMessages?: {
    create?: string;
    update?: string;
    delete?: string;
  };
  errorMessages?: {
    create?: string;
    update?: string;
    delete?: string;
  };
}

export function useCrud<T extends Record<string, any>>(options: CrudOptions<T>) {
  const {
    tableName,
    primaryKey = 'id',
    onSuccess,
    onError,
    successMessages = {
      create: 'Creado correctamente',
      update: 'Actualizado correctamente',
      delete: 'Eliminado correctamente'
    },
    errorMessages = {
      create: 'Error al crear',
      update: 'Error al actualizar',
      delete: 'Error al eliminar'
    }
  } = options;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (data: Omit<T, typeof primaryKey>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const timestamp = new Date().toISOString();
      const dataWithTimestamps = {
        ...data,
        created_at: timestamp,
        updated_at: timestamp
      };
      
      const { data: result, error: supabaseError } = await supabase
        .from(tableName)
        .insert([dataWithTimestamps])
        .select()
        .single();
      
      if (supabaseError) throw supabaseError;
      
      toast.success(successMessages.create);
      onSuccess?.('create', result as T);
      
      return result as T;
    } catch (err) {
      const error = err as Error;
      console.error(`Error creating ${tableName}:`, error);
      toast.error(errorMessages.create);
      setError(error);
      onError?.(error, 'create');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: Partial<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: result, error: supabaseError } = await supabase
        .from(tableName)
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq(primaryKey, id)
        .select()
        .single();
      
      if (supabaseError) throw supabaseError;
      
      toast.success(successMessages.update);
      onSuccess?.('update', result as T);
      
      return result as T;
    } catch (err) {
      const error = err as Error;
      console.error(`Error updating ${tableName}:`, error);
      toast.error(errorMessages.update);
      setError(error);
      onError?.(error, 'update');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const { error: supabaseError } = await supabase
        .from(tableName)
        .delete()
        .eq(primaryKey, id);
      
      if (supabaseError) throw supabaseError;
      
      toast.success(successMessages.delete);
      onSuccess?.('delete');
      
      return true;
    } catch (err) {
      const error = err as Error;
      console.error(`Error deleting ${tableName}:`, error);
      toast.error(errorMessages.delete);
      setError(error);
      onError?.(error, 'delete');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id: string): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from(tableName)
        .select('*')
        .eq(primaryKey, id)
        .single();
      
      if (supabaseError) throw supabaseError;
      
      return data as T;
    } catch (err) {
      const error = err as Error;
      console.error(`Error fetching ${tableName}:`, error);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAll = async (): Promise<T[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (supabaseError) throw supabaseError;
      
      return data as T[];
    } catch (err) {
      const error = err as Error;
      console.error(`Error fetching ${tableName} list:`, error);
      setError(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    update,
    remove,
    getById,
    getAll,
    loading,
    error
  };
}
