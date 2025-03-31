
import React from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, SlidersHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { exportTableToCSV } from "./table-utils";

interface TableToolbarProps<TData> {
  table: Table<TData>;
  showSearch?: boolean;
  searchPlaceholder?: string;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  exportFilename?: string;
}

export function TableToolbar<TData>({
  table,
  showSearch = true,
  searchPlaceholder = "Buscar...",
  globalFilter,
  setGlobalFilter,
  exportFilename = "exported-data"
}: TableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      {showSearch && (
        <div className="flex items-center">
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      
      <div className="flex items-center gap-2 ml-auto">
        <Button 
          variant="outline" 
          size="sm"
          className="ml-auto"
          onClick={() => exportTableToCSV(table, exportFilename)}
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar CSV
        </Button>
        
        <ColumnsDropdown table={table} />
      </div>
    </div>
  );
}

interface ColumnsDropdownProps<TData> {
  table: Table<TData>;
}

function ColumnsDropdown<TData>({ table }: ColumnsDropdownProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Columnas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  column.toggleVisibility(!!value)
                }
              >
                {column.columnDef.header as string}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
