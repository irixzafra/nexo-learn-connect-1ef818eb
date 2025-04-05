import { ColumnDef } from "@tanstack/react-table";

export type SortDirection = 'asc' | 'desc';

export type ColumnFilterValue = {
  id: string;
  value: string | number | boolean | null;
};

export type TableColumn<T = any> = {
  id: string;
  header: string;
  accessorKey?: string;
  cell?: (props: { row: any; getValue: () => any }) => React.ReactNode;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'image' | 'actions';
  options?: { label: string; value: string | number | boolean }[];
  required?: boolean;
  editable?: boolean;
  hidden?: boolean;
  meta?: Record<string, any>;
};

export interface GlobalTableProps<TData = any> {
  // Core props
  tableName?: string;
  title?: string;
  description?: string;
  data?: TData[];
  columns: TableColumn<TData>[];
  
  // Data fetching
  tablePath?: string;
  autoFetch?: boolean;
  queryKey?: string[];
  queryFn?: () => Promise<TData[]>;
  
  // Pagination and sorting
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  defaultSorting?: { id: string; desc: boolean }[];
  
  // UI customization
  emptyState?: React.ReactNode;
  showToolbar?: boolean;
  searchPlaceholder?: string;
  searchColumn?: string;
  showSearch?: boolean;
  exportable?: boolean;
  exportFilename?: string;
  
  // Actions
  onCreate?: () => void;
  onEdit?: (data: TData) => void;
  onDelete?: (id: string | number) => Promise<void>;
  onRowClick?: (data: TData) => void;
  createButtonLabel?: string;
  
  // Other features
  hideColumns?: string[];
  renderCustomActions?: (data: TData) => React.ReactNode;
  renderForm?: (props: { data: TData | null; onSubmit: (data: TData) => void }) => React.ReactNode;
  showColumnToggle?: boolean;
}

export type GlobalTableRef = {
  refresh: () => void;
  getData: () => any[];
};
