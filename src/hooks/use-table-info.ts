
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

type TableColumn = {
  column_name: string;
  data_type: string;
  is_nullable: boolean;
};

// Esta función ejecuta una RPC que devuelve información sobre las columnas de una tabla
export function useTableColumns(tableName: string) {
  return useQuery({
    queryKey: ['table-columns', tableName],
    queryFn: async () => {
      try {
        // Primero, verificamos si tenemos la función RPC para obtener columnas
        const { data: functions } = await supabase
          .from('pg_proc')
          .select('proname')
          .eq('proname', 'get_table_columns')
          .single();
          
        // Si no existe la función, creamos nuestra propia consulta
        if (!functions) {
          const { data, error } = await supabase
            .from('information_schema.columns')
            .select('column_name, data_type, is_nullable')
            .eq('table_name', tableName)
            .eq('table_schema', 'public');
            
          if (error) throw error;
          return data as TableColumn[];
        } else {
          // Si existe la RPC, la usamos
          const { data, error } = await supabase
            .rpc('get_table_columns', { table_name: tableName });
            
          if (error) throw error;
          return data as TableColumn[];
        }
      } catch (error) {
        console.error('Error fetching table columns:', error);
        // En caso de error, devolver un array vacío
        return [] as TableColumn[];
      }
    },
    // Deshabilitamos la re-obtención automática
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000, // 1 hora de caché
  });
}
