
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SortingState, ColumnFiltersState, VisibilityState } from '@tanstack/react-table';
import { AdvancedDataTable } from '@/components/shared/AdvancedDataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { GlobalTableProps, GlobalTableRef, TableColumn } from './types';
import { constructColumns } from './utils';
import { renderCellContent, renderActions } from './renderers';

const GlobalDataTable = forwardRef<GlobalTableRef, GlobalTableProps>((
  { 
    tableName,
    title,
    description,
    data: propData,
    columns: propColumns,
    tablePath,
    autoFetch = true,
    queryKey,
    queryFn,
    emptyState,
    showToolbar = true,
    searchPlaceholder,
    searchColumn = 'all',
    showSearch = true,
    exportable = true,
    exportFilename,
    onCreate,
    onEdit,
    onDelete,
    onRowClick,
    createButtonLabel,
    hideColumns = [],
    renderCustomActions,
    defaultPageSize = 10,
    pageSizeOptions = [10, 20, 30, 50],
    defaultSorting = [],
    showColumnToggle = true,
  }, 
  ref
) => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  
  const finalQueryKey = queryKey || (tablePath ? [tablePath] : ['table-data']);
  
  const fetchData = async () => {
    if (propData) return propData;
    if (queryFn) return queryFn();
    if (!tablePath) throw new Error('Either data, queryFn, or tablePath must be provided');
    
    try {
      const { data, error } = await supabase
        .from(tablePath)
        .select('*');
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error loading data');
      return [];
    }
  };
  
  const {
    data: fetchedData = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: finalQueryKey,
    queryFn: fetchData,
    enabled: autoFetch && !propData
  });
  
  useImperativeHandle(ref, () => ({
    refresh: () => refetch(),
    getData: () => tableData
  }));
  
  const tableData = propData || fetchedData || [];
  
  const visibleColumns = propColumns.filter(col => !hideColumns.includes(col.id));
  
  const tableColumns = constructColumns(visibleColumns, {
    onEdit,
    onDelete,
    renderCustomActions
  });
  
  useEffect(() => {
    const initialVisibility = propColumns.reduce<Record<string, boolean>>((acc, col) => {
      acc[col.id] = col.hidden !== true;
      return acc;
    }, {});
    setColumnVisibility(initialVisibility);
  }, [propColumns]);
  
  const renderHeader = () => {
    if (!title && !createButtonLabel && !description) return null;
    
    return (
      <div className="mb-6">
        {title && <h2 className="text-2xl font-semibold">{title}</h2>}
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex-1"></div>
          {createButtonLabel && onCreate && (
            <Button onClick={onCreate}>
              <Plus className="h-4 w-4 mr-2" />
              {createButtonLabel}
            </Button>
          )}
        </div>
      </div>
    );
  };
  
  if (error) {
    toast.error("Error loading data", {
      description: "There was a problem fetching the data"
    });
  }
  
  const enhancedColumns = tableColumns.map(column => {
    if (column.id === 'actions') {
      return {
        ...column,
        cell: (info) => {
          const actionData = info.getValue();
          if (typeof actionData === 'object' && actionData !== null) {
            return renderActions(actionData);
          }
          return null;
        }
      };
    } else {
      return {
        ...column,
        cell: (info) => {
          const data = info.getValue();
          if (data && typeof data === 'object' && 'value' in data && 'type' in data) {
            return renderCellContent(data.value, data.type, data.options);
          }
          return String(info.getValue() || '');
        }
      };
    }
  });
  
  return (
    <div className="space-y-4">
      {renderHeader()}
      
      <AdvancedDataTable
        columns={enhancedColumns}
        data={tableData}
        searchPlaceholder={searchPlaceholder || `Search ${title || tableName || ''}...`}
        searchColumn={searchColumn}
        showSearch={showSearch}
        exportFilename={exportFilename || (title ? title.toLowerCase().replace(/\s+/g, '-') : 'exported-data')}
        emptyState={
          isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-2">Loading data...</p>
            </div>
          ) : emptyState || (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )
        }
        onRowClick={onRowClick}
      />
    </div>
  );
});

GlobalDataTable.displayName = 'GlobalDataTable';

export { GlobalDataTable };
