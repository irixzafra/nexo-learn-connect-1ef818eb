
import React, { useState, ReactNode } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdvancedDataTable } from "./AdvancedDataTable";
import { EntityDrawer } from "./EntityDrawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EditableDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  description?: string;
  searchPlaceholder?: string;
  searchColumn?: string;
  exportFilename?: string;
  emptyState?: ReactNode;
  onRowClick?: (row: TData) => void;
  onSave: (data: TData) => Promise<void>;
  onDelete?: (id: string | number) => Promise<void>;
  onCreate?: () => void;
  renderForm: (props: { data: TData | null; onChange: (data: TData) => void }) => ReactNode;
  idField?: keyof TData;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

export function EditableDataTable<TData extends object, TValue>({
  columns,
  data,
  title,
  description,
  searchPlaceholder = "Buscar...",
  searchColumn = "all",
  exportFilename,
  emptyState,
  onRowClick,
  onSave,
  onDelete,
  onCreate,
  renderForm,
  idField = "id" as keyof TData,
  canCreate = true,
  canEdit = true,
  canDelete = false,
}: EditableDataTableProps<TData, TValue>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRowClick = (row: TData) => {
    if (canEdit) {
      setSelectedItem(row);
      setIsDrawerOpen(true);
    }
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleCreate = () => {
    if (onCreate) {
      onCreate();
    } else {
      setSelectedItem(null);
      setIsDrawerOpen(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {canCreate && (
          <Button onClick={handleCreate} className="ml-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo
          </Button>
        )}
      </div>

      <AdvancedDataTable
        columns={columns}
        data={data}
        searchPlaceholder={searchPlaceholder}
        searchColumn={searchColumn}
        exportFilename={exportFilename || title.toLowerCase().replace(/\s+/g, '-')}
        emptyState={emptyState}
        onRowClick={handleRowClick}
      />

      <EntityDrawer
        title={selectedItem ? `Editar ${title}` : `Crear ${title}`}
        description={description}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onSave={onSave}
        entity={selectedItem}
        loading={loading}
      >
        {renderForm({ data: selectedItem, onChange: () => {} })}
      </EntityDrawer>
    </div>
  );
}
