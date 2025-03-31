
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus, Trash2, MoveUp, MoveDown, Columns, Type, Image } from 'lucide-react';
import { nanoid } from 'nanoid';
import { PageBlock } from '@/types/pages';

interface PageContentEditorProps {
  form: UseFormReturn<any>;
}

const PageContentEditor: React.FC<PageContentEditorProps> = ({ form }) => {
  const content = form.watch('content') || { blocks: [] };
  
  const addBlock = (type: PageBlock['type']) => {
    const blocks = [...(content.blocks || [])];
    const newBlock: PageBlock = {
      id: nanoid(8),
      type,
      content: type === 'text' ? 'Nuevo texto' : type === 'hero' ? 'Título del hero' : ''
    };
    
    blocks.push(newBlock);
    form.setValue('content', { blocks }, { shouldDirty: true });
  };
  
  const updateBlockContent = (index: number, newContent: any) => {
    const blocks = [...(content.blocks || [])];
    blocks[index] = {
      ...blocks[index],
      content: newContent
    };
    form.setValue('content', { blocks }, { shouldDirty: true });
  };
  
  const removeBlock = (index: number) => {
    const blocks = [...(content.blocks || [])];
    blocks.splice(index, 1);
    form.setValue('content', { blocks }, { shouldDirty: true });
  };
  
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const blocks = [...(content.blocks || [])];
    if (direction === 'up' && index > 0) {
      const temp = blocks[index];
      blocks[index] = blocks[index - 1];
      blocks[index - 1] = temp;
    } else if (direction === 'down' && index < blocks.length - 1) {
      const temp = blocks[index];
      blocks[index] = blocks[index + 1];
      blocks[index + 1] = temp;
    }
    form.setValue('content', { blocks }, { shouldDirty: true });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL / Slug</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <span className="mr-2 text-muted-foreground">/</span>
                  <Input {...field} placeholder="url-de-la-pagina" />
                </div>
              </FormControl>
              <FormDescription>URL amigable para la página</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="published">Publicada</SelectItem>
                  <SelectItem value="archived">Archivada</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Solo las páginas publicadas son visibles</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="layout"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diseño</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un diseño" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="default">Por defecto</SelectItem>
                  <SelectItem value="landing">Landing Page</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="documentation">Documentación</SelectItem>
                  <SelectItem value="course">Curso</SelectItem>
                  <SelectItem value="sidebar">Con Sidebar</SelectItem>
                  <SelectItem value="full-width">Ancho Completo</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Estructura y apariencia de la página</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Bloques de contenido</label>
        <div className="space-y-4">
          {content.blocks && content.blocks.length > 0 ? (
            content.blocks.map((block: PageBlock, index: number) => (
              <Card key={block.id || index} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">
                      {block.type === 'text' && <Type className="h-4 w-4 inline mr-2" />}
                      {block.type === 'hero' && <Image className="h-4 w-4 inline mr-2" />}
                      {block.type === 'cta' && <Columns className="h-4 w-4 inline mr-2" />}
                      Bloque: {block.type}
                    </CardTitle>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => moveBlock(index, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => moveBlock(index, 'down')}
                        disabled={index === content.blocks.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive" 
                        onClick={() => removeBlock(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {block.type === 'text' && (
                    <Input 
                      value={typeof block.content === 'string' ? block.content : ''}
                      onChange={(e) => updateBlockContent(index, e.target.value)}
                      placeholder="Contenido de texto"
                    />
                  )}
                  {block.type === 'hero' && (
                    <Input 
                      value={typeof block.content === 'string' ? block.content : ''}
                      onChange={(e) => updateBlockContent(index, e.target.value)}
                      placeholder="Título del héroe"
                    />
                  )}
                  {block.type === 'cta' && (
                    <Input 
                      value={typeof block.content === 'string' ? block.content : ''}
                      onChange={(e) => updateBlockContent(index, e.target.value)}
                      placeholder="Texto de llamada a la acción"
                    />
                  )}
                  {!['text', 'hero', 'cta'].includes(block.type) && (
                    <div className="bg-muted rounded p-2 text-center text-sm text-muted-foreground">
                      Este tipo de bloque requiere configuración avanzada
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="bg-muted/40 rounded-lg p-8 text-center border border-dashed">
              <p className="text-muted-foreground mb-4">No hay bloques de contenido</p>
              <p className="text-sm text-muted-foreground mb-4">Añade bloques para crear el contenido de tu página</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
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
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => addBlock('cta')}
          >
            <Plus className="h-4 w-4 mr-2" />
            CTA
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => addBlock('features')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Características
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageContentEditor;
