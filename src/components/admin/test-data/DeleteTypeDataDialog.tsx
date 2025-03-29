
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
import { Trash2, AlertTriangle } from 'lucide-react';

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
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            ¿Eliminar todos los datos?
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2">
            Esta acción eliminará todos los datos de prueba de tipo <strong>"{label.toLowerCase()}"</strong>. 
            <p className="mt-2 font-medium">Esta acción no se puede deshacer.</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="mt-0">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAll}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar todos
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
