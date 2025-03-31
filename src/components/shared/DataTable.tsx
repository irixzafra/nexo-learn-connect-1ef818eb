
import React from "react";
import { EnhancedDataTable } from "./EnhancedDataTable";

// This is a compatibility wrapper around the EnhancedDataTable
// to ensure existing code continues to work with the new implementation
export function DataTable({ columns, data, ...props }) {
  return <EnhancedDataTable columns={columns} data={data} {...props} />;
}
