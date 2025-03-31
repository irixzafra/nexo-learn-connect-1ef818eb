
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus, AlignLeft, Image, LayoutGrid, Quote, List, Link, Heading } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface PageContentEditorProps {
  form: UseFormReturn<any>;
}

const PageContentEditor: React.FC<PageContentEditorProps> = ({ form }) => {
  // Get current content blocks
  const content = form.watch('content') || { blocks: [] };
  const blocks = content.blocks || [];

  // Add a new block
  const addBlock = (type: string) => {
    const newBlock = {
      id: `block_${Date.now()}`,
      type,
      content: getDefaultContentForType(type)
    };
    
    const updatedBlocks = [...blocks, newBlock];
    form.setValue('content', { blocks: updatedBlocks });
  };

  // Get default content based on block type
  const getDefaultContentForType = (type: string) => {
    switch (type) {
      case 'text':
        return { text: 'Nuevo texto aquí' };
      case 'hero':
        return { title: 'Título Hero', subtitle: 'Subtítulo', buttonText: 'Botón' };
      case 'cta':
        return { title: 'Título CTA', buttonText: 'Botón' };
      case 'features':
        return { title: 'Características', items: [{ title: 'Característica 1', description: 'Descripción' }] };
      default:
        return {};
    }
  };

  // Remove a block
  const removeBlock = (index: number) => {
    const updatedBlocks = blocks.filter((_, i) => i !== index);
    form.setValue('content', { blocks: updatedBlocks });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Bloques de contenido</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => addBlock('text')}
          >
            <AlignLeft className="h-4 w-4 mr-2" />
            Texto
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => addBlock('hero')}
          >
            <Heading className="h-4 w-4 mr-2" />
            Hero
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => addBlock('features')}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Características
          </Button>
        </div>
      </div>

      {blocks.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              No hay bloques de contenido en esta página.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => addBlock('text')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir primer bloque
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <Card key={block.id || index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base capitalize">
                    Bloque: {block.type}
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive"
                    onClick={() => removeBlock(index)}
                  >
                    Eliminar
                  </Button>
                </div>
                <CardDescription>
                  ID: {block.id}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="p-2 bg-muted rounded-md text-xs overflow-auto">
                  {JSON.stringify(block.content, null, 2)}
                </pre>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  Editar contenido
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageContentEditor;
