
import React from 'react';

interface RoleIndicatorProps {
  viewingAs: string | null;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({ viewingAs }) => {
  if (!viewingAs) return null;
  
  return (
    <div className="ml-4 px-3 py-1 bg-amber-50 text-amber-800 dark:bg-amber-800/30 dark:text-amber-500 text-xs font-medium rounded-full">
      Viendo como: <span className="capitalize font-semibold">{viewingAs}</span>
    </div>
  );
};
