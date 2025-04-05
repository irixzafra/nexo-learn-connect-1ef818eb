
import React, { useState } from 'react';
import { useInlineEditor } from '@/contexts/InlineEditorContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Navigation, 
  Flag, 
  Plus, 
  Eye, 
  X, 
  PanelLeft,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const InlineEditControls: React.FC = () => {
  const { 
    isEditModeEnabled, 
    toggleEditMode, 
    editModeType, 
    setEditModeType 
  } = useInlineEditor();
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed z-50 bottom-8 right-6">
      {isEditModeEnabled && (
        <div className={cn(
          "bg-primary/90 backdrop-blur-sm rounded-full p-1 mb-2 flex items-center gap-1 shadow-lg",
          "transform transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full bg-white/20 text-white hover:bg-white/40"
                onClick={() => setEditModeType('navigation')}
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Editar navegación</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full bg-white/20 text-white hover:bg-white/40"
                onClick={() => setEditModeType('features')}
              >
                <Flag className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Gestionar features</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full bg-white/20 text-white hover:bg-white/40"
                onClick={() => setEditModeType('page')}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Nueva página</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full bg-white/20 text-white hover:bg-white/40"
                onClick={() => setEditModeType('preview')}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Previsualizar</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full bg-white/20 text-white hover:bg-white/40"
                onClick={() => {
                  toggleEditMode();
                  setIsOpen(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Cerrar modo edición</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
      
      <Button 
        size="icon" 
        variant={isEditModeEnabled ? "default" : "outline"} 
        className={cn(
          "h-12 w-12 rounded-full shadow-lg",
          isEditModeEnabled && "bg-primary text-primary-foreground"
        )}
        onClick={() => {
          if (isEditModeEnabled) {
            setIsOpen(!isOpen);
          } else {
            toggleEditMode();
            setIsOpen(true);
          }
        }}
      >
        {isEditModeEnabled ? (
          <PanelLeft className="h-5 w-5" />
        ) : (
          <Settings className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default InlineEditControls;
