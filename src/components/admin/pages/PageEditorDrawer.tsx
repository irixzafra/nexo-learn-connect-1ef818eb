
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PageData } from './types';
import { FileText, Eye, Save } from 'lucide-react';
import DraggableBlocksContainer from '@/components/admin/DraggableBlocksContainer';

interface PageEditorDrawerProps {
  page: PageData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (updatedPage: PageData) => Promise<void>;
}

const PageEditorDrawer: React.FC<PageEditorDrawerProps> = ({
  page,
  open,
  onOpenChange,
  onSave
}) => {
  const [editedPage, setEditedPage] = useState<PageData | null>(page);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (page) {
      setEditedPage(page);
    }
  }, [page]);

  const handleFieldChange = (field: keyof PageData, value: any) => {
    setEditedPage(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };

  const handleSave = async () => {
    if (!onSave || !editedPage) return;
    
    try {
      setSaving(true);
      await onSave(editedPage);
      toast.success('Página actualizada correctamente');
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error('Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  const navigationMenus = [
    { value: 'main', label: 'Menú Principal' },
    { value: 'student', label: 'Navegación de Estudiante' },
    { value: 'instructor', label: 'Navegación de Instructor' },
    { value: 'admin', label: 'Navegación de Administrador' },
    { value: 'footer', label: 'Pie de Página' },
    { value: 'none', label: 'No mostrar en navegación' }
  ];
  
  const accessTypes = [
    { value: 'public', label: 'Público' },
    { value: 'authenticated', label: 'Autenticado' },
    { value: 'admin', label: 'Administrador' },
    { value: 'student', label: 'Estudiante' },
    { value: 'instructor', label: 'Instructor' }
  ];

  const statuses = [
    { value: 'draft', label: 'Borrador' },
    { value: 'published', label: 'Publicado' },
    { value: 'archived', label: 'Archivado' }
  ];
  
  const categories = [
    { value: 'general', label: 'General' },
    { value: 'learning', label: 'Aprendizaje' },
    { value: 'community', label: 'Comunidad' },
    { value: 'admin', label: 'Administración' },
    { value: 'account', label: 'Cuenta' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const renderBlockContent = (block: any) => {
    if (!block) return null;

    switch (block.type) {
      case 'text':
        return (
          <div className="p-4 border rounded mb-2">
            <div className="font-medium text-sm text-muted-foreground mb-1">{block.type}</div>
            <p>{typeof block.content === 'string' ? block.content : JSON.stringify(block.content)}</p>
          </div>
        );
      case 'heading':
        return (
          <div className="p-4 border rounded mb-2">
            <div className="font-medium text-sm text-muted-foreground mb-1">{block.type}</div>
            <h3 className="text-xl font-semibold">{typeof block.content === 'string' ? block.content : JSON.stringify(block.content)}</h3>
          </div>
        );
      case 'hero':
        return (
          <div className="p-4 border rounded mb-2 bg-primary/10">
            <div className="font-medium text-sm text-muted-foreground mb-1">{block.type}</div>
            <h2 className="text-2xl font-bold text-center py-8">{typeof block.content === 'string' ? block.content : block.content.title || 'Hero Content'}</h2>
            {block.content.subtitle && <p className="text-center">{block.content.subtitle}</p>}
          </div>
        );
      case 'features':
        return (
          <div className="p-4 border rounded mb-2">
            <div className="font-medium text-sm text-muted-foreground mb-1">{block.type}</div>
            <h3 className="font-medium mb-2">{block.content.title || 'Features Section'}</h3>
            <div className="grid grid-cols-3 gap-2">
              {Array.isArray(block.content.items) ? block.content.items.map((item: any, i: number) => (
                <div key={i} className="p-2 border rounded">
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              )) : (
                <div className="text-sm text-muted-foreground">No items defined</div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 border rounded mb-2">
            <div className="font-medium text-sm text-muted-foreground mb-1">{block.type}</div>
            <pre className="text-xs bg-muted p-2 rounded overflow-auto">
              {JSON.stringify(block.content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  if (!editedPage) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[70vw] max-w-[1000px] overflow-y-auto sm:max-w-none">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Editar página: {editedPage.title}
          </SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Contenido</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={editedPage.title || ''}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="Título de la página"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="path">Ruta (slug)</Label>
                <Input
                  id="path"
                  value={editedPage.path || ''}
                  onChange={(e) => handleFieldChange('path', e.target.value)}
                  placeholder="/ruta-de-pagina"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={editedPage.description || ''}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Descripción de la página"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="category">Categoría</Label>
                <Select 
                  value={editedPage.category || ''} 
                  onValueChange={(value) => handleFieldChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="status">Estado de publicación</Label>
                <Select 
                  value={editedPage.status || ''} 
                  onValueChange={(value) => handleFieldChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="navigation">Navegación</Label>
                <Select 
                  value={editedPage.navigation || "none"}
                  onValueChange={(value) => handleFieldChange('navigation', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar menú" />
                  </SelectTrigger>
                  <SelectContent>
                    {navigationMenus.map((menu) => (
                      <SelectItem key={menu.value} value={menu.value}>
                        {menu.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="accessType">Tipo de acceso</Label>
                <Select 
                  value={editedPage.accessType || "public"} 
                  onValueChange={(value: 'public' | 'authenticated' | 'admin' | 'student' | 'instructor') => 
                    handleFieldChange('accessType', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de acceso" />
                  </SelectTrigger>
                  <SelectContent>
                    {accessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="component">Componente</Label>
              <Input
                id="component"
                value={editedPage.component || ''}
                onChange={(e) => handleFieldChange('component', e.target.value)}
                placeholder="Nombre del componente React"
                className="font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">
                Nombre del componente React que se utilizará para renderizar esta página
              </p>
            </div>
            
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Guardar cambios
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-3">Vista previa del contenido</h3>
              
              {editedPage.content?.blocks && editedPage.content.blocks.length > 0 ? (
                <div className="bg-white p-6 rounded-md border shadow-sm min-h-[400px]">
                  <h1 className="text-2xl font-bold mb-4">{editedPage.title}</h1>
                  <DraggableBlocksContainer 
                    blocks={editedPage.content.blocks} 
                    onBlocksChange={(blocks) => {
                      handleFieldChange('content', { blocks });
                    }}
                    renderBlockContent={renderBlockContent}
                  />
                </div>
              ) : (
                <div className="text-center p-8 bg-muted/20 rounded-md border border-dashed flex flex-col items-center justify-center min-h-[400px]">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No hay contenido</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Esta página no tiene bloques de contenido definidos o utiliza un componente personalizado para su renderizado.
                  </p>
                </div>
              )}

              <div className="mt-6">
                <iframe 
                  src={`/pages/${editedPage.path}`}
                  className="w-full border rounded h-[400px] mt-4"
                  title={`Vista previa de ${editedPage.title}`}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default PageEditorDrawer;
