
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExportButtonProps {
  onClick: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick }) => {
  return (
    <Button variant="outline" onClick={onClick}>
      <Download className="mr-2 h-4 w-4" />
      Exportar CSV
    </Button>
  );
};

export default ExportButton;
