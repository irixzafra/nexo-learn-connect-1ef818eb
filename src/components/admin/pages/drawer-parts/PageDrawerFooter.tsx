
import React from 'react';
import { SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X, Save } from 'lucide-react';

interface PageDrawerFooterProps {
  onClose: () => void;
}

const PageDrawerFooter: React.FC<PageDrawerFooterProps> = ({ onClose }) => {
  return (
    <SheetFooter className="flex flex-row justify-between pt-2 border-t mt-4">
      <Button variant="outline" onClick={onClose}>
        <X className="h-4 w-4 mr-2" />
        Cerrar
      </Button>
      <Button>
        <Save className="h-4 w-4 mr-2" />
        Guardar cambios
      </Button>
    </SheetFooter>
  );
};

export default PageDrawerFooter;
