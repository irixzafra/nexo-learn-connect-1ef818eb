
import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  BookOpen,
  ArrowUp,
  ArrowDown,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLearningPaths, LearningPath } from '@/features/admin/hooks/useLearningPaths';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminTableHead } from '@/components/layout/admin/AdminPageLayout';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Course } from '@/types/courses';

// Path Form
const LearningPathForm: React.FC<{
  path?: LearningPath;
  onSubmit: (data: Omit<LearningPath, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}> = ({ path, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: path?.title || '',
    description: path?.description || ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título de la ruta de aprendizaje"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción de la ruta de aprendizaje"
          rows={4}
        />
      </div>
      
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        </DialogClose>
        <Button type="submit">{path ? 'Actualizar' : 'Crear'}</Button>
      </DialogFooter>
    </form>
  );
};

// Path Courses Manager
const PathCoursesManager: React.FC<{
  pathId: string;
  onClose: () => void;
}> = ({ pathId, onClose }) => {
  const {
    getLearningPathWithCourses,
    courses,
    addCourseToLearningPath,
    removeCourseFromLearningPath,
    updateCoursesOrder
  } = useLearningPaths();
  
  const [path, setPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchPath = async () => {
      try {
        const fetchedPath = await getLearningPathWithCourses(pathId);
        setPath(fetchedPath);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching learning path:", error);
        setIsLoading(false);
      }
    };
    
    fetchPath();
  }, [pathId, getLearningPathWithCourses]);
  
  const availableCourses = courses?.filter(course => {
    return !path?.courses?.some(c => c.id === course.id) &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const handleAddCourse = () => {
    if (selectedCourseId && pathId) {
      const nextOrder = path?.courses?.length || 0;
      addCourseToLearningPath.mutate({
        learningPathId: pathId,
        courseId: selectedCourseId,
        order: nextOrder
      });
      
      // Optimistically update the local state
      const courseToAdd = courses?.find(c => c.id === selectedCourseId);
      if (courseToAdd && path) {
        setPath({
          ...path,
          courses: [...(path.courses || []), { ...courseToAdd, order: nextOrder }]
        });
      }
      
      setSelectedCourseId('');
    }
  };
  
  const handleRemoveCourse = (courseId: string) => {
    if (pathId) {
      removeCourseFromLearningPath.mutate({
        learningPathId: pathId,
        courseId
      });
      
      // Optimistically update the local state
      if (path) {
        setPath({
          ...path,
          courses: path.courses?.filter(c => c.id !== courseId) || []
        });
      }
    }
  };
  
  const handleMoveUp = (index: number) => {
    if (index > 0 && path?.courses) {
      const newCourses = [...path.courses];
      [newCourses[index - 1], newCourses[index]] = [newCourses[index], newCourses[index - 1]];
      
      // Update order values
      const orderedCourses = newCourses.map((course, idx) => ({
        course_id: course.id,
        order: idx
      }));
      
      updateCoursesOrder.mutate({
        learningPathId: pathId,
        orderedCourses
      });
      
      // Optimistically update local state
      setPath({
        ...path,
        courses: newCourses
      });
    }
  };
  
  const handleMoveDown = (index: number) => {
    if (path?.courses && index < path.courses.length - 1) {
      const newCourses = [...path.courses];
      [newCourses[index], newCourses[index + 1]] = [newCourses[index + 1], newCourses[index]];
      
      // Update order values
      const orderedCourses = newCourses.map((course, idx) => ({
        course_id: course.id,
        order: idx
      }));
      
      updateCoursesOrder.mutate({
        learningPathId: pathId,
        orderedCourses
      });
      
      // Optimistically update local state
      setPath({
        ...path,
        courses: newCourses
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Gestionar Cursos</h3>
          <p className="text-sm text-muted-foreground">
            {path?.title && `Ruta: ${path.title}`}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Add new course section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Añadir curso a la ruta</h4>
        <div className="flex items-start gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-2"
            />
            <Select 
              value={selectedCourseId} 
              onValueChange={setSelectedCourseId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar curso" />
              </SelectTrigger>
              <SelectContent>
                {availableCourses?.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleAddCourse} 
            disabled={!selectedCourseId}
            className="mt-10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Añadir
          </Button>
        </div>
      </div>
      
      {/* Courses list */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Orden</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(3).fill(null).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={3}>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : path?.courses && path.courses.length > 0 ? (
              path.courses.map((course, index) => (
                <TableRow key={course.id}>
                  <TableCell className="w-20 text-center font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{course.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="h-8 w-8 p-0"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === (path.courses?.length || 0) - 1}
                        className="h-8 w-8 p-0"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveCourse(course.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No hay cursos en esta ruta. Añada cursos usando el selector de arriba.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const LearningPathsTab: React.FC = () => {
  const {
    filteredLearningPaths,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    createLearningPath,
    updateLearningPath,
    deleteLearningPath,
    getLearningPathWithCourses
  } = useLearningPaths();
  
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isManageCoursesDialogOpen, setIsManageCoursesDialogOpen] = useState(false);
  
  const handleEdit = (path: LearningPath) => {
    setSelectedPath(path);
    setIsEditDialogOpen(true);
  };
  
  const handleDelete = (path: LearningPath) => {
    setSelectedPath(path);
    setIsDeleteDialogOpen(true);
  };
  
  const handleManageCourses = (path: LearningPath) => {
    setSelectedPath(path);
    setIsManageCoursesDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedPath) {
      deleteLearningPath.mutate(selectedPath.id);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const handleCreateSubmit = (data: Omit<LearningPath, 'id' | 'created_at'>) => {
    createLearningPath.mutate(data);
  };
  
  const handleUpdateSubmit = (data: Omit<LearningPath, 'id' | 'created_at'>) => {
    if (selectedPath) {
      updateLearningPath.mutate({ id: selectedPath.id, ...data });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center w-full sm:w-auto max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar rutas de aprendizaje..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Ruta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Ruta de Aprendizaje</DialogTitle>
              <DialogDescription>
                Crea una nueva ruta de aprendizaje para guiar a tus estudiantes.
              </DialogDescription>
            </DialogHeader>
            <LearningPathForm 
              onSubmit={handleCreateSubmit} 
              onCancel={() => {}} 
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {error && (
        <div className="bg-destructive/10 border border-destructive rounded-md p-4">
          <p className="text-destructive font-medium">Error: {error.message}</p>
        </div>
      )}
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <AdminTableHead>Título</AdminTableHead>
              <AdminTableHead>Descripción</AdminTableHead>
              <AdminTableHead>Cursos</AdminTableHead>
              <AdminTableHead>Fecha Creación</AdminTableHead>
              <AdminTableHead className="text-right">Acciones</AdminTableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(null).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredLearningPaths && filteredLearningPaths.length > 0 ? (
              filteredLearningPaths.map((path) => (
                <TableRow key={path.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-muted-foreground" />
                      {path.title}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {path.description || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {path.courses?.length || 0} cursos
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(path.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleManageCourses(path)}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Gestionar Cursos
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(path)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(path)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {searchTerm ? "No se encontraron resultados para la búsqueda." : "No hay rutas de aprendizaje. Crea una nueva."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Ruta de Aprendizaje</DialogTitle>
            <DialogDescription>
              Actualiza los detalles de la ruta de aprendizaje.
            </DialogDescription>
          </DialogHeader>
          {selectedPath && (
            <LearningPathForm 
              path={selectedPath} 
              onSubmit={handleUpdateSubmit} 
              onCancel={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Manage Courses Dialog */}
      <Dialog 
        open={isManageCoursesDialogOpen} 
        onOpenChange={setIsManageCoursesDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          {selectedPath && (
            <PathCoursesManager 
              pathId={selectedPath.id} 
              onClose={() => setIsManageCoursesDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la ruta de aprendizaje
              "{selectedPath?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LearningPathsTab;
