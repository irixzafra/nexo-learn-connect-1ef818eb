
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLearningPaths } from '@/features/admin/hooks/useLearningPaths';
import { Course } from '@/types/courses';
import { Trash2, Plus, ArrowUpDown, GripVertical, AlertCircle, PenLine, FileText, ListChecks, ListFilter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/features/admin/utils/formatters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LearningPathForm {
  title: string;
  description: string;
  estimated_hours?: number;
}

const LearningPathsTab: React.FC = () => {
  const { 
    learningPaths, 
    courses, 
    isLoading, 
    error, 
    createLearningPath, 
    deleteLearningPath,
    addCourseToLearningPath,
    removeCourseFromLearningPath,
    updateCoursesOrder
  } = useLearningPaths();

  const [newPathForm, setNewPathForm] = useState<LearningPathForm>({
    title: '',
    description: '',
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);

  const filteredPaths = learningPaths?.filter(path => 
    path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (path.description && path.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedPath = selectedPathId 
    ? learningPaths?.find(path => path.id === selectedPathId) 
    : null;

  const handleCreatePath = () => {
    if (!newPathForm.title.trim()) return;
    
    createLearningPath.mutate({
      title: newPathForm.title,
      description: newPathForm.description,
      estimated_hours: newPathForm.estimated_hours
    }, {
      onSuccess: () => {
        setNewPathForm({ title: '', description: '' });
        setIsCreateDialogOpen(false);
      }
    });
  };

  const handleAddCourse = (courseId: string) => {
    if (!selectedPathId) return;
    
    const courseOrder = selectedPath?.courses?.length || 0;
    
    addCourseToLearningPath.mutate({
      learningPathId: selectedPathId,
      courseId,
      order: courseOrder
    });
  };

  const handleRemoveCourse = (courseId: string) => {
    if (!selectedPathId) return;
    
    removeCourseFromLearningPath.mutate({
      learningPathId: selectedPathId,
      courseId
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const availableCourses = courses?.filter(course => {
    // Don't show courses that are already in the path
    const isAlreadyInPath = selectedPath?.courses?.some(pc => pc.id === course.id);
    return !isAlreadyInPath;
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Error al cargar las rutas de aprendizaje</h3>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar rutas de aprendizaje..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Ruta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Ruta de Aprendizaje</DialogTitle>
              <DialogDescription>
                Crea una nueva ruta de aprendizaje para organizar cursos relacionados.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  value={newPathForm.title}
                  onChange={(e) => setNewPathForm({...newPathForm, title: e.target.value})}
                  placeholder="Ej: Desarrollo Web Completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea 
                  id="description" 
                  value={newPathForm.description}
                  onChange={(e) => setNewPathForm({...newPathForm, description: e.target.value})}
                  placeholder="Ej: Aprende todas las tecnologías necesarias para ser un desarrollador web completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimated_hours">Horas estimadas (opcional)</Label>
                <Input 
                  id="estimated_hours" 
                  type="number"
                  value={newPathForm.estimated_hours || ''}
                  onChange={(e) => setNewPathForm({
                    ...newPathForm, 
                    estimated_hours: e.target.value ? parseInt(e.target.value) : undefined
                  })}
                  placeholder="Ej: 120"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleCreatePath}
                disabled={!newPathForm.title.trim() || createLearningPath.isPending}
              >
                {createLearningPath.isPending ? 'Creando...' : 'Crear Ruta'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Learning Paths List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rutas de Aprendizaje</CardTitle>
              <CardDescription>Selecciona una ruta para gestionar sus cursos</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-5 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                      <Separator className="my-3" />
                    </div>
                  ))}
                </div>
              ) : (
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {filteredPaths?.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No hay rutas de aprendizaje</p>
                        <p className="text-xs text-muted-foreground mt-1">Crea una nueva ruta para empezar</p>
                      </div>
                    )}
                    {filteredPaths?.map(path => (
                      <div key={path.id} className="space-y-2">
                        <div 
                          className={cn(
                            "p-3 rounded-md cursor-pointer transition-colors",
                            selectedPathId === path.id ? "bg-primary/10" : "hover:bg-muted"
                          )}
                          onClick={() => setSelectedPathId(path.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-sm">{path.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {path.description || 'Sin descripción'}
                              </p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {path.courses?.length || 0} cursos
                                </Badge>
                                {path.estimated_hours && (
                                  <Badge variant="outline" className="text-xs">
                                    {path.estimated_hours} horas
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button 
                              size="icon"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('¿Estás seguro de que deseas eliminar esta ruta de aprendizaje?')) {
                                  deleteLearningPath.mutate(path.id);
                                  if (selectedPathId === path.id) {
                                    setSelectedPathId(null);
                                  }
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Columns - Path Details + Course Management */}
        <div className="md:col-span-2 space-y-6">
          {selectedPath ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedPath.title}</CardTitle>
                      <CardDescription>{selectedPath.description}</CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                      <PenLine className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-muted px-3 py-1 rounded-md text-sm">
                      <span className="text-muted-foreground mr-1">Creada:</span>
                      {formatDate(selectedPath.created_at)}
                    </div>
                    <div className="bg-muted px-3 py-1 rounded-md text-sm">
                      <span className="text-muted-foreground mr-1">Cursos:</span>
                      {selectedPath.courses?.length || 0}
                    </div>
                    {selectedPath.estimated_hours && (
                      <div className="bg-muted px-3 py-1 rounded-md text-sm">
                        <span className="text-muted-foreground mr-1">Horas estimadas:</span>
                        {selectedPath.estimated_hours}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="courses">
                <TabsList>
                  <TabsTrigger value="courses">Cursos en la Ruta</TabsTrigger>
                  <TabsTrigger value="add">Añadir Cursos</TabsTrigger>
                </TabsList>
                <TabsContent value="courses" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cursos en esta Ruta</CardTitle>
                      <CardDescription>Arrastra para reordenar los cursos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {selectedPath.courses?.length === 0 ? (
                        <div className="text-center py-8">
                          <ListChecks className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">No hay cursos en esta ruta</p>
                          <p className="text-xs text-muted-foreground mt-1">Añade cursos desde la pestaña "Añadir Cursos"</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedPath.courses?.map((course, index) => (
                            <div 
                              key={course.id} 
                              className="flex items-center justify-between p-3 border rounded-md"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                                </div>
                                <div>
                                  <p className="font-medium">{course.title}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {course.description || 'Sin descripción'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button 
                                  size="icon" 
                                  variant="ghost"
                                  onClick={() => handleRemoveCourse(course.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="add">
                  <Card>
                    <CardHeader>
                      <CardTitle>Añadir Cursos a la Ruta</CardTitle>
                      <CardDescription>Selecciona los cursos que deseas añadir</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex mb-4">
                        <Input 
                          placeholder="Buscar cursos..." 
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        {availableCourses?.length === 0 ? (
                          <div className="text-center py-8">
                            <ListFilter className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">No hay cursos disponibles</p>
                            <p className="text-xs text-muted-foreground mt-1">Todos los cursos ya están añadidos a esta ruta</p>
                          </div>
                        ) : (
                          availableCourses?.map(course => (
                            <div 
                              key={course.id} 
                              className="flex items-center justify-between p-3 border rounded-md"
                            >
                              <div>
                                <p className="font-medium">{course.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {course.description || 'Sin descripción'}
                                </p>
                              </div>
                              <Button 
                                size="sm"
                                onClick={() => handleAddCourse(course.id)}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Añadir
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card>
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-1">Selecciona una Ruta de Aprendizaje</h3>
                <p className="text-muted-foreground">
                  Elige una ruta de la lista o crea una nueva para gestionar sus cursos.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPathsTab;
