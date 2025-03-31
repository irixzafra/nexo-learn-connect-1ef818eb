
import { Table } from "@tanstack/react-table";
import { toast } from 'sonner';

// Helper function to apply column filter
export const applyColumnFilter = (
  searchColumn: string,
  globalFilter: string,
  setColumnFilters: (updater: any) => void
) => {
  if (searchColumn === "all" || !searchColumn) return;
  
  if (globalFilter) {
    setColumnFilters([
      {
        id: searchColumn,
        value: globalFilter,
      },
    ]);
  } else {
    setColumnFilters([]);
  }
};

// Export table data to CSV
export const exportTableToCSV = <TData>(
  table: Table<TData>,
  filename: string = "export"
) => {
  try {
    // Get visible columns
    const visibleColumns = table
      .getAllColumns()
      .filter((column) => column.getIsVisible());

    // Prepare headers (column titles)
    const headers = visibleColumns.map((column) => {
      const header = column.columnDef.header;
      return typeof header === "string" ? header : column.id;
    });

    // Prepare rows data
    const rows = table.getFilteredRowModel().rows;
    const data = rows.map((row) => {
      return visibleColumns.map((column) => {
        const value = row.getValue(column.id);
        // Convert to string and handle nulls
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value);
        return String(value);
      });
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Exportación completada", {
      description: `Se ha exportado la información a ${filename}.csv`
    });
  } catch (error) {
    console.error("Error exporting to CSV:", error);
    toast.error("Error al exportar a CSV");
  }
};

// Toggle visibility of all columns
export const toggleAllColumnsVisibility = (
  table: Table<any>,
  visibility: boolean
) => {
  table.getAllColumns().forEach((column) => {
    if (column.getCanHide()) {
      column.toggleVisibility(visibility);
    }
  });
};

// Reorder columns (returns a new order array)
export const reorderColumns = (
  columns: string[],
  startIndex: number,
  endIndex: number
): string[] => {
  const result = [...columns];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
