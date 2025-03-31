
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdvancedDataTable } from "./AdvancedDataTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
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
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full flex items-center gap-2">
              {actionButtons}
            </div>
          </div>
          
          <AdvancedDataTable
            columns={columns}
            data={data}
            searchPlaceholder={searchPlaceholder}
            searchColumn={searchColumn}
            emptyState={emptyState}
          />
        </div>
      </CardContent>
    </Card>
  );
}
