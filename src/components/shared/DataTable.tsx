
import React from "react";
import { EnhancedDataTable } from "./EnhancedDataTable";

// This is a compatibility wrapper around the EnhancedDataTable
// to ensure existing code continues to work with the new implementation
export function DataTable({ columns, data, ...props }) {
  // Make sure we provide default values for required props
  const safeColumns = columns || [];
  const safeData = data || [];
  
  return <EnhancedDataTable columns={safeColumns} data={safeData} {...props} />;
}
