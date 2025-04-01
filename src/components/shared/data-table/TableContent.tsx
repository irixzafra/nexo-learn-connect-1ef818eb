
import React, { useState } from "react";
import { Table as TableType } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TableContentProps<TData> {
  table: TableType<TData>;
  columns: any[];
  emptyState?: React.ReactNode;
  onRowClick?: (row: TData) => void;
}

export function TableContent<TData>({
  table,
  columns,
  emptyState,
  onRowClick
}: TableContentProps<TData>) {
  // Store column widths
  const [columnSizes, setColumnSizes] = useState<Record<string, number>>(
    Object.fromEntries(
      columns.map((col, index) => [
        col.id || index, 
        100 / columns.length
      ])
    )
  );

  const handleResize = (colIndex: number, newSize: number) => {
    setColumnSizes(prev => {
      const columnId = table.getHeaderGroups()[0].headers[colIndex].id;
      return { ...prev, [columnId]: newSize };
    });
  };

  return (
    <div className="w-full overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/30 hover:bg-muted/40">
              {headerGroup.headers.map((header, index) => (
                <TableHead 
                  key={header.id}
                  className="relative font-medium"
                  style={{ 
                    width: `${columnSizes[header.id] || 100 / columns.length}%`
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {index < headerGroup.headers.length - 1 && (
                    <div 
                      className="absolute top-0 right-0 h-full w-2 cursor-col-resize hover:bg-muted/50 select-none" 
                      onMouseDown={(e) => {
                        e.preventDefault();
                        const startX = e.pageX;
                        const startWidth = columnSizes[header.id] || 100 / columns.length;
                        
                        const onMouseMove = (e: MouseEvent) => {
                          const dx = e.pageX - startX;
                          const containerWidth = (e.target as HTMLElement).closest('table')?.clientWidth || 1000;
                          const percentChange = (dx / containerWidth) * 100;
                          
                          handleResize(
                            index,
                            Math.max(5, startWidth + percentChange)
                          );
                        };
                        
                        const onMouseUp = () => {
                          document.removeEventListener('mousemove', onMouseMove);
                          document.removeEventListener('mouseup', onMouseUp);
                        };
                        
                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                      }}
                    />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onRowClick && onRowClick(row.original)}
                className={cn(
                  onRowClick ? "cursor-pointer hover:bg-muted/10" : "",
                  "border-b border-muted/20 transition-colors"
                )}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell 
                    key={cell.id}
                    style={{ 
                      width: `${columnSizes[cell.column.id] || 100 / columns.length}%` 
                    }}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                {emptyState ? (
                  emptyState
                ) : (
                  <span className="text-muted-foreground">
                    No se encontraron resultados.
                  </span>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
