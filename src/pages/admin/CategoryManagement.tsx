
import React, { useState } from 'react';
import { 
  Check, 
  Pencil, 
  Plus, 
  Trash, 
  ChevronDown, 
  Search,
  BookOpen, 
  X,
  Command,
  Loader2
} from 'lucide-react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFeatures } from '@/hooks/useFeatures';

// Definir datos de ejemplo
const categories = [
  { 
    id: 1, 
    name: 'Programación', 
    slug: 'programacion', 
    description: 'Cursos de programación y desarrollo de software', 
    coursesCount: 24,
    status: 'active' 
  },
  { 
    id: 2, 
    name: 'Diseño', 
    slug: 'diseno', 
    description: 'Cursos de diseño gráfico y web', 
    coursesCount: 18,
    status: 'active' 
  },
  { 
    id: 3, 
    name: 'Marketing', 
    slug: 'marketing', 
    description: 'Cursos de marketing digital y tradicional', 
    coursesCount: 15,
    status: 'active' 
  },
  { 
    id: 4, 
    name: 'Negocios', 
    slug: 'negocios', 
    description: 'Cursos de administración y emprendimiento', 
    coursesCount: 12,
    status: 'active' 
  },
  { 
    id: 5, 
    name: 'Ciencia de Datos', 
    slug: 'data-science', 
    description: 'Cursos de análisis de datos y machine learning', 
    coursesCount: 8,
    status: 'active' 
  },
  { 
    id: 6, 
    name: 'Idiomas', 
    slug: 'idiomas', 
    description: 'Cursos para aprender diferentes idiomas', 
    coursesCount: 22,
    status: 'inactive' 
  },
  { 
    id: 7, 
    name: 'Fotografía', 
    slug: 'fotografia', 
    description: 'Cursos de fotografía y edición', 
    coursesCount: 10,
    status: 'active' 
  },
  { 
    id: 8, 
    name: 'Música', 
    slug: 'musica', 
    description: 'Cursos de teoría musical e instrumentos', 
    coursesCount: 14,
    status: 'active' 
  },
  { 
    id: 9, 
    name: 'Cocina', 
    slug: 'cocina', 
    description: 'Cursos de gastronomía y repostería', 
    coursesCount: 9,
    status: 'inactive' 
  },
  { 
    id: 10, 
    name: 'Salud y Bienestar', 
    slug: 'salud-bienestar', 
    description: 'Cursos de nutrición, fitness y meditación', 
    coursesCount: 16,
    status: 'active' 
  },
];

// Esquema de validación para categorías
const formSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(50, 'El nombre no debe exceder 50 caracteres'),
  slug: z.string().min(3, 'El slug debe tener al menos 3 caracteres').max(50, 'El slug no debe exceder 50 caracteres'),
  description: z.string().max(200, 'La descripción no debe exceder 200 caracteres').optional(),
  status: z.enum(['active', 'inactive']),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { featuresConfig } = useFeatures();

  // Formulario de categoría
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      status: 'active',
    },
  });

  const resetForm = () => {
    form.reset({
      name: '',
      slug: '',
      description: '',
      status: 'active',
    });
  };

  // Manejadores para los diálogos
  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    form.reset({
      name: category.name,
      slug: category.slug,
      description: category.description,
      status: category.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteCategory = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit = (values: CategoryFormValues) => {
    console.log('Form Values:', values);
    if (selectedCategory) {
      // Lógica para actualizar categoría
      console.log('Updating category:', selectedCategory.id, values);
      setIsEditDialogOpen(false);
    } else {
      // Lógica para crear categoría
      console.log('Creating category:', values);
      setIsCreateDialogOpen(false);
    }
    resetForm();
  };

  // Filtrar categorías según término de búsqueda
  const filteredCategories = categories.filter(
    category => category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isCategoryManagementEnabled = featuresConfig.enableCategoryManagement;

  if (!isCategoryManagementEnabled) {
    return (
      <AdminPageLayout 
        title="Gestión de Categorías" 
        subtitle="Administra las categorías de cursos"
      >
        <div className="flex flex-col items-center justify-center h-96">
          <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Función no disponible</h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            La gestión de categorías está desactivada actualmente. 
            Contacta con el administrador para habilitar esta función.
          </p>
          <Button asChild variant="outline">
            <a href="/admin/settings">Ir a configuración</a>
          </Button>
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout 
      title="Gestión de Categorías" 
      subtitle="Administra las categorías de cursos"
    >
      <div className="space-y-6">
        {/* Barra de herramientas */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar categorías..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                className="absolute right-0 top-0 h-9 w-9 p-0"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Limpiar</span>
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[7rem]">
                  Estado
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>Activos</DropdownMenuItem>
                <DropdownMenuItem>Inactivos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setSelectedCategory(null);
                  resetForm();
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Categoría
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Crear Nueva Categoría</DialogTitle>
                  <DialogDescription>
                    Añade una nueva categoría para organizar los cursos
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre de la categoría" {...field} />
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
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input placeholder="slug-de-la-categoria" {...field} />
                          </FormControl>
                          <FormDescription>
                            Identificador único para URLs
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descripción breve de la categoría" 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="active"
                                  value="active"
                                  checked={field.value === 'active'}
                                  onChange={() => field.onChange('active')}
                                  className="h-4 w-4"
                                />
                                <Label htmlFor="active">Activo</Label>
                              </div>
                            </FormControl>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="inactive"
                                  value="inactive"
                                  checked={field.value === 'inactive'}
                                  onChange={() => field.onChange('inactive')}
                                  className="h-4 w-4"
                                />
                                <Label htmlFor="inactive">Inactivo</Label>
                              </div>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter className="pt-4">
                      <Button type="submit">Crear Categoría</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabla de categorías */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="hidden md:table-cell">Descripción</TableHead>
                <TableHead className="text-center">Cursos</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron categorías.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">
                      {category.description}
                    </TableCell>
                    <TableCell className="text-center">{category.coursesCount}</TableCell>
                    <TableCell className="text-center">
                      {category.status === 'active' ? (
                        <Badge variant="default" className="bg-green-500">Activo</Badge>
                      ) : (
                        <Badge variant="secondary">Inactivo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteCategory(category)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Diálogo de Edición */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Categoría</DialogTitle>
              <DialogDescription>
                Modifica los detalles de la categoría seleccionada
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de la categoría" {...field} />
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
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="slug-de-la-categoria" {...field} />
                      </FormControl>
                      <FormDescription>
                        Identificador único para URLs
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descripción breve de la categoría" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <div className="flex items-center gap-4">
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="edit-active"
                              value="active"
                              checked={field.value === 'active'}
                              onChange={() => field.onChange('active')}
                              className="h-4 w-4"
                            />
                            <Label htmlFor="edit-active">Activo</Label>
                          </div>
                        </FormControl>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="edit-inactive"
                              value="inactive"
                              checked={field.value === 'inactive'}
                              onChange={() => field.onChange('inactive')}
                              className="h-4 w-4"
                            />
                            <Label htmlFor="edit-inactive">Inactivo</Label>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-4">
                  <Button type="submit">Guardar Cambios</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Diálogo de Confirmación de Eliminación */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará la categoría "{selectedCategory?.name}" y no puede deshacerse.
                Los cursos asociados a esta categoría no se eliminarán, pero perderán esta categorización.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => {
                  console.log('Deleting category:', selectedCategory?.id);
                  setIsDeleteDialogOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminPageLayout>
  );
};

export default CategoryManagement;
