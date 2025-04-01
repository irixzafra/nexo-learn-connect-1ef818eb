
import React from 'react';
import { SitePage, PageBlock } from '@/types/pages';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, X, History } from 'lucide-react';

interface PreviewChangesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  originalPage: SitePage | null;
  modifiedPage: SitePage | null;
}

const PreviewChangesDialog: React.FC<PreviewChangesDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  originalPage,
  modifiedPage
}) => {
  if (!originalPage || !modifiedPage) return null;

  const getChangeCount = (): number => {
    let changes = 0;
    
    // Check title changes
    if (originalPage.title !== modifiedPage.title) changes++;
    
    // Check meta description changes
    if (originalPage.meta_description !== modifiedPage.meta_description) changes++;
    
    // Check layout changes
    if (originalPage.layout !== modifiedPage.layout) changes++;
    
    // Check block changes
    const originalBlocks = originalPage.content?.blocks || [];
    const modifiedBlocks = modifiedPage.content?.blocks || [];
    
    // Count added/removed blocks
    const diff = Math.abs(originalBlocks.length - modifiedBlocks.length);
    if (diff > 0) changes += diff;
    
    // Count modified blocks
    const minLength = Math.min(originalBlocks.length, modifiedBlocks.length);
    for (let i = 0; i < minLength; i++) {
      if (JSON.stringify(originalBlocks[i]) !== JSON.stringify(modifiedBlocks[i])) {
        changes++;
      }
    }
    
    return changes;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Confirmar cambios
          </DialogTitle>
          <DialogDescription>
            Revisa los cambios antes de publicarlos. Se detectaron {getChangeCount()} modificaciones.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="visual" className="w-full flex-1 flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="visual">Vista previa visual</TabsTrigger>
            <TabsTrigger value="changes">Detalle de cambios</TabsTrigger>
            <TabsTrigger value="code">Vista de código</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="flex-1 flex flex-col">
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="border rounded-md p-4 overflow-hidden flex flex-col">
                <h3 className="text-sm font-medium pb-2 border-b mb-2">Versión original</h3>
                <ScrollArea className="flex-1">
                  <div className="space-y-4">
                    <h1 className="text-xl font-bold">{originalPage.title}</h1>
                    {originalPage.content?.blocks.map((block, index) => (
                      <RenderBlock key={block.id || index} block={block} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="border rounded-md p-4 overflow-hidden flex flex-col">
                <h3 className="text-sm font-medium pb-2 border-b mb-2">Versión modificada</h3>
                <ScrollArea className="flex-1">
                  <div className="space-y-4">
                    <h1 className="text-xl font-bold">{modifiedPage.title}</h1>
                    {modifiedPage.content?.blocks.map((block, index) => (
                      <RenderBlock key={block.id || index} block={block} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="changes" className="flex-1">
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4 p-2">
                {originalPage.title !== modifiedPage.title && (
                  <CompareChange 
                    label="Título" 
                    original={originalPage.title} 
                    modified={modifiedPage.title} 
                  />
                )}
                
                {originalPage.meta_description !== modifiedPage.meta_description && (
                  <CompareChange 
                    label="Meta descripción" 
                    original={originalPage.meta_description || ''} 
                    modified={modifiedPage.meta_description || ''} 
                  />
                )}
                
                {originalPage.layout !== modifiedPage.layout && (
                  <CompareChange 
                    label="Layout" 
                    original={originalPage.layout} 
                    modified={modifiedPage.layout} 
                  />
                )}
                
                <CompareBlocks 
                  originalBlocks={originalPage.content?.blocks || []} 
                  modifiedBlocks={modifiedPage.content?.blocks || []} 
                />
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="code" className="flex-1 flex flex-col">
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="border rounded-md p-2 overflow-hidden flex flex-col">
                <h3 className="text-xs font-medium pb-1 border-b mb-2">Código original</h3>
                <ScrollArea className="flex-1">
                  <pre className="text-xs p-2 font-mono bg-muted rounded">
                    {JSON.stringify(originalPage, null, 2)}
                  </pre>
                </ScrollArea>
              </div>
              
              <div className="border rounded-md p-2 overflow-hidden flex flex-col">
                <h3 className="text-xs font-medium pb-1 border-b mb-2">Código modificado</h3>
                <ScrollArea className="flex-1">
                  <pre className="text-xs p-2 font-mono bg-muted rounded">
                    {JSON.stringify(modifiedPage, null, 2)}
                  </pre>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-2 border-t">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="gap-1"
          >
            <X className="h-4 w-4" />
            Cancelar
          </Button>
          <Button 
            onClick={onConfirm}
            className="gap-1"
          >
            <Check className="h-4 w-4" />
            Publicar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Helper components for displaying comparisons
const CompareChange: React.FC<{ 
  label: string; 
  original: string; 
  modified: string;
}> = ({ label, original, modified }) => (
  <div className="border rounded-md overflow-hidden">
    <div className="bg-muted px-4 py-2 text-sm font-medium">
      {label}
    </div>
    <div className="grid grid-cols-2 divide-x">
      <div className="p-3 bg-red-50">
        <span className="text-xs text-muted-foreground block mb-1">Original:</span>
        <div className="text-sm">{original}</div>
      </div>
      <div className="p-3 bg-green-50">
        <span className="text-xs text-muted-foreground block mb-1">Nuevo:</span>
        <div className="text-sm">{modified}</div>
      </div>
    </div>
  </div>
);

const CompareBlocks: React.FC<{
  originalBlocks: PageBlock[];
  modifiedBlocks: PageBlock[];
}> = ({ originalBlocks, modifiedBlocks }) => {
  // Create a map of block IDs to their indices
  const blockMap = new Map<string, { origIndex: number, modIndex: number }>();
  
  originalBlocks.forEach((block, index) => {
    if (block.id) {
      blockMap.set(block.id, { origIndex: index, modIndex: -1 });
    }
  });
  
  modifiedBlocks.forEach((block, index) => {
    if (block.id) {
      const existing = blockMap.get(block.id);
      if (existing) {
        blockMap.set(block.id, { ...existing, modIndex: index });
      } else {
        blockMap.set(block.id, { origIndex: -1, modIndex: index });
      }
    }
  });
  
  // Check for changes
  const addedBlocks: PageBlock[] = [];
  const removedBlocks: PageBlock[] = [];
  const modifiedBlockPairs: { original: PageBlock, modified: PageBlock }[] = [];
  
  blockMap.forEach((indices, id) => {
    const { origIndex, modIndex } = indices;
    
    if (origIndex >= 0 && modIndex >= 0) {
      const originalBlock = originalBlocks[origIndex];
      const modifiedBlock = modifiedBlocks[modIndex];
      
      if (JSON.stringify(originalBlock) !== JSON.stringify(modifiedBlock)) {
        modifiedBlockPairs.push({ original: originalBlock, modified: modifiedBlock });
      }
    } else if (origIndex >= 0) {
      removedBlocks.push(originalBlocks[origIndex]);
    } else if (modIndex >= 0) {
      addedBlocks.push(modifiedBlocks[modIndex]);
    }
  });
  
  return (
    <div className="space-y-4">
      {addedBlocks.length > 0 && (
        <div className="border rounded-md overflow-hidden">
          <div className="bg-muted px-4 py-2 text-sm font-medium">
            Bloques añadidos ({addedBlocks.length})
          </div>
          <div className="p-3 bg-green-50">
            {addedBlocks.map((block, index) => (
              <div key={index} className="mb-2 last:mb-0 p-2 border border-green-200 rounded bg-white">
                <div className="font-medium text-sm flex items-center gap-2">
                  Nuevo bloque: {block.type}
                  {block.id && <span className="text-xs text-muted-foreground">ID: {block.id.substring(0, 8)}...</span>}
                </div>
                <pre className="text-xs p-2 mt-2 bg-muted rounded">
                  {JSON.stringify(block.content, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {removedBlocks.length > 0 && (
        <div className="border rounded-md overflow-hidden">
          <div className="bg-muted px-4 py-2 text-sm font-medium">
            Bloques eliminados ({removedBlocks.length})
          </div>
          <div className="p-3 bg-red-50">
            {removedBlocks.map((block, index) => (
              <div key={index} className="mb-2 last:mb-0 p-2 border border-red-200 rounded bg-white">
                <div className="font-medium text-sm flex items-center gap-2">
                  Bloque eliminado: {block.type}
                  {block.id && <span className="text-xs text-muted-foreground">ID: {block.id.substring(0, 8)}...</span>}
                </div>
                <pre className="text-xs p-2 mt-2 bg-muted rounded">
                  {JSON.stringify(block.content, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {modifiedBlockPairs.length > 0 && (
        <div className="border rounded-md overflow-hidden">
          <div className="bg-muted px-4 py-2 text-sm font-medium">
            Bloques modificados ({modifiedBlockPairs.length})
          </div>
          <div className="space-y-2 p-3">
            {modifiedBlockPairs.map(({ original, modified }, index) => (
              <div key={index} className="border rounded-md overflow-hidden">
                <div className="bg-muted px-3 py-1 text-sm">
                  Bloque {original.type} (ID: {original.id?.substring(0, 8)}...)
                </div>
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-3 bg-red-50">
                    <span className="text-xs text-muted-foreground block mb-1">Original:</span>
                    <pre className="text-xs p-2 bg-white rounded border border-red-200">
                      {JSON.stringify(original.content, null, 2)}
                    </pre>
                  </div>
                  <div className="p-3 bg-green-50">
                    <span className="text-xs text-muted-foreground block mb-1">Modificado:</span>
                    <pre className="text-xs p-2 bg-white rounded border border-green-200">
                      {JSON.stringify(modified.content, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {addedBlocks.length === 0 && removedBlocks.length === 0 && modifiedBlockPairs.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          No se detectaron cambios en los bloques de contenido.
        </div>
      )}
    </div>
  );
};

// Simple block renderer for preview
const RenderBlock: React.FC<{ block: PageBlock }> = ({ block }) => {
  const content = typeof block.content === 'string' ? block.content : JSON.stringify(block.content);
  
  switch (block.type) {
    case 'hero':
      return (
        <div className="bg-primary/10 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold">{content}</h2>
        </div>
      );
    case 'text':
      return <div className="prose max-w-none">{content}</div>;
    default:
      return (
        <div className="p-4 border rounded-md">
          <div className="text-sm font-medium mb-1">{block.type}</div>
          <div className="text-sm">{content}</div>
        </div>
      );
  }
};

export default PreviewChangesDialog;
