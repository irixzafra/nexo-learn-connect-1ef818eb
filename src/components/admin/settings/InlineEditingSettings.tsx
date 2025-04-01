
import React from 'react';

// Simple placeholder component to replace the removed InlineEditingSettings
const InlineEditingSettings: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-medium mb-2">Edición en línea</h3>
      <p className="text-sm text-muted-foreground">
        La funcionalidad de edición en línea ha sido simplificada en esta versión.
      </p>
    </div>
  );
};

export default InlineEditingSettings;
