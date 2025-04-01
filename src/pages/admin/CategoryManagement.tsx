import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Folder, PlusCircle, Pencil, Archive, X, CheckCircle, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useFeatures } from '@/contexts/features/FeaturesContext';

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { featuresConfig } = useFeatures();

  // Estado para el formulario de nueva categoría
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    isActive: true,
    parentId: null
  });

  // Estado para filtros
  const [filters, setFilters] = useState({
    showInactive: false,
    showEmpty: true,
    onlyTopLevel: false
  });

  // Función para generar slug automáticamente desde el nombre
  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' ? { slug: generateSlug(value) } : {})
    }));
  };

  // Manejar cambios en checkbox
  const handleCheckboxChange = (checked: boolean) => {
    setNewCategory(prev => ({
      ...prev,
      isActive: checked
    }));
  };

  // Manejar cambios en filtros
  const handleFilterChange = (filterName: string, value: boolean) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Crear nueva categoría
  const handleCreateCategory = async () => {
    try {
      setIsLoading(true);
      
      // Aquí iría la lógica para guardar en la base de datos
      // await createCategory(newCategory);
      
      // Simulamos una operación asíncrona
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar la lista de categorías (simulado)
      setCategories(prev => [...prev, { ...newCategory, id: Date.now().toString() }]);
      
      // Resetear el formulario
      setNewCategory({
        name: '',
        slug: '',
        description: '',
        isActive: true,
        parentId: null
      });
      
      setIsAddDialogOpen(false);
      toast.success('Categoría creada correctamente');
    } catch (error) {
      console.error('Error al crear categoría:', error);
      toast.error('Error al crear la categoría');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar categorías según los criterios de búsqueda
  const filteredCategories = categories.filter(category => {
    // Filtro por texto de búsqueda
    const matchesSearch = 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtro por estado activo/inactivo
    const matchesActiveState = filters.showInactive || category.isActive;
    
    // Filtro por nivel (top level o todos)
    const matchesLevel = !filters.onlyTopLevel || category.parentId === null;
    
    // Filtro por categorías vacías
    // Aquí necesitaríamos lógica adicional para determinar si una categoría está vacía
    // Por ahora asumimos que todas tienen contenido
    const matchesEmpty = true;
    
    return matchesSearch && matchesActiveState && matchesLevel && matchesEmpty;
  });

  return (
    <AdminPageLayout 
      title="Gestión de Categorías" 
      subtitle="Administra las categorías de cursos y contenido"
      actions={
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Categoría
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Input
              placeholder="Buscar categorías..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="showInactive" 
                checked={filters.showInactive}
                onCheckedChange={(checked) => 
                  handleFilterChange('showInactive', checked as boolean)
                }
              />
              <Label htmlFor="showInactive">Mostrar inactivas</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="onlyTopLevel" 
                checked={filters.onlyTopLevel}
                onCheckedChange={(checked) => 
                  handleFilterChange('onlyTopLevel', checked as boolean)
                }
              />
              <Label htmlFor="onlyTopLevel">Solo nivel superior</Label>
            </div>
          </div>
        </div>
        
        {/* Lista de categorías */}
        <div className="bg-card rounded-md border">
          <div className="grid grid-cols-12 gap-4 p-4 font-medium text-muted-foreground border-b">
            <div className="col-span-5">Nombre</div>
            <div className="col-span-3">Slug</div>
            <div className="col-span-2">Estado</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>
          
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <div 
                key={category.id || index} 
                className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-accent/50 transition-colors"
              >
                <div className="col-span-5 flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="col-span-3">
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    {category.slug}
                  </code>
                </div>
                <div className="col-span-2">
                  {category.isActive ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Activa
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                      Inactiva
                    </Badge>
                  )}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              {searchQuery ? (
                <div className="space-y-2">
                  <p>No se encontraron categorías que coincidan con "{searchQuery}"</p>
                  <Button variant="link" onClick={() => setSearchQuery('')}>
                    Limpiar búsqueda
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p>No hay categorías disponibles</p>
                  <Button variant="link" onClick={() => setIsAddDialogOpen(true)}>
                    Crear primera categoría
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Diálogo para crear nueva categoría */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crear Nueva Categoría</DialogTitle>
            <DialogDescription>
              Añade una nueva categoría para organizar el contenido
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nombre de la categoría"
                value={newCategory.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="slug-de-categoria"
                value={newCategory.slug}
                onChange={handleInputChange}
              />
              <p className="text-xs text-muted-foreground">
                El slug se genera automáticamente, pero puedes personalizarlo
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                name="description"
                placeholder="Descripción breve de la categoría"
                value={newCategory.description}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="isActive" 
                checked={newCategory.isActive}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="isActive">Categoría activa</Label>
            </div>
            
            {featuresConfig.enableNestedCategories && (
              <div className="space-y-2">
                <Label htmlFor="parentCategory">Categoría padre (opcional)</Label>
                <select
                  id="parentCategory"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newCategory.parentId || ''}
                  onChange={(e) => setNewCategory(prev => ({
                    ...prev,
                    parentId: e.target.value || null
                  }))}
                >
                  <option value="">Ninguna (categoría de nivel superior)</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateCategory} 
              disabled={!newCategory.name || !newCategory.slug || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Creando...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Crear Categoría
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
};

export default CategoryManagement;
