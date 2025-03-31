
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

type TableColumn = {
  column_name: string;
  data_type: string;
  is_nullable: boolean;
};

// Esta función ejecuta una consulta que devuelve información sobre las columnas de una tabla
export function useTableColumns(tableName: string) {
  return useQuery({
    queryKey: ['table-columns', tableName],
    queryFn: async () => {
      if (!tableName) return [] as TableColumn[];
      
      try {
        // Consulta a information_schema para obtener todas las columnas de la tabla
        const { data, error } = await supabase
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable')
          .eq('table_name', tableName)
          .eq('table_schema', 'public');
            
        if (error) throw error;
        return data as TableColumn[];
      } catch (error) {
        console.error('Error fetching table columns:', error);
        // En caso de error, devolver un array vacío
        return [] as TableColumn[];
      }
    },
    // Deshabilitamos la re-obtención automática
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000, // 1 hora de caché
    enabled: !!tableName
  });
}
