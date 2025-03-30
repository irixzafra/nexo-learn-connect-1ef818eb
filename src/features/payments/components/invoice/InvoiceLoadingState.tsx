
import React from 'react';
import { Loader2 } from 'lucide-react';

export const InvoiceLoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};
