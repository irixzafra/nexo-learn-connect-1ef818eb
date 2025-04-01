
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageData } from './types';

interface PageEditorDrawerProps {
  page: PageData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PageEditorDrawer: React.FC<PageEditorDrawerProps> = ({
  page,
  open,
  onOpenChange
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Editar página: {page.title}</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-2">
              <div className="font-medium">Título</div>
              <div>{page.title}</div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Ruta</div>
              <div className="bg-muted p-2 rounded">{page.path}</div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Descripción</div>
              <div>{page.description}</div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            {page.content?.blocks ? (
              <div className="space-y-4">
                {page.content.blocks.map((block, index) => (
                  <div key={index} className="border p-3 rounded">
                    <div className="font-medium mb-1">Bloque de tipo: {block.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {typeof block.content === 'string' 
                        ? block.content 
                        : JSON.stringify(block.content)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                Esta página no tiene bloques de contenido.
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <div className="font-medium">Estado</div>
              <div className="capitalize">{page.status}</div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Categoría</div>
              <div>{page.category || "Sin categoría"}</div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Tipo de acceso</div>
              <div className="capitalize">{page.accessType || "Público"}</div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PageEditorDrawer;
