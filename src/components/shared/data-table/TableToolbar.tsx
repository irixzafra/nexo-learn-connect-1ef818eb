
import React from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, SlidersHorizontal, ChevronDown, GripVertical } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { exportTableToCSV } from "./table-utils";
import { useTableColumns } from "@/hooks/use-table-info";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";

interface TableToolbarProps<TData> {
  table: Table<TData>;
  showSearch?: boolean;
  searchPlaceholder?: string;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  exportFilename?: string;
  tableName?: string;
}

export function TableToolbar<TData>({
  table,
  showSearch = true,
  searchPlaceholder = "Buscar...",
  globalFilter,
  setGlobalFilter,
  exportFilename = "exported-data",
  tableName
}: TableToolbarProps<TData>) {
  // Fetch table columns from database if tableName is provided
  const { data: dbColumns, isLoading } = useTableColumns(tableName || "");
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between mb-4">
      {showSearch && (
        <div className="flex-1 max-w-sm w-full">
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-full"
          />
        </div>
      )}
      
      <div className="flex items-center gap-2 ml-auto">
        <Button 
          variant="outline" 
          size="sm"
          className="ml-auto whitespace-nowrap"
          onClick={() => exportTableToCSV(table, exportFilename)}
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar CSV
        </Button>
        
        <ColumnsDropdown table={table} dbColumns={dbColumns} isLoading={isLoading} />
      </div>
    </div>
  );
}

interface ColumnsDropdownProps<TData> {
  table: Table<TData>;
  dbColumns?: any[];
  isLoading?: boolean;
}

function ColumnsDropdown<TData>({ table, dbColumns, isLoading }: ColumnsDropdownProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto whitespace-nowrap">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Columnas
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border shadow-md z-50 w-[280px]">
        <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-auto p-1">
          {isLoading ? (
            <div className="p-2 text-sm text-muted-foreground">Cargando columnas...</div>
          ) : (
            table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const headerValue = column.columnDef.header as string;
                return (
                  <div
                    key={column.id}
                    className="flex items-center space-x-2 py-2 px-2 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => column.toggleVisibility(!column.getIsVisible())}
                  >
                    <Checkbox 
                      checked={column.getIsVisible()}
                      onCheckedChange={(checked) => column.toggleVisibility(!!checked)}
                      className="data-[state=checked]:bg-primary"
                    />
                    <span className="text-sm">{headerValue || column.id}</span>
                    <GripVertical className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                );
              })
          )}
          
          {/* Display database columns that might not be in the table yet */}
          {dbColumns && dbColumns.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="mt-2 text-xs text-muted-foreground">Columnas adicionales de la base de datos</DropdownMenuLabel>
              {dbColumns
                .filter(dbCol => 
                  !table.getAllColumns().some(tableCol => 
                    tableCol.id === dbCol.column_name || 
                    (tableCol.columnDef.header as string)?.toLowerCase() === dbCol.column_name.toLowerCase()
                  )
                )
                .map(dbCol => (
                  <div
                    key={dbCol.column_name}
                    className="flex items-center space-x-2 py-2 px-2 hover:bg-accent rounded-md cursor-pointer opacity-70"
                  >
                    <Checkbox className="opacity-50" />
                    <span className="text-sm">{dbCol.column_name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{dbCol.data_type}</span>
                  </div>
                ))
              }
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
