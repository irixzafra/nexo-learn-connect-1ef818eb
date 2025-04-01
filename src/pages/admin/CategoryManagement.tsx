import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFeatures } from '@/contexts/features/FeatureContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useForm } from 'react-hook-form';
import { Plus, MoreVertical, Trash2, Edit, Filter, FolderTree, Grid3X3, List, FileText } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const sampleCategories: Category[] = [
  {
    id: '1',
    name: 'Programación',
    slug: 'programacion',
    description: 'Cursos de programación y desarrollo de software',
    is_active: true,
    sort_order: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Diseño Gráfico',
    slug: 'diseno-grafico',
    description: 'Cursos de diseño gráfico, UI/UX y artes visuales',
    is_active: true,
    sort_order: 2,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Marketing Digital',
    slug: 'marketing-digital',
    description: 'Estrategias y técnicas de marketing online',
    is_active: true,
    sort_order: 3,
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Desarrollo Web',
    slug: 'desarrollo-web',
    description: 'Cursos de HTML, CSS, JavaScript y frameworks web',
    parent_id: '1',
    is_active: true,
    sort_order: 1,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    name: 'Desarrollo Móvil',
    slug: 'desarrollo-movil',
    description: 'Desarrollo de aplicaciones para iOS y Android',
    parent_id: '1',
    is_active: true,
    sort_order: 2,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z'
  }
];

