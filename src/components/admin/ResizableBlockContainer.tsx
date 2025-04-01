
import React, { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { 
  Layout, Move, Maximize2, ChevronDown, ChevronUp, 
  ChevronLeft, ChevronRight, Grid2X2, Rows3, Columns, 
  Wand2
} from 'lucide-react';
import { PageBlock, ContainerLayout, getLayoutClass } from '@/types/pages';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ResizableBlockContainerProps {
  block: PageBlock;
  children: React.ReactNode;
  onResize?: (block: PageBlock, newSize: { width?: string; height?: string }) => void;
  onLayoutChange?: (block: PageBlock, newLayout: ContainerLayout) => void;
  onMoveBlock?: (block: PageBlock, direction: 'up' | 'down' | 'left' | 'right') => void;
  className?: string;
}

const ResizableBlockContainer: React.FC<ResizableBlockContainerProps> = ({
  block,
  children,
  onResize,
  onLayoutChange,
  onMoveBlock,
  className
}) => {
  const { isEditMode, isReorderMode, selectedElementId, setSelectedElementId, applyAIEdit } = useEditMode();
  const [isResizing, setIsResizing] = useState(false);
  const [showLayoutOptions, setShowLayoutOptions] = useState(false);
  const [temporarySize, setTemporarySize] = useState({
    width: block.width || '100%',
    height: block.height || 'auto'
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isApplyingAI, setIsApplyingAI] = useState(false);
  const isSelected = selectedElementId === block.id;

  // Si no estamos en modo edición, simplemente renderizamos el contenido
  if (!isEditMode) {
    return (
      <div 
        className={cn(
          getLayoutClass(block.layout),
          "relative p-4 transition-all duration-200",
          className
        )}
        style={{ 
          width: block.width || '100%', 
          height: block.height || 'auto',
          minHeight: block.height || 'auto'
        }}
      >
        {children}
      </div>
    );
  }

  const handleLayoutChange = (layout: ContainerLayout) => {
    if (onLayoutChange) {
      onLayoutChange(block, layout);
    }
  };

  const handleResize = () => {
    if (onResize && (temporarySize.width !== block.width || temporarySize.height !== block.height)) {
      onResize(block, temporarySize);
    }
    setIsResizing(false);
  };

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (onMoveBlock) {
      onMoveBlock(block, direction);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (isEditMode && !isReorderMode) {
      e.stopPropagation();
      setSelectedElementId(block.id);
    }
  };

  const handleAIAssist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAIDialogOpen(true);
  };

  const handleApplyAI = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsApplyingAI(true);
    try {
      const blockContent = typeof block.content === 'string' 
        ? block.content 
        : JSON.stringify(block.content);
      
      const result = await applyAIEdit(blockContent, aiPrompt);
      toast.success('Cambios con IA aplicados al contenedor');
      setIsAIDialogOpen(false);
      setAiPrompt('');
    } catch (error) {
      console.error("Error applying AI assist:", error);
      toast.error('Error al aplicar IA al contenedor');
    } finally {
      setIsApplyingAI(false);
    }
  };

  return (
    <div 
      className={cn(
        "relative group transition-all duration-200",
        isReorderMode ? "cursor-move" : "cursor-pointer",
        isSelected && !isReorderMode ? "ring-2 ring-primary/60 ring-offset-1" : "border border-dashed border-transparent hover:border-primary",
        className
      )}
      style={{ 
        width: block.width || '100%', 
        height: block.height || 'auto',
        minHeight: '100px'
      }}
      onClick={handleContainerClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Barra de herramientas del contenedor - solo visible en modo reordenación o cuando está seleccionado */}
      {(isReorderMode || isSelected) && (
        <div className="absolute top-0 left-0 right-0 bg-muted/70 px-2 py-1 z-20 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {isReorderMode && <Move className="h-4 w-4 cursor-grab" />}
            <span className="text-xs font-medium">Contenedor {block.id}</span>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Botón para cambiar layout */}
            <Popover open={showLayoutOptions} onOpenChange={setShowLayoutOptions}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Layout className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Disposición</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant={block.layout === 'column' ? "default" : "outline"}
                      size="sm" 
                      className="p-2 h-auto"
                      onClick={() => handleLayoutChange('column')}
                    >
                      <Columns className="h-4 w-4 rotate-90" />
                      <span className="ml-1 text-xs">Columna</span>
                    </Button>
                    <Button 
                      variant={block.layout === 'row' ? "default" : "outline"}
                      size="sm" 
                      className="p-2 h-auto"
                      onClick={() => handleLayoutChange('row')}
                    >
                      <Rows3 className="h-4 w-4" />
                      <span className="ml-1 text-xs">Fila</span>
                    </Button>
                    <Button 
                      variant={block.layout === 'grid-2' ? "default" : "outline"}
                      size="sm" 
                      className="p-2 h-auto"
                      onClick={() => handleLayoutChange('grid-2')}
                    >
                      <Grid2X2 className="h-4 w-4" />
                      <span className="ml-1 text-xs">2 Col</span>
                    </Button>
                    <Button 
                      variant={block.layout === 'grid-3' ? "default" : "outline"}
                      size="sm" 
                      className="p-2 h-auto"
                      onClick={() => handleLayoutChange('grid-3')}
                    >
                      <Grid2X2 className="h-4 w-4" />
                      <span className="ml-1 text-xs">3 Col</span>
                    </Button>
                    <Button 
                      variant={block.layout === 'grid-4' ? "default" : "outline"}
                      size="sm" 
                      className="p-2 h-auto"
                      onClick={() => handleLayoutChange('grid-4')}
                    >
                      <Grid2X2 className="h-4 w-4" />
                      <span className="ml-1 text-xs">4 Col</span>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Botón para redimensionar */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => setIsResizing(true)}
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
            
            {/* Botón para editar con IA */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={handleAIAssist}
            >
              <Wand2 className="h-3 w-3" />
            </Button>
            
            {/* Botones para mover el bloque */}
            {onMoveBlock && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => handleMove('up')}
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => handleMove('down')}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Contenido del contenedor */}
      <div 
        className={cn(
          getLayoutClass(block.layout),
          "p-4 transition-all duration-200",
          (isReorderMode || isSelected) ? "mt-6" : ""
        )}
      >
        {children}
      </div>
      
      {/* Botón flotante de IA - visible solo al pasar el ratón y cuando no está en modo reordenación ni está seleccionado */}
      {isHovered && !isReorderMode && !isSelected && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 animate-fade-in z-10"
          onClick={handleAIAssist}
        >
          <Wand2 className="h-4 w-4" />
        </Button>
      )}
      
      {/* Diálogo para redimensionar */}
      <Dialog open={isResizing} onOpenChange={setIsResizing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Redimensionar contenedor</DialogTitle>
            <DialogDescription>
              Ajusta el tamaño del contenedor.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="width" className="text-right">
                Ancho
              </Label>
              <Input
                id="width"
                value={temporarySize.width}
                onChange={(e) => setTemporarySize({ ...temporarySize, width: e.target.value })}
                className="col-span-3"
                placeholder="100%, 500px, auto"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="height" className="text-right">
                Alto
              </Label>
              <Input
                id="height"
                value={temporarySize.height}
                onChange={(e) => setTemporarySize({ ...temporarySize, height: e.target.value })}
                className="col-span-3"
                placeholder="auto, 300px, 50vh"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResizing(false)}>
              Cancelar
            </Button>
            <Button onClick={handleResize}>
              Aplicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para asistente IA */}
      <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              Asistente IA para contenedor
            </DialogTitle>
            <DialogDescription>
              Indica cómo quieres mejorar o modificar este contenedor.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-3 bg-muted/30 rounded border">
              <div className="text-sm font-medium mb-1">Contenedor ID:</div>
              <div className="text-sm text-muted-foreground">{block.id}</div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Instrucción para la IA:</label>
              <Textarea
                placeholder="Ej: 'Mejora la distribución de elementos', 'Cambia el estilo a más moderno', 'Añade más espacio entre elementos'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Describe claramente qué cambios quieres aplicar a este contenedor
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAIDialogOpen(false)} disabled={isApplyingAI}>
              Cancelar
            </Button>
            <Button onClick={handleApplyAI} disabled={isApplyingAI || !aiPrompt.trim()}>
              {isApplyingAI ? 'Aplicando...' : 'Aplicar IA'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResizableBlockContainer;
