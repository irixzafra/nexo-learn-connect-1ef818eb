import React, { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { GripVertical, Plus, MessageSquareText, ArrowDown, ArrowUp, Move, Layout, Grid2X2 } from 'lucide-react';
import { toast } from 'sonner';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import SectionInsert from './SectionInsert';
import InlineEdit from './InlineEdit';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ContainerLayout } from '@/types/pages';

interface DraggableItem {
  id: string;
  order: number;
  content: React.ReactNode;
  width?: string; // Cambiado de number a string para aceptar valores como '50%', '300px', etc
  height?: string; // Nuevo
  layout?: ContainerLayout; // Nuevo
  text?: string;
}

interface DraggableContentProps {
  items: DraggableItem[];
  table: string;
  className?: string;
  itemClassName?: string;
  onReorder?: (items: DraggableItem[]) => void;
  resizable?: boolean;
  layout?: 'vertical' | 'horizontal';
  minSize?: number;
  onAddItem?: (content: string, type?: string) => void;
  onLayoutChange?: (itemId: string, layout: ContainerLayout) => void;
  onItemResize?: (itemId: string, size: { width?: string, height?: string }) => void;
}

const DraggableContent: React.FC<DraggableContentProps> = ({
  items,
  table,
  className = '',
  itemClassName = '',
  onReorder,
  resizable = false,
  layout = 'vertical',
  minSize = 10,
  onAddItem,
  onLayoutChange,
  onItemResize
}) => {
  const { isEditMode, isReorderMode, reorderElements, updateText } = useEditMode();
  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>(items);
  const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [layoutDialogOpen, setLayoutDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<ContainerLayout>('column');
  const [resizeDialogOpen, setResizeDialogOpen] = useState(false);
  const [tempSize, setTempSize] = useState({ width: '', height: '' });

  const handleAddSection = (content: string, type?: string) => {
    if (onAddItem) {
      onAddItem(content, type);
    } else {
      const newItem: DraggableItem = {
        id: `item-${Date.now()}`,
        order: draggableItems.length + 1,
        content: <div>{content}</div>,
        text: content
      };
      
      const newItems = [...draggableItems];
      newItems.push(newItem);
      
      setDraggableItems(newItems);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: DraggableItem, index: number) => {
    if (!isReorderMode) return;
    
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.id);
    
    const element = e.currentTarget as HTMLElement;
    element.classList.add('opacity-50', 'border-2', 'border-primary');
    
    toast.info("Arrastra para reordenar y suelta para guardar la posición", {
      id: "drag-info",
      duration: 2000,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, item: DraggableItem, index: number) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === item.id || !isReorderMode) return;
    
    setHoverIndex(index);
    
    const element = e.currentTarget as HTMLElement;
    element.classList.add('bg-primary/10', 'border-primary');
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const element = e.currentTarget as HTMLElement;
    element.classList.remove('bg-primary/10', 'border-primary');
    setHoverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: DraggableItem, targetIndex: number) => {
    e.preventDefault();
    
    const allElements = document.querySelectorAll('.draggable-item');
    allElements.forEach(el => {
      (el as HTMLElement).classList.remove('opacity-50', 'border-2', 'border-primary', 'bg-primary/10');
    });
    
    if (!draggedItem || draggedItem.id === targetItem.id || !isReorderMode) return;
    
    const newItems = [...draggableItems];
    const draggedIndex = newItems.findIndex(i => i.id === draggedItem.id);
    
    if (draggedIndex === -1) return;
    
    const [removedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removedItem);
    
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setDraggableItems(updatedItems);
    setHoverIndex(null);
    
    handleSaveReorder(updatedItems);
  };

  const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
    const allElements = document.querySelectorAll('.draggable-item');
    allElements.forEach(el => {
      (el as HTMLElement).classList.remove('opacity-50', 'border-2', 'border-primary', 'bg-primary/10');
    });
    
    setDraggedItem(null);
    setHoverIndex(null);
  };

  const handleSaveReorder = async (itemsToSave: DraggableItem[]) => {
    if (!reorderElements || !isReorderMode) return;
    
    try {
      const elementsToUpdate = itemsToSave.map(item => ({
        id: item.id,
        order: item.order
      }));
      
      const success = await reorderElements(table, elementsToUpdate);
      
      if (success) {
        if (onReorder) {
          onReorder(itemsToSave);
        }
        toast.success("Elementos reordenados correctamente");
      } else {
        setDraggableItems(items);
        toast.error("No se pudo guardar el nuevo orden");
      }
    } catch (error) {
      console.error('Error saving new order:', error);
      toast.error("Error al reordenar los elementos");
      setDraggableItems(items);
    }
  };

  const handleAIGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Por favor, ingresa un prompt");
      return;
    }

    setIsGenerating(true);
    
    try {
      setTimeout(() => {
        setAiResult(`Contenido generado basado en: ${prompt}`);
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error("Error al generar contenido con IA");
      setIsGenerating(false);
    }
  };

  const handleAddItem = () => {
    if (aiResult) {
      handleAddSection(aiResult);
      setAiResult('');
      setPrompt('');
      setIsAIDialogOpen(false);
      
      toast.success("Nuevo elemento añadido correctamente");
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (!isReorderMode) return;
    
    const newItems = [...draggableItems];
    
    if ((index === 0 && direction === 'up') || 
        (index === newItems.length - 1 && direction === 'down')) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    
    const updatedItems = newItems.map((item, idx) => ({
      ...item,
      order: idx + 1
    }));
    
    setDraggableItems(updatedItems);
    
    handleSaveReorder(updatedItems);
  };

  const AddItemButton = () => (
    <Button
      variant="outline"
      size="sm"
      className="absolute bottom-2 right-2 z-20 rounded-full h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90"
      onClick={() => setIsAIDialogOpen(true)}
    >
      <Plus className="h-4 w-4" />
    </Button>
  );

  const openLayoutDialog = (itemId: string, currentLayout: ContainerLayout = 'column') => {
    setSelectedItemId(itemId);
    setSelectedLayout(currentLayout);
    setLayoutDialogOpen(true);
  };

  const applyLayout = () => {
    if (selectedItemId && onLayoutChange) {
      onLayoutChange(selectedItemId, selectedLayout);
      setLayoutDialogOpen(false);
    }
  };

  const openResizeDialog = (itemId: string, currentWidth?: string, currentHeight?: string) => {
    setSelectedItemId(itemId);
    setTempSize({
      width: currentWidth || '100%',
      height: currentHeight || 'auto'
    });
    setResizeDialogOpen(true);
  };

  const applyResize = () => {
    if (selectedItemId && onItemResize) {
      onItemResize(selectedItemId, tempSize);
      setResizeDialogOpen(false);
    }
  };

  // Modificar el método de renderizado para incluir las nuevas opciones de edición
  if (isEditMode && resizable) {
    return (
      <div className="relative space-y-2">
        <div className={className}>
          {draggableItems.map((item, index) => (
            <div 
              key={item.id}
              className={`${itemClassName} ${isEditMode ? 'relative' : ''} ${isReorderMode ? 'cursor-move border border-dashed rounded-md transition-colors' : ''} ${hoverIndex === index ? 'bg-primary/10 border-primary' : ''} mb-6`}
              draggable={isReorderMode}
              onDragStart={(e) => handleDragStart(e, item, index)}
              onDragOver={(e) => handleDragOver(e, item, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item, index)}
              onDragEnd={handleDragEnd}
              style={{ 
                width: item.width || '100%',
                minHeight: '100px'
              }}
            >
              {isReorderMode && (
                <div className="absolute left-0 top-0 w-full bg-muted/70 p-1 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1">
                    <GripVertical className="h-4 w-4 text-primary cursor-grab" />
                    <span className="text-xs font-medium">Elemento {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full"
                      onClick={() => openLayoutDialog(item.id, item.layout)}
                    >
                      <Layout className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full"
                      onClick={() => openResizeDialog(item.id, item.width, item.height)}
                    >
                      <Grid2X2 className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full"
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full"
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === draggableItems.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
              <div className={isReorderMode ? 'pt-8' : ''}>
                {item.content}
              </div>
            </div>
          ))}
        </div>
        
        {isEditMode && <SectionInsert onAddSection={handleAddSection} />}
        
        {isEditMode && (
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-2 right-2 z-20 rounded-full h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setIsAIDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
        
        {/* Dialog para cambiar el layout */}
        <Dialog open={layoutDialogOpen} onOpenChange={setLayoutDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cambiar disposición</DialogTitle>
              <DialogDescription>
                Selecciona cómo quieres organizar los elementos dentro de este contenedor.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button
                variant={selectedLayout === 'column' ? 'default' : 'outline'}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => setSelectedLayout('column')}
              >
                <div className="flex flex-col gap-1">
                  <div className="w-16 h-2 bg-primary/40 rounded"></div>
                  <div className="w-16 h-2 bg-primary/40 rounded"></div>
                  <div className="w-16 h-2 bg-primary/40 rounded"></div>
                </div>
                <span className="text-xs">Columna</span>
              </Button>
              
              <Button
                variant={selectedLayout === 'row' ? 'default' : 'outline'}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => setSelectedLayout('row')}
              >
                <div className="flex flex-row gap-1">
                  <div className="w-5 h-5 bg-primary/40 rounded"></div>
                  <div className="w-5 h-5 bg-primary/40 rounded"></div>
                  <div className="w-5 h-5 bg-primary/40 rounded"></div>
                </div>
                <span className="text-xs">Fila</span>
              </Button>
              
              <Button
                variant={selectedLayout === 'grid-2' ? 'default' : 'outline'}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => setSelectedLayout('grid-2')}
              >
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-5 h-5 bg-primary/40 rounded"></div>
                  <div className="w-5 h-5 bg-primary/40 rounded"></div>
                  <div className="w-5 h-5 bg-primary/40 rounded"></div>
                  <div className="w-5 h-5 bg-primary/40 rounded"></div>
                </div>
                <span className="text-xs">2 Columnas</span>
              </Button>
              
              <Button
                variant={selectedLayout === 'grid-3' ? 'default' : 'outline'}
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => setSelectedLayout('grid-3')}
              >
                <div className="grid grid-cols-3 gap-1">
                  <div className="w-3 h-3 bg-primary/40 rounded"></div>
                  <div className="w-3 h-3 bg-primary/40 rounded"></div>
                  <div className="w-3 h-3 bg-primary/40 rounded"></div>
                  <div className="w-3 h-3 bg-primary/40 rounded"></div>
                  <div className="w-3 h-3 bg-primary/40 rounded"></div>
                  <div className="w-3 h-3 bg-primary/40 rounded"></div>
                </div>
                <span className="text-xs">3 Columnas</span>
              </Button>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setLayoutDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={applyLayout}>
                Aplicar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Dialog para redimensionar */}
        <Dialog open={resizeDialogOpen} onOpenChange={setResizeDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Redimensionar contenedor</DialogTitle>
              <DialogDescription>
                Ajusta el tamaño del contenedor.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="width" className="text-right text-sm">
                  Ancho
                </label>
                <Input
                  id="width"
                  value={tempSize.width}
                  onChange={(e) => setTempSize({ ...tempSize, width: e.target.value })}
                  className="col-span-3"
                  placeholder="100%, 500px, auto"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="height" className="text-right text-sm">
                  Alto
                </label>
                <Input
                  id="height"
                  value={tempSize.height}
                  onChange={(e) => setTempSize({ ...tempSize, height: e.target.value })}
                  className="col-span-3"
                  placeholder="auto, 300px, 50vh"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setResizeDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={applyResize}>
                Aplicar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* AI Dialog */}
        <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Generar nuevo contenido con IA</DialogTitle>
              <DialogDescription>
                Describe el elemento que quieres añadir y la IA te ayudará a generarlo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Describe lo que quieres crear..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button 
                  onClick={handleAIGenerate} 
                  disabled={isGenerating || !prompt.trim()}
                  size="sm"
                >
                  {isGenerating ? 'Generando...' : 'Generar'}
                </Button>
              </div>
              
              {aiResult && (
                <div className="border rounded-md p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                    <MessageSquareText className="h-4 w-4" />
                    <span>Resultado:</span>
                  </div>
                  <Textarea 
                    value={aiResult} 
                    onChange={(e) => setAiResult(e.target.value)}
                    rows={5}
                    className="w-full"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAIDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddItem} disabled={!aiResult}>Añadir elemento</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // En el caso no resizable, mantenemos el código existente
  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.id} className={itemClassName}>
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default DraggableContent;
