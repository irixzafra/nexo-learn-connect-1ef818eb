
import { Table } from "@tanstack/react-table";
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export function exportTableToCSV<TData>(table: Table<TData>, filename = "exported-data") {
  const dataToExport = table.getFilteredRowModel().rows.map(row => {
    const rowData: Record<string, any> = {};
    
    table.getAllColumns()
      .filter(column => column.getIsVisible())
      .forEach(column => {
        const columnId = column.id;
        const cellValue = row.getValue(columnId);
        
        rowData[column.columnDef.header as string] = 
          typeof cellValue === 'object' ? JSON.stringify(cellValue) : cellValue;
      });
    
    return rowData;
  });
  
  const csv = Papa.unparse(dataToExport);
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${filename}.csv`);
}

export function applyColumnFilter(
  searchColumn: string,
  globalFilter: string,
  setColumnFilters: React.Dispatch<React.SetStateAction<any[]>>
) {
  if (searchColumn !== "all" && globalFilter) {
    setColumnFilters([
      {
        id: searchColumn,
        value: globalFilter,
      },
    ]);
  } else if (searchColumn !== "all") {
    setColumnFilters([]);
  }
}
