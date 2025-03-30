
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

/**
 * Crea una definición de columna para la DataTable
 */
export function createColumn<TData, TValue = unknown>(options: {
  accessorKey: string;
  header: string;
  cell?: (props: { row: any; getValue: () => TValue }) => React.ReactNode;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  meta?: Record<string, any>;
}): ColumnDef<TData, TValue> {
  return {
    accessorKey: options.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={options.header} />
    ),
    cell: options.cell
      ? ({ row }) => options.cell!({ row, getValue: () => row.getValue(options.accessorKey) })
      : ({ row }) => {
          const value = row.getValue(options.accessorKey) as any;
          return value != null ? String(value) : "";
        },
    enableSorting: options.enableSorting ?? true,
    enableColumnFilter: options.enableFiltering,
    meta: options.meta,
  };
}

/**
 * Crea una definición de columna para acciones
 */
export function createActionsColumn<TData>(
  cell: (props: { row: any }) => React.ReactNode
): ColumnDef<TData> {
  return {
    id: "actions",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">{cell({ row })}</div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  };
}
