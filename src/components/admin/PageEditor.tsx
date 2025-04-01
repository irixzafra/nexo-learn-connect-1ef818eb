
import React, { useState, useEffect } from 'react';
import { SitePage, PageBlock, PageBlockType } from '@/types/pages';
import DraggableBlocksContainer from './DraggableBlocksContainer';
import EditableContent from './EditableContent';
import PreviewChangesDialog from './PreviewChangesDialog';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  EyeIcon,
  Save,
  LayoutTemplate,
  Settings2,
  FileText,
  Copy,
  Trash2
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PageEditorProps {
  page: SitePage;
  onSave: (page: SitePage) => Promise<void>;
  onPublish?: (page: SitePage) => Promise<void>;
  className?: string;
}

const PageEditor: React.FC<PageEditorProps> = ({
  page: initialPage,
  onSave,
  onPublish,
  className
}) => {
  const [page, setPage] = useState<SitePage>(initialPage);
  const [initialPageState, setInitialPageState] = useState<SitePage>(initialPage);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);

  useEffect(() => {
    setPage(initialPage);
    setInitialPageState(initialPage);
  }, [initialPage]);

  useEffect(() => {
    // Check if page has been modified
    const pageJson = JSON.stringify(page);
    const initialPageJson = JSON.stringify(initialPageState);
    setIsDirty(pageJson !== initialPageJson);
  }, [page, initialPageState]);

  const handleUpdateBlocks = (newBlocks: PageBlock[]) => {
    setPage(prevPage => ({
      ...prevPage,
      content: {
        ...(prevPage.content || {}),
        blocks: newBlocks
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(page);
      setInitialPageState(page);
      setIsDirty(false);
      toast.success('Página guardada correctamente');
    } catch (error) {
      console.error('Error al guardar la página:', error);
      toast.error('Error al guardar la página');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPreviewDialogOpen(true);
  };

  const confirmPublish = async () => {
    setIsPublishing(true);
    try {
      if (onPublish) {
        await onPublish(page);
        toast.success('Página publicada correctamente');
      } else {
        // Si no hay función de publicación, guardamos normalmente
        await onSave({
          ...page,
          status: 'published' as const
        });
        toast.success('Página guardada y publicada correctamente');
      }
      setInitialPageState(page);
      setIsDirty(false);
    } catch (error) {
      console.error('Error al publicar la página:', error);
      toast.error('Error al publicar la página');
    } finally {
      setIsPublishing(false);
      setIsPreviewDialogOpen(false);
    }
  };

  const renderBlockContent = (block: PageBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <EditableContent
            table="page_blocks"
            id={block.id}
            field="content"
            value={typeof block.content === 'string' ? block.content : JSON.stringify(block.content)}
            multiline={true}
            className="prose max-w-none min-h-[100px] p-4"
            contentType="text"
            tags={block.tags}
            onUpdate={(newValue) => {
              const updatedBlocks = page.content?.blocks.map(b =>
                b.id === block.id ? { ...b, content: newValue } : b
              ) || [];
              handleUpdateBlocks(updatedBlocks);
              return Promise.resolve(true);
            }}
          />
        );
        
      case 'hero':
        return (
          <div className="bg-primary/10 p-8 rounded-lg text-center">
            <EditableContent
              table="page_blocks"
              id={block.id}
              field="content"
              value={typeof block.content === 'string' ? block.content : JSON.stringify(block.content)}
              className="text-2xl font-bold"
              contentType="rich-text"
              tags={block.tags}
              onUpdate={(newValue) => {
                const updatedBlocks = page.content?.blocks.map(b =>
                  b.id === block.id ? { ...b, content: newValue } : b
                ) || [];
                handleUpdateBlocks(updatedBlocks);
                return Promise.resolve(true);
              }}
            />
          </div>
        );
        
      case 'features':
        const featuresContent = typeof block.content === 'object' ? block.content : { title: '', items: [] };
        return (
          <div className="space-y-6">
            <EditableContent
              table="page_blocks"
              id={`${block.id}-title`}
              field="content.title"
              value={featuresContent.title || 'Características'}
              className="text-xl font-bold text-center"
              onUpdate={(newValue) => {
                const updatedBlocks = page.content?.blocks.map(b =>
                  b.id === block.id ? { 
                    ...b, 
                    content: { 
                      ...featuresContent,
                      title: newValue 
                    } 
                  } : b
                ) || [];
                handleUpdateBlocks(updatedBlocks);
                return Promise.resolve(true);
              }}
            />
            
            <div className={cn(
              "grid gap-6",
              block.layout === 'grid-2' ? 'grid-cols-1 md:grid-cols-2' :
              block.layout === 'grid-3' ? 'grid-cols-1 md:grid-cols-3' :
              block.layout === 'grid-4' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
              block.layout === 'row' ? 'flex flex-row gap-4' : 'flex flex-col gap-4'
            )}>
              {featuresContent.items && featuresContent.items.map((item: any, index: number) => (
                <div key={index} className="p-4 border rounded-md">
                  <EditableContent
                    table="page_blocks"
                    id={`${block.id}-item-${index}-title`}
                    field={`content.items[${index}].title`}
                    value={item.title || `Característica ${index + 1}`}
                    className="font-medium mb-2"
                    onUpdate={(newValue) => {
                      const updatedItems = [...featuresContent.items];
                      updatedItems[index] = { 
                        ...updatedItems[index],
                        title: newValue 
                      };
                      
                      const updatedBlocks = page.content?.blocks.map(b =>
                        b.id === block.id ? { 
                          ...b, 
                          content: { 
                            ...featuresContent,
                            items: updatedItems 
                          } 
                        } : b
                      ) || [];
                      handleUpdateBlocks(updatedBlocks);
                      return Promise.resolve(true);
                    }}
                  />
                  
                  <EditableContent
                    table="page_blocks"
                    id={`${block.id}-item-${index}-description`}
                    field={`content.items[${index}].description`}
                    value={item.description || 'Descripción de la característica'}
                    className="text-sm text-muted-foreground"
                    multiline={true}
                    onUpdate={(newValue) => {
                      const updatedItems = [...featuresContent.items];
                      updatedItems[index] = { 
                        ...updatedItems[index],
                        description: newValue 
                      };
                      
                      const updatedBlocks = page.content?.blocks.map(b =>
                        b.id === block.id ? { 
                          ...b, 
                          content: { 
                            ...featuresContent,
                            items: updatedItems 
                          } 
                        } : b
                      ) || [];
                      handleUpdateBlocks(updatedBlocks);
                      return Promise.resolve(true);
                    }}
                  />
                </div>
              ))}
              
              <Button
                variant="outline"
                className="border-dashed flex items-center justify-center h-20"
                onClick={() => {
                  const updatedItems = [...(featuresContent.items || [])];
                  updatedItems.push({
                    title: `Característica ${updatedItems.length + 1}`,
                    description: 'Descripción de la característica'
                  });
                  
                  const updatedBlocks = page.content?.blocks.map(b =>
                    b.id === block.id ? { 
                      ...b, 
                      content: { 
                        ...featuresContent,
                        items: updatedItems 
                      } 
                    } : b
                  ) || [];
                  handleUpdateBlocks(updatedBlocks);
                }}
              >
                + Añadir característica
              </Button>
            </div>
          </div>
        );
        
      // Puedes agregar más tipos de bloques aquí
        
      default:
        return (
          <div className="p-4 border rounded-md bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Bloque de tipo <code>{block.type}</code>
            </p>
            <pre className="mt-2 p-2 bg-muted text-xs rounded">
              {JSON.stringify(block.content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className={cn("container mx-auto px-4 py-6", className)}>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>
                <Input
                  value={page.title}
                  onChange={(e) => setPage({...page, title: e.target.value})}
                  className="text-2xl font-bold border-none px-0 text-4xl h-auto focus-visible:ring-0"
                  placeholder="Título de la página"
                />
              </CardTitle>
              <CardDescription>
                <span className="mr-2">URL:</span>
                <span className="font-mono bg-muted py-0.5 px-1 rounded text-xs">
                  /{page.slug}
                </span>
              </CardDescription>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={!isDirty || isSaving}
              >
                {isSaving ? 'Guardando...' : 'Guardar borrador'}
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing ? 'Publicando...' : 'Publicar'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-base">
                <LayoutTemplate className="h-5 w-5 mr-2" />
                Editor de contenido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DraggableBlocksContainer
                blocks={page.content?.blocks || []}
                onBlocksChange={handleUpdateBlocks}
                renderBlockContent={renderBlockContent}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base">
                <Settings2 className="h-5 w-5 mr-2" />
                Configuración
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basics">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basics">Básico</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basics" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL amigable</Label>
                    <div className="flex">
                      <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 text-muted-foreground">
                        /
                      </span>
                      <Input
                        id="slug"
                        value={page.slug}
                        onChange={(e) => setPage({...page, slug: e.target.value})}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="layout">Layout</Label>
                    <select
                      id="layout"
                      value={page.layout}
                      onChange={(e) => setPage({...page, layout: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="default">Estándar</option>
                      <option value="landing">Landing Page</option>
                      <option value="marketing">Marketing</option>
                      <option value="documentation">Documentación</option>
                      <option value="course">Curso</option>
                      <option value="sidebar">Con barra lateral</option>
                      <option value="full-width">Ancho completo</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <select
                      id="status"
                      value={page.status}
                      onChange={(e) => setPage({...page, status: e.target.value as any})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="draft">Borrador</option>
                      <option value="published">Publicado</option>
                      <option value="archived">Archivado</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="access">Acceso</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="public" 
                          name="access" 
                          value="public"
                          className="h-4 w-4"
                          checked={!page.accessType || page.accessType === 'public'}
                          onChange={() => setPage({...page, accessType: 'public'})}
                        />
                        <Label htmlFor="public" className="cursor-pointer">Público (cualquier visitante)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="authenticated" 
                          name="access" 
                          value="authenticated"
                          className="h-4 w-4"
                          checked={page.accessType === 'authenticated'}
                          onChange={() => setPage({...page, accessType: 'authenticated'})}
                        />
                        <Label htmlFor="authenticated" className="cursor-pointer">Usuarios registrados</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id="admin" 
                          name="access" 
                          value="admin"
                          className="h-4 w-4"
                          checked={page.accessType === 'admin'}
                          onChange={() => setPage({...page, accessType: 'admin'})}
                        />
                        <Label htmlFor="admin" className="cursor-pointer">Solo administradores</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="seo" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta descripción</Label>
                    <Input
                      id="meta-description"
                      value={page.meta_description || ''}
                      onChange={(e) => setPage({...page, meta_description: e.target.value})}
                      placeholder="Descripción para motores de búsqueda"
                    />
                    <p className="text-xs text-muted-foreground">
                      {(page.meta_description?.length || 0)}/160 caracteres
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t pt-4 flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  // Implementar vista previa en nueva pestaña
                  toast.info('Funcionalidad de vista previa en desarrollo');
                }}
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                Vista previa
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  // Duplicar página
                  const duplicatedPage = {
                    ...page,
                    id: crypto.randomUUID(),
                    title: `${page.title} (copia)`,
                    slug: `${page.slug}-copia`,
                    status: 'draft' as const
                  };
                  // Implementar duplicación
                  toast.info('Funcionalidad de duplicación en desarrollo');
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicar página
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  // Implementar eliminación
                  toast.info('Funcionalidad de eliminación en desarrollo');
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar página
              </Button>
            </CardFooter>
          </Card>
          
          {isDirty && (
            <Alert variant="default" className="border-primary/50 bg-primary/10">
              <AlertTitle className="text-primary">Cambios no guardados</AlertTitle>
              <AlertDescription>
                Has realizado cambios en esta página que aún no se han guardado.
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Revertir cambios
                      setPage(initialPageState);
                      setIsDirty(false);
                    }}
                  >
                    Descartar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                  >
                    Guardar
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
      
      <PreviewChangesDialog
        isOpen={isPreviewDialogOpen}
        onClose={() => setIsPreviewDialogOpen(false)}
        onConfirm={confirmPublish}
        originalPage={initialPageState}
        modifiedPage={page}
      />
    </div>
  );
};

export default PageEditor;
