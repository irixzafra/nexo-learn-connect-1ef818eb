
import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "./DataTablePagination";
import { TableToolbar, TableContent, applyColumnFilter } from "./data-table";

interface AdvancedDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchColumn?: string;
  initialSorting?: SortingState;
  showSearch?: boolean;
  exportFilename?: string;
  emptyState?: React.ReactNode;
  onRowClick?: (row: TData) => void;
}

export function AdvancedDataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Buscar...",
  searchColumn = "all",
  initialSorting = [],
  showSearch = true,
  exportFilename = "exported-data",
  emptyState,
  onRowClick,
}: AdvancedDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: searchColumn === "all" ? globalFilter : undefined,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    applyColumnFilter(searchColumn, globalFilter, setColumnFilters);
  }, [globalFilter, searchColumn]);

  return (
    <div className="space-y-4">
      <TableToolbar
        table={table}
        showSearch={showSearch}
        searchPlaceholder={searchPlaceholder}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        exportFilename={exportFilename}
      />
      
      <TableContent
        table={table}
        columns={columns}
        emptyState={emptyState}
        onRowClick={onRowClick}
      />
      
      <DataTablePagination table={table} />
    </div>
  );
}
