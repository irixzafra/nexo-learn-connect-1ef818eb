import React, { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { GripVertical, Plus, MessageSquareText, ArrowDown, ArrowUp, Move } from 'lucide-react';
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

interface DraggableItem {
  id: string;
  order: number;
  content: React.ReactNode;
  width?: number;
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
  onAddItem?: (content: string, position?: number) => void;
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
  onAddItem
}) => {
  const { isEditMode, isReorderMode, reorderElements, updateText } = useEditMode();
  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>(items);
  const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Updated to accept position as number to fix type errors
  const handleAddSection = (content: string, position?: number) => {
    if (onAddItem) {
      onAddItem(content, position);
    } else {
      // Si no hay una función personalizada, agregamos el elemento al estado local
      const newItem: DraggableItem = {
        id: `item-${Date.now()}`,
        order: position !== undefined ? position : draggableItems.length + 1,
        content: <div>{content}</div>,
        text: content
      };
      
      const newItems = [...draggableItems];
      if (position !== undefined) {
        newItems.splice(position, 0, newItem);
        // Actualizar el orden de los elementos siguientes
        for (let i = position + 1; i < newItems.length; i++) {
          newItems[i].order = i + 1;
        }
      } else {
        newItems.push(newItem);
      }
      
      setDraggableItems(newItems);
    }
  };

  if (!isEditMode) {
    if (resizable) {
      return (
        <ResizablePanelGroup 
          direction={layout === 'vertical' ? 'vertical' : 'horizontal'}
          className={className}
        >
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <ResizablePanel 
                defaultSize={item.width || 100 / items.length} 
                minSize={minSize}
                className={itemClassName}
              >
                {item.content}
              </ResizablePanel>
              {index < items.length - 1 && (
                <ResizableHandle />
              )}
            </React.Fragment>
          ))}
        </ResizablePanelGroup>
      );
    }
    
    return (
      <div className={className}>
        {items.map((item) => (
          <div key={item.id} className={itemClassName}>
            {item.content}
          </div>
        ))}
      </div>
    );
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: DraggableItem, index: number) => {
    if (!isReorderMode) return;
    
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    // Required for Firefox
    e.dataTransfer.setData('text/plain', item.id);
    
    // Añadir clase de estilos durante el arrastre
    const element = e.currentTarget as HTMLElement;
    element.classList.add('opacity-50', 'border-2', 'border-primary');
    
    // Mostrar una guía visual de que estamos arrastrando
    toast.info("Arrastra para reordenar y suelta para guardar la posición", {
      id: "drag-info",
      duration: 2000,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, item: DraggableItem, index: number) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === item.id || !isReorderMode) return;
    
    // Actualizar el índice sobre el que estamos
    setHoverIndex(index);
    
    // Añadir indicadores visuales
    const element = e.currentTarget as HTMLElement;
    element.classList.add('bg-primary/10', 'border-primary');
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // Eliminar los indicadores visuales
    const element = e.currentTarget as HTMLElement;
    element.classList.remove('bg-primary/10', 'border-primary');
    setHoverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: DraggableItem, targetIndex: number) => {
    e.preventDefault();
    
    // Eliminar los indicadores visuales
    const allElements = document.querySelectorAll('.draggable-item');
    allElements.forEach(el => {
      (el as HTMLElement).classList.remove('opacity-50', 'border-2', 'border-primary', 'bg-primary/10');
    });
    
    if (!draggedItem || draggedItem.id === targetItem.id || !isReorderMode) return;
    
    // Reordenar items
    const newItems = [...draggableItems];
    const draggedIndex = newItems.findIndex(i => i.id === draggedItem.id);
    
    if (draggedIndex === -1) return;
    
    // Remover el elemento arrastrado y colocarlo en la nueva posición
    const [removedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removedItem);
    
    // Actualizar order values
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setDraggableItems(updatedItems);
    setHoverIndex(null);
    
    // Guardar el nuevo orden
    handleSaveReorder(updatedItems);
  };

  const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
    // Eliminar los indicadores visuales
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
        // Revert to original order on failure
        setDraggableItems(items);
        toast.error("No se pudo guardar el nuevo orden");
      }
    } catch (error) {
      console.error('Error saving new order:', error);
      toast.error("Error al reordenar los elementos");
      // Revert to original order on error
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
      // Here we would call an AI API, for now simulating response
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
    
    // No hacer nada si intentamos mover el primer elemento hacia arriba
    // o el último elemento hacia abajo
    if ((index === 0 && direction === 'up') || 
        (index === newItems.length - 1 && direction === 'down')) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Intercambiar elementos
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    
    // Actualizar orden
    const updatedItems = newItems.map((item, idx) => ({
      ...item,
      order: idx + 1
    }));
    
    setDraggableItems(updatedItems);
    
    // Guardar el nuevo orden
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

  if (isEditMode) {
    if (resizable) {
      return (
        <div className="relative space-y-2">
          <ResizablePanelGroup 
            direction={layout === 'vertical' ? 'vertical' : 'horizontal'}
            className={className}
          >
            {draggableItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <ResizablePanel 
                  defaultSize={item.width || 100 / draggableItems.length} 
                  minSize={minSize}
                  className={`${itemClassName} ${isEditMode ? 'relative' : ''} ${isReorderMode ? 'cursor-move border border-dashed rounded-md transition-colors' : ''} ${hoverIndex === index ? 'bg-primary/10 border-primary' : ''}`}
                >
                  <div
                    draggable={isReorderMode}
                    onDragStart={(e) => handleDragStart(e, item, index)}
                    onDragOver={(e) => handleDragOver(e, item, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, item, index)}
                    onDragEnd={handleDragEnd}
                    className={`h-full w-full draggable-item ${isReorderMode ? 'group' : ''}`}
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
                      {typeof item.content === 'string' || item.text ? (
                        <InlineEdit
                          table={table}
                          id={item.id}
                          field="content"
                          value={item.text || (typeof item.content === 'string' ? item.content : '')}
                          multiline={true}
                          className="w-full"
                        />
                      ) : (
                        item.content
                      )}
                    </div>
                  </div>
                </ResizablePanel>
                {index < draggableItems.length - 1 && (
                  <ResizableHandle withHandle />
                )}
                
                {/* Insert Section Component between panels */}
                {isEditMode && index < draggableItems.length - 1 && (
                  <SectionInsert onAddSection={(content) => handleAddSection(content, index + 1)} />
                )}
              </React.Fragment>
            ))}
          </ResizablePanelGroup>
          
          {/* Add section at the end */}
          {isEditMode && <SectionInsert onAddSection={handleAddSection} />}
          
          {isEditMode && <AddItemButton />}
          
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
  }

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
