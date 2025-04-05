
import { ColumnDef } from "@tanstack/react-table";
import { TableColumn } from "./types";
import { createColumn, createActionsColumn } from "@/components/shared/DataTableUtils";
import { format } from "date-fns";

// Function to construct TanStack table columns from our custom column format
export function constructColumns<TData>(
  columns: TableColumn<TData>[],
  options: {
    onEdit?: (data: TData) => void;
    onDelete?: (id: string | number) => Promise<void>;
    renderCustomActions?: (data: TData) => React.ReactNode;
  } = {}
): ColumnDef<TData, any>[] {
  const { onEdit, onDelete, renderCustomActions } = options;
  
  // Create table columns from our column definitions
  const tableColumns = columns.map(column => {
    // Create cell renderer based on column type
    return createColumn<TData>({
      accessorKey: column.accessorKey || column.id,
      header: column.header,
      cell: ({ row }) => {
        const value = row.getValue(column.accessorKey || column.id);
        
        // The actual cell rendering will be handled by the consuming component
        // which will be a .tsx file, not here in the .ts file
        return { value, type: column.type, options: column.options, cellInfo: row };
      },
      enableSorting: column.enableSorting !== false,
      enableFiltering: column.enableFiltering,
      meta: column.meta,
    });
  });
  
  // Add actions column if needed
  if (onEdit || onDelete || renderCustomActions) {
    const actionsColumn = createActionsColumn<TData>(({ row }) => {
      const item = row.original;
      const itemId = (item as any).id;
      
      // Return the necessary data for rendering actions
      // The actual JSX will be in the consuming component
      return { 
        item, 
        itemId, 
        hasEdit: !!onEdit, 
        hasDelete: !!onDelete, 
        onEdit: onEdit ? () => onEdit(item) : undefined,
        onDelete: onDelete ? () => onDelete(itemId) : undefined,
        renderCustomActions
      };
    });
    
    tableColumns.push(actionsColumn);
  }
  
  return tableColumns;
}

// Function to generate a table schema from data
export function generateSchemaFromData(data: any[]): TableColumn[] {
  if (!data || data.length === 0) return [];
  
  const sample = data[0];
  return Object.keys(sample).map(key => {
    const value = sample[key];
    let type: TableColumn['type'] = 'text';
    
    // Determine column type based on value
    if (typeof value === 'boolean') type = 'boolean';
    else if (typeof value === 'number') type = 'number';
    else if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) type = 'date';
    
    return {
      id: key,
      header: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      accessorKey: key,
      type
    };
  });
}

// Format data for display
export function formatCellValue(value: any, type?: string): string {
  if (value === null || value === undefined) return '—';
  
  switch (type) {
    case 'date':
      return value ? format(new Date(value), 'dd/MM/yyyy HH:mm') : '—';
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'object':
      return JSON.stringify(value);
    default:
      return String(value);
  }
}

// Helper to extract id from row data
export function getRowId(row: any): string | number {
  return row?.id || '';
}
