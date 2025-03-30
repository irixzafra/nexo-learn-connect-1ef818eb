
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash, Clock, BookOpen, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCourses } from '@/hooks/useCourses';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLearningPaths } from '@/features/admin/hooks/useLearningPaths';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

export function LearningPathsTab() {
  const { toast } = useToast();
  const {
    learningPaths,
    filteredLearningPaths,
    courses,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    createLearningPath,
    updateLearningPath,
    deleteLearningPath,
    addCourseToPath,
    removeCourseFromPath,
    reorderPathCourse,
    isCreatingPath,
    isUpdatingPath,
    isDeletingPath,
  } = useLearningPaths();

  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [pathValues, setPathValues] = useState({
    title: '',
    description: '',
    estimatedHours: 0,
    isPublished: false
  });
  
  const [activeTab, setActiveTab] = useState('paths');
  const [selectedPath, setSelectedPath] = useState<any>(null);
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isRequired, setIsRequired] = useState(true);
  
  // Handler for creating a new learning path
  const handleCreatePath = async () => {
    if (!pathValues.title) {
      toast({
        variant: "destructive",
        title: "Título requerido",
        description: "Por favor, introduce un título para la ruta de aprendizaje."
      });
      return;
    }
    
    try {
      await createLearningPath({
        title: pathValues.title,
        description: pathValues.description,
        estimated_hours: pathValues.estimatedHours,
        is_published: pathValues.isPublished
      });
      
      setIsNewDialogOpen(false);
      setPathValues({
        title: '',
        description: '',
        estimatedHours: 0,
        isPublished: false
      });
      
      toast({
        title: "Ruta creada",
        description: "La ruta de aprendizaje ha sido creada con éxito."
      });
    } catch (error) {
      console.error("Error creating learning path:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear la ruta de aprendizaje."
      });
    }
  };
  
  // Handler for updating a learning path
  const handleUpdatePath = async () => {
    if (!selectedPathId || !pathValues.title) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor, comprueba que todos los campos requeridos estén completos."
      });
      return;
    }
    
    try {
      await updateLearningPath({
        id: selectedPathId,
        title: pathValues.title,
        description: pathValues.description,
        estimated_hours: pathValues.estimatedHours,
        is_published: pathValues.isPublished
      });
      
      setIsEditDialogOpen(false);
      
      toast({
        title: "Ruta actualizada",
        description: "La ruta de aprendizaje ha sido actualizada con éxito."
      });
    } catch (error) {
      console.error("Error updating learning path:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar la ruta de aprendizaje."
      });
    }
  };
  
  // Handler for deleting a learning path
  const handleDeletePath = async (id: string) => {
    if (!id) return;
    
    try {
      await deleteLearningPath(id);
      
      toast({
        title: "Ruta eliminada",
        description: "La ruta de aprendizaje ha sido eliminada con éxito."
      });
    } catch (error) {
      console.error("Error deleting learning path:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar la ruta de aprendizaje."
      });
    }
  };
  
  // Helper to format time
  const formatHours = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`;
    }
    return `${hours} h`;
  };
  
  // Handler for editing a path
  const handleEditPath = (path: any) => {
    setSelectedPathId(path.id);
    setPathValues({
      title: path.title,
      description: path.description,
      estimatedHours: path.estimated_hours,
      isPublished: path.is_published
    });
    setIsEditDialogOpen(true);
  };
  
  // Handler for viewing a path's details
  const handleViewPathDetails = (path: any) => {
    setSelectedPath(path);
    setActiveTab('details');
  };
  
  // Handler for adding a course to a path
  const handleAddCoursePath = async () => {
    if (!selectedPath || !selectedCourseId) {
      toast({
        variant: "destructive",
        title: "Selección requerida",
        description: "Por favor, selecciona un curso para añadir a la ruta."
      });
      return;
    }
    
    try {
      await addCourseToPath({
        pathId: selectedPath.id,
        courseId: selectedCourseId,
        isRequired
      });
      
      setIsAddCourseDialogOpen(false);
      setSelectedCourseId(null);
      
      toast({
        title: "Curso añadido",
        description: "El curso ha sido añadido a la ruta con éxito."
      });
    } catch (error) {
      console.error("Error adding course to path:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo añadir el curso a la ruta."
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="paths" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="paths">Rutas de Aprendizaje</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedPath}>
            Detalles de Ruta
          </TabsTrigger>
        </TabsList>
        
        {/* Learning Paths List Tab */}
        <TabsContent value="paths" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Rutas de Aprendizaje</CardTitle>
                  <CardDescription>
                    Gestiona las rutas de aprendizaje que guían a los estudiantes a través de múltiples cursos
                  </CardDescription>
                </div>
                <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Nueva Ruta
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear Nueva Ruta de Aprendizaje</DialogTitle>
                      <DialogDescription>
                        Añade una nueva ruta de aprendizaje a la plataforma
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={pathValues.title}
                          onChange={(e) => setPathValues({ ...pathValues, title: e.target.value })}
                          placeholder="Introducción a la Programación"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          value={pathValues.description}
                          onChange={(e) => setPathValues({ ...pathValues, description: e.target.value })}
                          placeholder="Describe brevemente esta ruta de aprendizaje..."
                          rows={3}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="estimatedHours">Duración Estimada (horas)</Label>
                        <Input
                          id="estimatedHours"
                          type="number"
                          min="0"
                          step="0.5"
                          value={pathValues.estimatedHours}
                          onChange={(e) => setPathValues({ ...pathValues, estimatedHours: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isPublished"
                          checked={pathValues.isPublished}
                          onCheckedChange={(checked) => setPathValues({ ...pathValues, isPublished: checked })}
                        />
                        <Label htmlFor="isPublished">Publicar inmediatamente</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreatePath} disabled={isCreatingPath}>
                        {isCreatingPath ? 'Creando...' : 'Crear Ruta'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar rutas de aprendizaje..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="bg-destructive/10 border border-destructive rounded-md p-4">
                  <p className="text-destructive">Error: No se pudieron cargar las rutas de aprendizaje.</p>
                </div>
              ) : filteredLearningPaths.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No se encontraron rutas de aprendizaje.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLearningPaths.map((path) => (
                    <Card key={path.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="font-bold">{path.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {path.description}
                              </p>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewPathDetails(path)}>
                                  Ver detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditPath(path)}>
                                  Editar ruta
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => handleDeletePath(path.id)}
                                >
                                  Eliminar ruta
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{formatHours(path.estimated_hours)}</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <BookOpen className="mr-1 h-3 w-3" />
                              <span>{path.courses?.length || 0} cursos</span>
                            </div>
                            <Badge variant={path.is_published ? "default" : "outline"}>
                              {path.is_published ? "Publicado" : "Borrador"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Learning Path Details Tab */}
        <TabsContent value="details" className="space-y-4">
          {selectedPath ? (
            <>
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setActiveTab('paths');
                    setSelectedPath(null);
                  }}
                >
                  Volver a la lista
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleEditPath(selectedPath)}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Editar Ruta
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedPath.title}</CardTitle>
                      <CardDescription>
                        {selectedPath.description}
                      </CardDescription>
                    </div>
                    <Badge variant={selectedPath.is_published ? "default" : "outline"}>
                      {selectedPath.is_published ? "Publicado" : "Borrador"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Duración Estimada</p>
                        <p className="text-2xl font-bold">{formatHours(selectedPath.estimated_hours)}</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Cursos</p>
                        <p className="text-2xl font-bold">{selectedPath.courses?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Cursos en esta ruta</h3>
                      <Dialog open={isAddCourseDialogOpen} onOpenChange={setIsAddCourseDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex items-center gap-1">
                            <Plus className="h-4 w-4" />
                            Añadir Curso
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Añadir Curso a la Ruta</DialogTitle>
                            <DialogDescription>
                              Selecciona un curso para añadir a la ruta de aprendizaje
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label>Curso</Label>
                              <select
                                value={selectedCourseId || ''}
                                onChange={(e) => setSelectedCourseId(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              >
                                <option value="">Selecciona un curso</option>
                                {courses
                                  .filter(course => !selectedPath.courses?.some((pc: any) => pc.course_id === course.id))
                                  .map(course => (
                                    <option key={course.id} value={course.id}>
                                      {course.title}
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="isRequired"
                                checked={isRequired}
                                onCheckedChange={setIsRequired}
                              />
                              <Label htmlFor="isRequired">Curso requerido</Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddCourseDialogOpen(false)}>
                              Cancelar
                            </Button>
                            <Button onClick={handleAddCoursePath}>
                              Añadir Curso
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    {selectedPath.courses?.length === 0 ? (
                      <div className="border rounded-md p-6 text-center">
                        <p className="text-muted-foreground">
                          Esta ruta de aprendizaje no tiene cursos todavía.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setIsAddCourseDialogOpen(true)}
                        >
                          Añadir el primer curso
                        </Button>
                      </div>
                    ) : (
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">#</TableHead>
                              <TableHead>Curso</TableHead>
                              <TableHead>Estado</TableHead>
                              <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedPath.courses?.map((pathCourse: any, index: number) => (
                              <TableRow key={pathCourse.id}>
                                <TableCell>
                                  <div className="flex items-center">
                                    <GripVertical className="h-4 w-4 text-muted-foreground mr-2" />
                                    {index + 1}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 rounded-md">
                                      <AvatarImage 
                                        src={pathCourse.course.thumbnail_url} 
                                        alt={pathCourse.course.title} 
                                      />
                                      <AvatarFallback className="rounded-md bg-muted">
                                        {pathCourse.course.title.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{pathCourse.course.title}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {pathCourse.isRequired ? 'Requerido' : 'Opcional'}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={pathCourse.course.is_published ? "default" : "outline"}>
                                    {pathCourse.course.is_published ? "Publicado" : "Borrador"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive"
                                    onClick={() => removeCourseFromPath(selectedPath.id, pathCourse.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Selecciona una ruta para ver sus detalles.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Edit Learning Path Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Ruta de Aprendizaje</DialogTitle>
            <DialogDescription>
              Actualiza los detalles de la ruta de aprendizaje
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Título</Label>
              <Input
                id="edit-title"
                value={pathValues.title}
                onChange={(e) => setPathValues({ ...pathValues, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                value={pathValues.description}
                onChange={(e) => setPathValues({ ...pathValues, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-estimatedHours">Duración Estimada (horas)</Label>
              <Input
                id="edit-estimatedHours"
                type="number"
                min="0"
                step="0.5"
                value={pathValues.estimatedHours}
                onChange={(e) => setPathValues({ ...pathValues, estimatedHours: parseFloat(e.target.value) })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isPublished"
                checked={pathValues.isPublished}
                onCheckedChange={(checked) => setPathValues({ ...pathValues, isPublished: checked })}
              />
              <Label htmlFor="edit-isPublished">Publicado</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdatePath} disabled={isUpdatingPath}>
              {isUpdatingPath ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
