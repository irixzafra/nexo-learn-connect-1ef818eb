
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdvancedDataTable } from "./AdvancedDataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEditMode } from "@/contexts/EditModeContext";

interface AdminDataTableProps<TData, TValue> {
  title: string;
  description?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchColumn?: string;
  createButtonLabel?: string;
  createButtonIcon?: React.ReactNode;
  onCreateClick?: () => void;
  emptyState?: React.ReactNode;
  actionButtons?: React.ReactNode;
}

export function AdminDataTable<TData, TValue>({
  title,
  description,
  columns,
  data,
  searchPlaceholder = "Buscar...",
  searchColumn = "name",
  createButtonLabel,
  createButtonIcon = <Plus className="h-4 w-4 mr-2" />,
  onCreateClick,
  emptyState,
  actionButtons
}: AdminDataTableProps<TData, TValue>) {
  const { isEditMode } = useEditMode();
  const [localTitle, setLocalTitle] = React.useState(title);
  const [localDescription, setLocalDescription] = React.useState(description || "");

  // Only update local states when props change
  React.useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  React.useEffect(() => {
    setLocalDescription(description || "");
  }, [description]);

  const handleTitleEdit = () => {
    if (!isEditMode) return;
    
    const newTitle = prompt("Editar título:", localTitle);
    if (newTitle !== null && newTitle.trim() !== "") {
      setLocalTitle(newTitle);
    }
  };

  const handleDescriptionEdit = () => {
    if (!isEditMode) return;
    
    const newDescription = prompt("Editar descripción:", localDescription);
    if (newDescription !== null) {
      setLocalDescription(newDescription);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 
            className={`text-2xl font-semibold ${isEditMode ? 'cursor-pointer hover:text-primary' : ''}`}
            onClick={handleTitleEdit}
          >
            {localTitle}
          </h2>
          {(localDescription || isEditMode) && (
            <p 
              className={`text-muted-foreground ${isEditMode ? 'cursor-pointer hover:text-primary' : ''}`}
              onClick={handleDescriptionEdit}
            >
              {localDescription || (isEditMode ? "Haz clic para añadir una descripción" : "")}
            </p>
          )}
        </div>
        
        {createButtonLabel && (
          <Button 
            onClick={onCreateClick} 
            className="whitespace-nowrap"
            size="lg"
          >
            {createButtonIcon}
            {createButtonLabel}
          </Button>
        )}
      </div>
      
      {actionButtons && (
        <div className="flex items-center justify-end gap-2 mb-4">
          {actionButtons}
        </div>
      )}
      
      <AdvancedDataTable
        columns={columns}
        data={data}
        searchPlaceholder={searchPlaceholder}
        searchColumn={searchColumn}
        emptyState={emptyState}
      />
    </div>
  );
}
