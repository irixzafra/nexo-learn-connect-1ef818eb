
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
import { AlertTriangle, Trash2 } from 'lucide-react';

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
          variant="destructive" 
          disabled={disabled}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar todos los datos
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            ¿Eliminar todos los datos?
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2">
            Esta acción eliminará <strong>TODOS</strong> los datos de prueba de todos los tipos.
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
