
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical, FileText, Image, List, Link } from 'lucide-react';
import { PageAIContentGenerator } from './ai-generator';
import { Card, CardContent } from '@/components/ui/card';
import { PageBlock } from '@/types/pages';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface PageContentEditorProps {
  form: UseFormReturn<any>;
}

const BLOCK_TYPES = [
  { type: 'text', label: 'Texto', icon: FileText },
  { type: 'hero', label: 'Hero', icon: Image },
  { type: 'features', label: 'Características', icon: List },
  { type: 'cta', label: 'Llamada a la acción', icon: Link },
];

const PageContentEditor: React.FC<PageContentEditorProps> = ({ form }) => {
  // Function to add a new empty block to the content
  const addBlock = (type: string) => {
    const content = form.getValues('content') || { blocks: [] };
    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === 'hero' ? 'Nuevo Título Destacado' : 'Nuevo contenido'
    };
    
    form.setValue('content', {
      ...content,
      blocks: [...(content.blocks || []), newBlock]
    });
  };

  // Function to handle drag and drop reordering
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    
    // Drop outside the list or no movement
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    const content = form.getValues('content') || { blocks: [] };
    const blocks = [...(content.blocks || [])];
    const [removed] = blocks.splice(source.index, 1);
    blocks.splice(destination.index, 0, removed);
    
    form.setValue('content', {
      ...content,
      blocks
    });
  };

  // Function to delete a block
  const deleteBlock = (index: number) => {
    const content = form.getValues('content') || { blocks: [] };
    const blocks = [...(content.blocks || [])];
    blocks.splice(index, 1);
    
    form.setValue('content', {
      ...content,
      blocks
    });
  };

  // Get the current blocks
  const content = form.watch('content') || { blocks: [] };
  const blocks = content.blocks || [];

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Título de la página" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <PageAIContentGenerator form={form} />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-medium">Bloques de Contenido</h3>
            <div className="flex flex-wrap gap-2">
              {BLOCK_TYPES.map((blockType) => (
                <Button 
                  key={blockType.type}
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => addBlock(blockType.type)}
                  className="flex items-center gap-1"
                >
                  <blockType.icon className="h-4 w-4" />
                  <span>{blockType.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {blocks.length === 0 ? (
            <div className="text-center py-8 border rounded-md bg-muted/50">
              <p className="text-muted-foreground">
                No hay bloques de contenido. Añade alguno con los botones de arriba o utiliza el generador de IA.
              </p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="page-blocks">
                {(provided) => (
                  <div 
                    className="space-y-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {blocks.map((block: PageBlock, index: number) => (
                      <Draggable 
                        key={block.id || `block-${index}`}
                        draggableId={block.id || `block-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border rounded-md overflow-hidden ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                          >
                            <div className="bg-muted px-4 py-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div 
                                  {...provided.dragHandleProps}
                                  className="cursor-move hover:text-primary transition-colors"
                                >
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                                  {block.type === 'text' ? 'Texto' : 
                                   block.type === 'hero' ? 'Hero' : 
                                   block.type === 'features' ? 'Características' : 
                                   block.type === 'cta' ? 'Llamada a la acción' : block.type}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => deleteBlock(index)}
                                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <CardContent className="p-4">
                              <Textarea 
                                value={block.content}
                                onChange={(e) => {
                                  const newBlocks = [...blocks];
                                  newBlocks[index].content = e.target.value;
                                  form.setValue('content', {
                                    ...content,
                                    blocks: newBlocks
                                  });
                                }}
                                placeholder={block.type === 'hero' ? "Contenido destacado" : "Contenido de texto"}
                                className="resize-none border-0 focus-visible:ring-0 p-0"
                                rows={block.type === 'hero' ? 2 : 4}
                              />
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </Form>
  );
};

export default PageContentEditor;
