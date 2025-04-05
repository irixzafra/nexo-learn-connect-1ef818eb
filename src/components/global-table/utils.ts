
import { ColumnDef } from "@tanstack/react-table";
import { TableColumn } from "./types";
import { createColumn, createActionsColumn } from "@/components/shared/DataTableUtils";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Function to construct TanStack table columns from our custom column format
export const constructColumns = <TData,>(
  columns: TableColumn<TData>[],
  options: {
    onEdit?: (data: TData) => void;
    onDelete?: (id: string | number) => Promise<void>;
    renderCustomActions?: (data: TData) => React.ReactNode;
  } = {}
): ColumnDef<TData, any>[] => {
  const { onEdit, onDelete, renderCustomActions } = options;
  
  // Create table columns from our column definitions
  const tableColumns = columns.map(column => {
    // Create cell renderer based on column type
    const cellRenderer = (info: any) => {
      const value = info.getValue();
      
      switch (column.type) {
        case 'boolean':
          return value ? 
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Yes</Badge> : 
            <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">No</Badge>;
        
        case 'date':
          return value ? format(new Date(value), 'dd/MM/yyyy HH:mm') : '—';
        
        case 'select':
          if (!column.options) return String(value || '');
          const option = column.options.find(opt => opt.value === value);
          return option?.label || String(value || '');
        
        case 'image':
          return value ? (
            <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
              <img src={value} alt="Preview" className="h-full w-full object-cover" />
            </div>
          ) : '—';
        
        default:
          return column.cell ? column.cell(info) : String(value || '');
      }
    };
    
    return createColumn<TData>({
      accessorKey: column.accessorKey || column.id,
      header: column.header,
      cell: cellRenderer,
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
      
      return (
        <div className="flex justify-end">
          {renderCustomActions ? (
            renderCustomActions(item)
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(item)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem 
                    className="text-red-600" 
                    onClick={() => onDelete(itemId)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    });
    
    tableColumns.push(actionsColumn);
  }
  
  return tableColumns;
};

// Function to generate a table schema from data
export const generateSchemaFromData = (data: any[]): TableColumn[] => {
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
};

// Format data for display
export const formatCellValue = (value: any, type?: string): string => {
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
};

// Helper to extract id from row data
export const getRowId = (row: any): string | number => {
  return row?.id || '';
};
