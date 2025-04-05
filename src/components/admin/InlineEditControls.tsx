
import React from 'react';
import { useInlineEditor } from '@/contexts/InlineEditorContext';
import { Button } from '@/components/ui/button';
import { EditIcon, XIcon, EyeIcon, PlusIcon, Flag } from 'lucide-react';
import InlineNavigationEditor from './navigation/InlineNavigationEditor';
import InlineFeatureFlags from './features/InlineFeatureFlags';

const InlineEditControls: React.FC = () => {
  const { isEditModeEnabled, toggleEditMode } = useInlineEditor();

  if (!isEditModeEnabled) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 shadow-lg gap-2"
        onClick={toggleEditMode}
      >
        <EditIcon className="h-4 w-4" />
        Modo Edición
      </Button>
    );
  }

  return (
    <>
      <InlineNavigationEditor />
      <InlineFeatureFlags />
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-background border shadow-lg rounded-lg p-4 w-auto md:w-96 space-y-4">
          <div className="flex justify-between gap-2">
            <Button
              variant="destructive"
              size="sm"
              className="gap-2"
              onClick={toggleEditMode}
            >
              <XIcon className="h-4 w-4" />
              <span>Salir del Modo Edición</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <EyeIcon className="h-4 w-4" />
              <span>Vista Previa</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <PlusIcon className="h-4 w-4" />
              Nueva Página
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Flag className="h-4 w-4" />
              Features
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InlineEditControls;
