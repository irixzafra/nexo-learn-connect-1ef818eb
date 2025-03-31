
import React from 'react';
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
import { Plus } from 'lucide-react';

interface PageContentEditorProps {
  form: UseFormReturn<any>;
}

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
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Bloques de Contenido</h3>
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => addBlock('text')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Texto
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => addBlock('hero')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Hero
              </Button>
            </div>
          </div>
          
          {blocks.length === 0 ? (
            <div className="text-center py-8 border rounded-md bg-muted/50">
              <p className="text-muted-foreground">
                No hay bloques de contenido. Añade alguno con los botones de arriba.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {blocks.map((block: any, index: number) => (
                <div key={block.id || index} className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                      {block.type === 'text' ? 'Texto' : 'Hero'}
                    </span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        const newBlocks = [...blocks];
                        newBlocks.splice(index, 1);
                        form.setValue('content', {
                          ...content,
                          blocks: newBlocks
                        });
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                  
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
                    className="mt-2 resize-none"
                    rows={block.type === 'hero' ? 2 : 4}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};

export default PageContentEditor;
