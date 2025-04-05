
import React from 'react';
import { useInlineEditor } from '@/contexts/InlineEditorContext';
import { Button } from '@/components/ui/button';
import { EditIcon, XIcon, EyeIcon, PlusIcon, Flag, Menu } from 'lucide-react';
import InlineNavigationEditor from './navigation/InlineNavigationEditor';
import InlineFeatureFlags from './features/InlineFeatureFlags';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const InlineEditControls: React.FC = () => {
  const { isEditModeEnabled, toggleEditMode } = useInlineEditor();

  if (!isEditModeEnabled) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 z-50 shadow-lg h-10 w-10 rounded-full"
            onClick={toggleEditMode}
          >
            <EditIcon className="h-4 w-4" />
            <span className="sr-only">Activar Modo Edición</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Activar Modo Edición</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <>
      <InlineNavigationEditor />
      <InlineFeatureFlags />
      
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <div className="flex gap-2 justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shadow-lg h-10 w-10 rounded-full bg-background"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Navegación</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Editar Navegación</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shadow-lg h-10 w-10 rounded-full bg-background"
              >
                <Flag className="h-4 w-4" />
                <span className="sr-only">Features</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Gestionar Features</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shadow-lg h-10 w-10 rounded-full bg-background"
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Nueva Página</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Nueva Página</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shadow-lg h-10 w-10 rounded-full bg-background"
              >
                <EyeIcon className="h-4 w-4" />
                <span className="sr-only">Vista Previa</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Vista Previa</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="shadow-lg h-10 w-10 rounded-full ml-auto"
              onClick={toggleEditMode}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Salir del Modo Edición</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Salir del Modo Edición</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};

export default InlineEditControls;
