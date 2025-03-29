
import React from 'react';
import { useTestData } from '@/contexts/TestDataContext';
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteAllDataDialogProps {
  disabled: boolean;
}

export const DeleteAllDataDialog: React.FC<DeleteAllDataDialogProps> = ({ disabled }) => {
  const { clearTestData } = useTestData();

  const handleDeleteAll = () => {
    clearTestData();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          disabled={disabled}
        >
          Eliminar todos los datos
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar todos los datos de prueba?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará TODOS los datos de prueba de todos los tipos.
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
