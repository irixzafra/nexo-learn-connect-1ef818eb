
import React from 'react';
import { useTestData, TestDataType } from '@/contexts/TestDataContext';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';

interface DeleteTypeDataDialogProps {
  type: TestDataType;
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteTypeDataDialog: React.FC<DeleteTypeDataDialogProps> = ({ 
  type, 
  label,
  open,
  onOpenChange
}) => {
  const { clearTestData } = useTestData();

  const handleDeleteAll = () => {
    clearTestData(type);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará todos los datos de prueba de tipo "{label.toLowerCase()}". 
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAll}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar todos
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
