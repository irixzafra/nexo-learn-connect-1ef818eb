
import React, { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { 
  Layout, Move, ArrowsMaximize, ChevronDown, ChevronUp, 
  ChevronLeft, ChevronRight, Grid2X2, Rows3, Columns
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
  const { isEditMode, isReorderMode } = useEditMode();
  const [isResizing, setIsResizing] = useState(false);
  const [showLayoutOptions, setShowLayoutOptions] = useState(false);
  const [temporarySize, setTemporarySize] = useState({
    width: block.width || '100%',
    height: block.height || 'auto'
  });

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

  return (
    <div 
      className={cn(
        "relative group border border-dashed border-transparent",
        isReorderMode ? "cursor-move hover:border-primary" : "hover:border-muted-foreground",
        className
      )}
      style={{ 
        width: block.width || '100%', 
        height: block.height || 'auto',
        minHeight: '100px'
      }}
    >
      {/* Barra de herramientas del contenedor */}
      <div className="absolute top-0 left-0 right-0 bg-muted/70 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Move className="h-3 w-3" />
          </Button>
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
            <ArrowsMaximize className="h-3 w-3" />
          </Button>
          
          {/* Botones para mover el bloque */}
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
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => handleMove('left')}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => handleMove('right')}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* Contenido del contenedor */}
      <div 
        className={cn(
          getLayoutClass(block.layout),
          "p-4 mt-6 transition-all duration-200"
        )}
      >
        {children}
      </div>
      
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
    </div>
  );
};

export default ResizableBlockContainer;
