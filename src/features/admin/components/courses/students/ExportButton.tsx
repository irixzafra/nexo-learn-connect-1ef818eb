
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExportButton: React.FC = () => {
  return (
    <Button variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Exportar CSV
    </Button>
  );
};

export default ExportButton;
