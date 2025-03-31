
import React from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, SlidersHorizontal, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
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
        <Button variant="outline" size="sm" className="ml-auto whitespace-nowrap">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Columnas
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border shadow-md z-50 w-56">
        <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-auto p-1">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize flex items-center gap-2 cursor-pointer focus:bg-accent"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  <Checkbox 
                    id={`column-${column.id}`}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    className="mr-2 data-[state=checked]:bg-primary"
                  />
                  <label htmlFor={`column-${column.id}`} className="flex-1 cursor-pointer">
                    {column.columnDef.header as string}
                  </label>
                </DropdownMenuCheckboxItem>
              );
            })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
