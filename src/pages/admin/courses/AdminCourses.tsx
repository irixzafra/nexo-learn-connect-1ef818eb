
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  Book,
  Search,
  Plus,
  ArrowLeft,
  Users,
  Pencil,
  Eye,
  BarChart,
  UserPlus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionPageLayout from "@/layouts/SectionPageLayout";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import ManualEnrollmentDialog from "@/components/admin/ManualEnrollmentDialog";

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-courses");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{id: string, title: string} | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*, instructors:instructor_id(full_name)')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los cursos.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnrollUsers = (courseId: string, courseTitle: string) => {
    setSelectedCourse({ id: courseId, title: courseTitle });
    setEnrollmentDialogOpen(true);
  };

  const filteredCourses = searchTerm.trim() === "" 
    ? courses 
    : courses.filter(course => 
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  const publishedCourses = filteredCourses.filter(course => course.status === 'published');
  const draftCourses = filteredCourses.filter(course => course.status === 'draft');

  const handleEnrollmentComplete = () => {
    toast({
      title: "Matrícula completada",
      description: "El usuario ha sido matriculado exitosamente en el curso.",
    });
    // Opcionalmente, actualizar algún conteo o estado
  };

  return (
    <SectionPageLayout
      header={{
        title: "Gestión de Cursos",
        description: "Administra los cursos de la plataforma",
        actions: [
          {
            label: "Crear Curso",
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate("/instructor/create-course"),
          }
        ],
        breadcrumbs: [
          { title: "Dashboard", href: "/admin/dashboard" },
          { title: "Gestión de Cursos" }
        ]
      }}
    >
      <div className="flex mb-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/admin/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Link>
        </Button>
      </div>

      <Tabs 
        defaultValue="all-courses" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="all-courses" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden md:inline">Todos los Cursos</span>
          </TabsTrigger>
          <TabsTrigger value="published" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden md:inline">Publicados</span>
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            <span className="hidden md:inline">Borradores</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden md:inline">Analíticas</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Contenido de las pestañas */}
        <TabsContent value="all-courses" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Lista de Cursos</CardTitle>
                  <CardDescription>
                    Gestiona todos los cursos de la plataforma
                  </CardDescription>
                </div>
                <div className="relative mt-4 md:mt-0 w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar cursos..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Título</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">
                              <Link to={`/admin/courses/${course.id}`} className="hover:underline">
                                {course.title}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {course.instructors?.full_name || 'Sin instructor'}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={
                                  course.status === 'published' 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-amber-100 text-amber-800"
                                }
                              >
                                {course.status === 'published' ? 'Publicado' : 'Borrador'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <span className="sr-only">Abrir menú</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                      <circle cx="12" cy="12" r="1" />
                                      <circle cx="12" cy="5" r="1" />
                                      <circle cx="12" cy="19" r="1" />
                                    </svg>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => navigate(`/admin/courses/${course.id}`)}
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>Ver detalles</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => navigate(`/instructor/course/${course.id}/edit`)}
                                  >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>Editar curso</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleEnrollUsers(course.id, course.title)}
                                  >
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    <span>Matricular usuarios</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center h-24">
                            {searchTerm.trim() !== "" 
                              ? "No se encontraron cursos que coincidan con la búsqueda." 
                              : "No hay cursos para mostrar."}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="published" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cursos Publicados</CardTitle>
              <CardDescription>
                Cursos actualmente disponibles en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Título</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Estudiantes</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {publishedCourses.length > 0 ? (
                        publishedCourses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">
                              <Link to={`/admin/courses/${course.id}`} className="hover:underline">
                                {course.title}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {course.instructors?.full_name || 'Sin instructor'}
                            </TableCell>
                            <TableCell>
                              {course.students_count || 0}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEnrollUsers(course.id, course.title)}
                              >
                                <UserPlus className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">Matricular</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center h-24">
                            No hay cursos publicados para mostrar.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drafts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Borradores de Cursos</CardTitle>
              <CardDescription>
                Cursos en desarrollo que aún no han sido publicados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Título</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Última modificación</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {draftCourses.length > 0 ? (
                        draftCourses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">
                              <Link to={`/admin/courses/${course.id}`} className="hover:underline">
                                {course.title}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {course.instructors?.full_name || 'Sin instructor'}
                            </TableCell>
                            <TableCell>
                              {new Date(course.updated_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => navigate(`/instructor/course/${course.id}/edit`)}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">Editar</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center h-24">
                            No hay borradores de cursos para mostrar.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analíticas de Cursos</CardTitle>
              <CardDescription>
                Estadísticas sobre el desempeño de los cursos en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="h-72 flex items-center justify-center">
              <div className="text-muted-foreground text-center">
                <BarChart className="h-10 w-10 mx-auto mb-4" />
                <p>Analíticas de cursos en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo para matricular usuarios manualmente */}
      {selectedCourse && (
        <ManualEnrollmentDialog
          open={enrollmentDialogOpen}
          onOpenChange={setEnrollmentDialogOpen}
          courseId={selectedCourse.id}
          courseName={selectedCourse.title}
          onEnrollmentComplete={handleEnrollmentComplete}
        />
      )}
    </SectionPageLayout>
  );
};

export default AdminCourses;
