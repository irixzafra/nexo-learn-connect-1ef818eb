
import React, { useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Folders, Plus, Edit, Trash2, ArrowUp, ArrowDown, Save, X, Folder } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock data - en una implementación real, esto vendría de Supabase
const MOCK_CATEGORIES = [
  { id: '1', name: 'Programación', slug: 'programacion', description: 'Cursos de programación' },
  { id: '2', name: 'Diseño', slug: 'diseno', description: 'Cursos de diseño gráfico y UX/UI' },
  { id: '3', name: 'Marketing', slug: 'marketing', description: 'Cursos de marketing digital' },
];

interface CategoryManagementProps {
  embeddedView?: boolean;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ embeddedView = false }) => {
  const { featuresConfig } = useOnboarding();
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });

  // Verificar si el usuario tiene permiso para acceder a esta página
  if (!embeddedView && (!featuresConfig.enableCategoryManagement || userRole !== 'admin')) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p>No tienes permiso para acceder a esta página.</p>
          <Button 
            className="mt-4" 
            onClick={() => navigate('/admin/content')}
          >
            Volver a Gestión de Contenido
          </Button>
        </div>
      </AppLayout>
    );
  }

  // Funciones para gestionar categorías
  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.slug) {
      toast.error('El nombre y el slug son obligatorios');
      return;
    }
    
    // En una implementación real, esto sería una llamada a Supabase
    setCategories([...categories, { ...newCategory, id: `new-${Date.now()}` }]);
    setNewCategory({ name: '', slug: '', description: '' });
    setIsAdding(false);
    toast.success('Categoría creada correctamente');
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    
    // En una implementación real, esto sería una llamada a Supabase
    const updatedCategories = categories.map(cat => 
      cat.id === editingCategory.id ? editingCategory : cat
    );
    setCategories(updatedCategories);
    setEditingCategory(null);
    toast.success('Categoría actualizada correctamente');
  };

  const handleDeleteCategory = (id: string) => {
    // En una implementación real, esto sería una llamada a Supabase con verificación
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      setCategories(categories.filter(cat => cat.id !== id));
      toast.success('Categoría eliminada correctamente');
    }
  };

  const handleMoveCategory = (id: string, direction: 'up' | 'down') => {
    // En una implementación real, esto actualizaría los campos de orden en Supabase
    const index = categories.findIndex(c => c.id === id);
    if (
      (direction === 'up' && index > 0) || 
      (direction === 'down' && index < categories.length - 1)
    ) {
      const newCategories = [...categories];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newCategories[index], newCategories[targetIndex]] = [newCategories[targetIndex], newCategories[index]];
      setCategories(newCategories);
      toast.success(`Categoría movida ${direction === 'up' ? 'arriba' : 'abajo'}`);
    }
  };

  const content = (
    <div className={embeddedView ? "" : "container mx-auto p-6"}>
      {!embeddedView && (
        <div className="flex items-center gap-3 mb-6">
          <Folders className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
        </div>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Categorías</CardTitle>
          <CardDescription>
            Crea, edita y ordena las categorías para los cursos y contenido
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Lista de categorías */}
          <div className="space-y-4 mb-6">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between border p-3 rounded-md">
                {editingCategory?.id === category.id ? (
                  <div className="flex-1 space-y-2">
                    <div>
                      <Label htmlFor="edit-name">Nombre</Label>
                      <Input 
                        id="edit-name"
                        value={editingCategory.name} 
                        onChange={e => setEditingCategory({...editingCategory, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-slug">Slug</Label>
                      <Input 
                        id="edit-slug"
                        value={editingCategory.slug} 
                        onChange={e => setEditingCategory({...editingCategory, slug: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Descripción</Label>
                      <Textarea 
                        id="edit-description"
                        value={editingCategory.description || ''} 
                        onChange={e => setEditingCategory({...editingCategory, description: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2 justify-end mt-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setEditingCategory(null)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleUpdateCategory}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Guardar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center">
                      <Folder className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleMoveCategory(category.id, 'up')}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleMoveCategory(category.id, 'down')}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => setEditingCategory(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Formulario de nueva categoría */}
          {isAdding ? (
            <div className="border p-4 rounded-md space-y-3">
              <h3 className="font-medium">Nueva Categoría</h3>
              <div>
                <Label htmlFor="name">Nombre *</Label>
                <Input 
                  id="name"
                  value={newCategory.name} 
                  onChange={e => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Nombre de la categoría"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input 
                  id="slug"
                  value={newCategory.slug} 
                  onChange={e => setNewCategory({...newCategory, slug: e.target.value})}
                  placeholder="categoria-slug"
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea 
                  id="description"
                  value={newCategory.description} 
                  onChange={e => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Descripción de la categoría"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAdding(false);
                    setNewCategory({ name: '', slug: '', description: '' });
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleAddCategory}>
                  Guardar
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Añadir Categoría
            </Button>
          )}
        </CardContent>
      </Card>

      {!embeddedView && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => navigate('/admin/content')}>
            Volver a Gestión de Contenido
          </Button>
        </div>
      )}
    </div>
  );

  if (embeddedView) {
    return content;
  }

  return (
    <AppLayout>
      {content}
    </AppLayout>
  );
};

export default CategoryManagement;
