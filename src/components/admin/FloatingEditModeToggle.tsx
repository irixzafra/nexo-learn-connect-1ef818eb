
import React, { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Pencil, Save, X, MoveHorizontal, Plus, Edit, 
  Wand2, Layout, Type, PanelTop, TextSelect, PenTool,
  MenuSquare, Menu, ListOrdered, LayoutGrid
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const FloatingEditModeToggle: React.FC = () => {
  const { isEditMode, toggleEditMode, isReorderMode, toggleReorderMode, isEditModeEnabled, canEdit, applyAIEdit } = useEditMode();
  const [isAIHelpOpen, setIsAIHelpOpen] = useState(false);
  const [elementSelector, setElementSelector] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isApplyingAI, setIsApplyingAI] = useState(false);

  // If functionality is not enabled or user can't edit, don't show anything
  if (!isEditModeEnabled || !canEdit) {
    return null;
  }

  const handleToggleEditMode = () => {
    toggleEditMode();
    if (!isEditMode) {
      toast.success('Modo edición universal activado', {
        description: 'Selecciona cualquier elemento para editarlo. Puedes navegar entre páginas manteniendo el modo activo.'
      });
    }
  };

  const handleOpenAIAssistant = () => {
    setIsAIHelpOpen(true);
  };

  const handleApplyAI = async () => {
    if (!elementSelector || !aiPrompt) {
      toast.error('Por favor, proporciona un selector de elemento y una instrucción');
      return;
    }

    setIsApplyingAI(true);
    try {
      const result = await applyAIEdit(elementSelector, aiPrompt);
      toast.success('IA aplicada con éxito', {
        description: 'Los cambios han sido aplicados al elemento seleccionado.'
      });
      setIsAIHelpOpen(false);
      setElementSelector('');
      setAiPrompt('');
    } catch (error) {
      toast.error('Error al aplicar la IA', {
        description: 'No se pudo aplicar la edición. Inténtalo de nuevo.'
      });
    } finally {
      setIsApplyingAI(false);
    }
  };

  // If not in edit mode, only show the activation button
  if (!isEditMode) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              onClick={handleToggleEditMode}
              className="fixed bottom-6 right-6 shadow-lg z-50 rounded-full h-16 w-16 p-0"
              size="icon"
              variant="default"
            >
              <Pencil className="h-8 w-8" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="font-medium">
            <p>Activar modo edición universal</p>
            <p className="text-xs text-muted-foreground">Edita elementos en cualquier página del sitio</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // If in edit mode, show the editing tools
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <Card className="p-4 shadow-lg max-w-xs">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <PenTool className="h-5 w-5 text-primary" />
              <span className="font-medium text-base">Edición Universal</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7" 
                    onClick={handleOpenAIAssistant}
                  >
                    <Wand2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Asistente de IA</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Separator className="my-3" />
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col items-center gap-1 p-2 bg-primary/10 rounded-lg">
              <TextSelect className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">Textos</span>
              <span className="text-[10px] text-muted-foreground">Click para editar</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-primary/10 rounded-lg">
              <ListOrdered className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">Elementos</span>
              <span className="text-[10px] text-muted-foreground">Arrastra para ordenar</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-primary/10 rounded-lg">
              <Menu className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">Menús</span>
              <span className="text-[10px] text-muted-foreground">Click para editar</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-primary/10 rounded-lg">
              <LayoutGrid className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">Secciones</span>
              <span className="text-[10px] text-muted-foreground">Click para seleccionar</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground italic mb-2">
            Haz click en cualquier elemento para seleccionarlo. El modo edición permanece activo al navegar entre páginas.
          </p>
        </Card>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleToggleEditMode}
                className="shadow-lg rounded-full h-14 w-14 p-0"
                size="icon"
                variant="destructive"
              >
                <X className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Desactivar modo edición</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Dialog for AI assistance */}
      <Dialog open={isAIHelpOpen} onOpenChange={setIsAIHelpOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              Asistente de Edición con IA
            </DialogTitle>
            <DialogDescription>
              Indica qué elemento visible quieres modificar y qué cambios deseas aplicar.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Selector del elemento visible:</label>
              <Input
                placeholder="Nombre o ID del elemento visible (ej: 'menú principal', 'banner de inicio')"
                value={elementSelector}
                onChange={(e) => setElementSelector(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Describe el elemento visible que quieres modificar de forma clara
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Instrucción para la IA:</label>
              <Textarea
                placeholder="Ej: 'Haz que el texto sea más conciso', 'Cambia el color a azul', 'Reorganiza los elementos'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Describe claramente qué cambios quieres aplicar
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAIHelpOpen(false)} disabled={isApplyingAI}>
              Cancelar
            </Button>
            <Button onClick={handleApplyAI} disabled={isApplyingAI || !elementSelector || !aiPrompt}>
              {isApplyingAI ? 'Aplicando...' : 'Aplicar IA'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingEditModeToggle;
