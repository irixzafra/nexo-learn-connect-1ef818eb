
import React from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { Save, X, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AnimatePresence, motion } from 'framer-motion';

const EditModeControls: React.FC = () => {
  const { isEditMode, saveDraft, cancelEditing, isNavigationBlocked } = useEditMode();

  if (!isEditMode) return null;

  return (
    <AnimatePresence>
      {isEditMode && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-background border shadow-lg rounded-lg p-4 w-auto md:w-96 space-y-4">
            {isNavigationBlocked && (
              <Alert variant="warning" className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800 text-sm font-medium">
                  Navegación bloqueada
                </AlertTitle>
                <AlertDescription className="text-amber-700 text-xs">
                  La navegación está bloqueada mientras el modo edición está activo para evitar perder cambios.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-between gap-2">
              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                onClick={cancelEditing}
              >
                <X className="h-4 w-4" />
                <span>Cancelar edición</span>
              </Button>
              
              <Button
                variant="default"
                size="sm"
                className="gap-2"
                onClick={saveDraft}
              >
                <Save className="h-4 w-4" />
                <span>Guardar borrador</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditModeControls;
