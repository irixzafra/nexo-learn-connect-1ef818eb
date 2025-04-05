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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PageData, PageBlock as AdminPageBlock } from './types';
import { PageBlock as GlobalPageBlock } from '@/types/pages';
import { FileText, Eye, Save, Check, ChevronsUpDown, X } from 'lucide-react';
import PagePreviewTab from './drawer-tabs/PagePreviewTab';
import { cn } from '@/lib/utils';

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
  const [selectedNavigations, setSelectedNavigations] = useState<string[]>([]);
  const [navigationPopoverOpen, setNavigationPopoverOpen] = useState(false);

  useEffect(() => {
    if (page) {
      // Ensure all blocks have IDs
      const processedPage = {
        ...page,
        content: page.content ? {
          blocks: (page.content.blocks || []).map(block => ({
            ...block,
            id: block.id || `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          }))
        } : {
          blocks: []
        }
      };
      setEditedPage(processedPage);
      
      // Initialize selectedNavigations correctly based on page.navigation
      let initialNavigations: string[] = [];
      if (page.navigation) {
        if (typeof page.navigation === 'string') {
          // If it's a string, convert to array unless it's 'none'
          initialNavigations = page.navigation !== 'none' ? [page.navigation] : ['none'];
        } else if (Array.isArray(page.navigation)) {
          // If it's already an array, use it directly
          initialNavigations = page.navigation.length > 0 ? page.navigation : ['none'];
        }
      } else {
        // Default to 'none' if no navigation is set
        initialNavigations = ['none'];
      }
      
      setSelectedNavigations(initialNavigations);
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
      
      // Update the navigation field with the selected navigations
      const updatedPage = {
        ...editedPage,
        navigation: selectedNavigations.length > 0 
          ? (selectedNavigations.includes('none') ? 'none' : selectedNavigations) 
          : 'none'
      };
      
      await onSave(updatedPage);
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

  // Handle selection/deselection of navigation items
  const toggleNavigationItem = (value: string) => {
    setSelectedNavigations(current => {
      // Ensure we have a valid array to work with
      const currentArray = current || [];
      
      // If selecting "none", clear all other selections
      if (value === 'none') {
        return ['none'];
      }
      
      // If current selection includes "none" and selecting something else, remove "none"
      if (currentArray.includes('none')) {
        return [value];
      }
      
      // Toggle the selected value
      const updatedSelections = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
        
      return updatedSelections.length > 0 ? updatedSelections : ['none'];
    });
  };

  if (!editedPage) return null;

  // Initialize safely for the Command component
  const safeSelectedNavigations = selectedNavigations || [];

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
                <Popover 
                  open={navigationPopoverOpen} 
                  onOpenChange={setNavigationPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={navigationPopoverOpen}
                      className="w-full justify-between"
                    >
                      {safeSelectedNavigations.length > 0
                        ? safeSelectedNavigations.includes('none')
                          ? 'No mostrar en navegación'
                          : `${safeSelectedNavigations.length} seleccionados`
                        : "Seleccionar navegación"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar navegación..." />
                      <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {navigationMenus.map((item) => (
                            <CommandItem
                              key={item.value}
                              value={item.value}
                              onSelect={() => {
                                toggleNavigationItem(item.value);
                                setNavigationPopoverOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  safeSelectedNavigations.includes(item.value) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {item.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                
                {/* Display selected items as badges */}
                {safeSelectedNavigations.length > 0 && !safeSelectedNavigations.includes('none') && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {safeSelectedNavigations.map((nav) => {
                      const navItem = navigationMenus.find(item => item.value === nav);
                      return navItem ? (
                        <Badge key={nav} variant="secondary" className="px-2 py-1">
                          {navItem.label}
                          <X 
                            className="ml-1 h-3 w-3 cursor-pointer" 
                            onClick={() => toggleNavigationItem(nav)}
                          />
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}
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
            <PagePreviewTab page={editedPage} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default PageEditorDrawer;