const checkFeatureEnabled = (features: any) => {
  // Check if the enableCategoryManagement is defined in the FeaturesConfig
  return features.enableCategoryManagement === true;
};

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(sampleCategories);
  const [view, setView] = useState<'grid' | 'list' | 'tree'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { features } = useFeatures();
  
  const form = useForm<Category>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      parent_id: undefined,
      is_active: true,
      sort_order: 0
    }
  });

  // Fetch categories
  useEffect(() => {
    // This would be an API call in a real application
    // setCategories(fetchedCategories);
  }, []);

  const handleCreateCategory = () => {
    // Reset form and open dialog
    form.reset({
      name: '',
      slug: '',
      description: '',
      parent_id: undefined,
      is_active: true,
      sort_order: categories.length + 1
    });
    setCreateDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    form.reset({
      ...category
    });
    setEditDialogOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedCategory) return;
    
    setIsLoading(true);
    
    // Simulating API request
    setTimeout(() => {
      setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
      toast.success('Categoría eliminada correctamente');
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
      setIsLoading(false);
    }, 500);
  };

  const onSubmitForm = (data: Category) => {
    setIsLoading(true);
    
    // Generate slug if not provided
    if (!data.slug) {
      data.slug = data.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
    }
    
    // Simulating API request
    setTimeout(() => {
      if (editDialogOpen && selectedCategory) {
        // Update existing category
        setCategories(categories.map(cat => 
          cat.id === selectedCategory.id ? { ...data, id: cat.id, updated_at: new Date().toISOString() } : cat
        ));
        toast.success('Categoría actualizada correctamente');
        setEditDialogOpen(false);
      } else {
        // Create new category
        const newCategory: Category = {
          ...data,
          id: `${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setCategories([...categories, newCategory]);
        toast.success('Categoría creada correctamente');
        setCreateDialogOpen(false);
      }
      
      setSelectedCategory(null);
      setIsLoading(false);
    }, 500);
  };

  const getParentName = (parentId?: string) => {
    if (!parentId) return 'Ninguna';
    const parent = categories.find(cat => cat.id === parentId);
    return parent ? parent.name : 'Desconocida';
  };

  const renderCategoryGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map(category => (
        <Card key={category.id} className={`overflow-hidden ${!category.is_active ? 'opacity-70' : ''}`}>
          <CardHeader className="p-4 pb-0 flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <CardDescription>
                {category.parent_id && (
                  <span className="text-xs block">En: {getParentName(category.parent_id)}</span>
                )}
                <span className="text-xs">{category.slug}</span>
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Acciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                  <Edit className="h-4 w-4 mr-2" />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDeleteCategory(category)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span>Eliminar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.description || 'Sin descripción'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderCategoryList = () => (
    <div className="overflow-hidden rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="h-10 px-4 text-left font-medium">Nombre</th>
            <th className="h-10 px-4 text-left font-medium">Slug</th>
            <th className="h-10 px-4 text-left font-medium">Categoría padre</th>
            <th className="h-10 px-4 text-left font-medium">Activa</th>
            <th className="h-10 px-4 text-left font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {categories.map(category => (
            <tr key={category.id} className={`${!category.is_active ? 'opacity-70' : ''}`}>
              <td className="p-4">{category.name}</td>
              <td className="p-4 text-muted-foreground">{category.slug}</td>
              <td className="p-4">{getParentName(category.parent_id)}</td>
              <td className="p-4">{category.is_active ? 'Sí' : 'No'}</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCategoryTree = () => {
    // Simple implementation of tree view - a more sophisticated one would handle deeper nesting
    const rootCategories = categories.filter(cat => !cat.parent_id);
    
    const renderCategory = (category: Category) => {
      const children = categories.filter(cat => cat.parent_id === category.id);
      
      return (
        <div key={category.id} className="border-l pl-4 my-2">
          <div className="flex justify-between items-center py-2">
            <div className="flex-1">
              <div className="font-medium">{category.name}</div>
              <div className="text-sm text-muted-foreground">{category.slug}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
              </Button>
            </div>
          </div>
          {children.length > 0 && (
            <div className="ml-2">
              {children.map(renderCategory)}
            </div>
          )}
        </div>
      );
    };
    
    return (
      <div className="space-y-2 p-2">
        {rootCategories.map(renderCategory)}
      </div>
    );
  };

  // Esta función se usará cuando se cree la implementación real
  const supportsNestedCategories = () => {
    // En una implementación real, esto verificaría si la característica existe en features
    // Por ahora, para pasar la compilación, verificamos una propiedad estándar
    return checkFeatureEnabled(features);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Gestión de Categorías</CardTitle>
            <CardDescription>
              Organiza el contenido en categorías para una mejor navegación
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreateCategory}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Categoría
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Tabs defaultValue="all" className="w-auto">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="active">Activas</TabsTrigger>
                <TabsTrigger value="inactive">Inactivas</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              
              <div className="flex border rounded-md">
                <Button 
                  variant={view === 'grid' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="rounded-r-none"
                  onClick={() => setView('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="sr-only">Vista de cuadrícula</span>
                </Button>
                <Button 
                  variant={view === 'list' ? 'secondary' : 'ghost'} 
                  size="sm"
                  className="rounded-none"
                  onClick={() => setView('list')}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">Vista de lista</span>
                </Button>
                <Button 
                  variant={view === 'tree' ? 'secondary' : 'ghost'} 
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setView('tree')}
                  disabled={!supportsNestedCategories()}
                >
                  <FolderTree className="h-4 w-4" />
                  <span className="sr-only">Vista de árbol</span>
                </Button>
              </div>
            </div>
          </div>
          
          {view === 'grid' && renderCategoryGrid()}
          {view === 'list' && renderCategoryList()}
          {view === 'tree' && renderCategoryTree()}
          
          {categories.length === 0 && (
            <div className="text-center py-12 border rounded-lg border-dashed">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No hay categorías</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
                No se han creado categorías todavía. Crea una categoría para organizar el contenido.
              </p>
              <Button className="mt-4" onClick={handleCreateCategory}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Categoría
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Create/Edit Dialog */}
      <Dialog open={createDialogOpen || editDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setCreateDialogOpen(false);
          setEditDialogOpen(false);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editDialogOpen ? 'Editar Categoría' : 'Crear Nueva Categoría'}
            </DialogTitle>
            <DialogDescription>
              {editDialogOpen 
                ? 'Actualiza los detalles de la categoría existente' 
                : 'Completa la información para crear una nueva categoría'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input 
                id="name" 
                placeholder="Nombre de la categoría" 
                {...form.register('name', { required: true })} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input 
                id="slug" 
                placeholder="nombre-categoria" 
                {...form.register('slug')} 
              />
              <p className="text-xs text-muted-foreground">
                Déjalo en blanco para generarlo automáticamente
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input 
                id="description" 
                placeholder="Breve descripción de la categoría" 
                {...form.register('description')} 
              />
            </div>
            
            {supportsNestedCategories() && (
              <div className="space-y-2">
                <Label htmlFor="parent_id">Categoría Padre</Label>
                <select 
                  id="parent_id"
                  className="w-full flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                  {...form.register('parent_id')}
                >
                  <option value="">Ninguna (Categoría raíz)</option>
                  {categories
                    .filter(cat => !selectedCategory || cat.id !== selectedCategory.id)
                    .map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  }
                </select>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="is_active" 
                checked={form.watch('is_active')}
                onCheckedChange={(checked) => 
                  form.setValue('is_active', checked as boolean)
                }
              />
              <Label htmlFor="is_active" className="text-sm font-normal">
                Categoría activa
              </Label>
            </div>
            
            <DialogFooter>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => {
                  setCreateDialogOpen(false);
                  setEditDialogOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Guardando...' : editDialogOpen ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar categoría?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar la categoría "{selectedCategory?.name}"?
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryManagement;
