
import React, { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { 
  List, 
  FolderTree, 
  Network, 
  Award, 
  BarChart3, 
  Plus,
  BookOpen,
  Calendar,
  Users,
  Clock,
  Edit,
  Trash,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminPageLayout from "@/layouts/AdminPageLayout";
import { AdminTabItem } from "@/components/shared/AdminNavTabs";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";
import { AdvancedDataTable } from "@/components/shared/AdvancedDataTable";
import { createColumn, createActionsColumn } from '@/components/shared/DataTableUtils';
import { Badge } from "@/components/ui/badge";
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
import { Card } from "@/components/ui/card";
import { EntityDrawer } from "@/components/shared/EntityDrawer";

interface Course {
  id: string;
  title: string;
  description?: string;
  price: number;
  instructor_id: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  student_count?: number;
  level?: string;
  cover_image_url?: string;
  slug?: string;
}

const CategoriesTab: React.FC = () => (
  <Card className="p-6">
    <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
      <FolderTree className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
      <p className="text-muted-foreground">
        La gestión de categorías estará disponible próximamente.
      </p>
    </div>
  </Card>
);

const LearningPathsTab: React.FC = () => (
  <Card className="p-6">
    <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
      <Network className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
      <p className="text-muted-foreground">
        La gestión de rutas de aprendizaje estará disponible próximamente.
      </p>
    </div>
  </Card>
);

const CertificatesTab: React.FC = () => (
  <Card className="p-6">
    <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
      <Award className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
      <p className="text-muted-foreground">
        La gestión de certificados estará disponible próximamente.
      </p>
    </div>
  </Card>
);

const AnalyticsTab: React.FC = () => (
  <Card className="p-6">
    <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
      <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
      <p className="text-muted-foreground">
        Las analíticas de cursos estarán disponibles próximamente.
      </p>
    </div>
  </Card>
);

const AllCoursesTab: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCourses(data as Course[]);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Error al cargar los cursos");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;
    
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseToDelete.id);
        
      if (error) throw error;
      
      setCourses(courses.filter(c => c.id !== courseToDelete.id));
      toast.success('Curso eliminado correctamente');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Error al eliminar el curso');
    } finally {
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setEditorOpen(true);
  };

  const handleSaveCourse = async (course: Course) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({
          title: course.title,
          description: course.description,
          price: course.price,
          is_published: course.is_published,
          level: course.level
        })
        .eq('id', course.id);

      if (error) throw error;

      // Update the courses list
      setCourses(prevCourses => 
        prevCourses.map(c => c.id === course.id ? course : c)
      );
      
      toast.success('Curso actualizado correctamente');
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error('Error al actualizar el curso');
      return Promise.reject(error);
    }
  };

  const handleViewCourse = (course: Course) => {
    window.open(`/courses/${course.slug || course.id}`, '_blank');
  };

  // This function is typed properly as a component
  const CourseForm: React.FC<{ data: Course | null; onChange: (data: Course) => void }> = ({ data, onChange }) => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título del curso</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={data?.title || ""}
            onChange={(e) => onChange({ ...data, title: e.target.value } as Course)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={data?.description || ""}
            onChange={(e) => onChange({ ...data, description: e.target.value } as Course)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Precio</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={data?.price || 0}
            onChange={(e) => onChange({ ...data, price: parseFloat(e.target.value) } as Course)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Nivel</label>
          <select
            className="w-full p-2 border rounded-md"
            value={data?.level || ""}
            onChange={(e) => onChange({ ...data, level: e.target.value } as Course)}
          >
            <option value="">Seleccione un nivel</option>
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="is_published"
            checked={data?.is_published || false}
            onChange={(e) => onChange({ ...data, is_published: e.target.checked } as Course)}
            className="rounded"
          />
          <label htmlFor="is_published" className="text-sm font-medium">Publicado</label>
        </div>
      </div>
    );
  };

  const columns = [
    createColumn<Course>({
      accessorKey: 'title',
      header: 'Título',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="font-medium">{row.getValue('title')}</span>
        </div>
      )
    }),
    createColumn<Course>({
      accessorKey: 'is_published',
      header: 'Estado',
      cell: ({ getValue }) => (
        getValue() ? 
          <Badge className="bg-green-500">Publicado</Badge> : 
          <Badge variant="outline">Borrador</Badge>
      )
    }),
    createColumn<Course>({
      accessorKey: 'price',
      header: 'Precio',
      cell: ({ getValue }) => `€${(getValue() as number).toFixed(2)}`
    }),
    createColumn<Course>({
      accessorKey: 'student_count',
      header: 'Estudiantes',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{getValue() || 0}</span>
        </div>
      )
    }),
    createColumn<Course>({
      accessorKey: 'created_at',
      header: 'Creado',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(getValue() as string), 'dd/MM/yyyy')}</span>
        </div>
      )
    }),
    createActionsColumn<Course>(({ row }) => {
      const course = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleEditCourse(course);
            }}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleViewCourse(course);
            }}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">Ver</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(course);
            }}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Eliminar</span>
          </Button>
        </div>
      );
    })
  ];

  // Define emptyState as proper ReactNode
  const emptyStateComponent: ReactNode = (
    <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
      <BookOpen className="h-8 w-8 mb-2" />
      <p className="mb-2">No hay cursos disponibles</p>
      <Button 
        variant="link" 
        onClick={() => navigate('/instructor/create-course')}
      >
        Crear primer curso
      </Button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/instructor/create-course")} className="gap-2">
          <Plus className="h-4 w-4" />
          Crear Curso
        </Button>
      </div>
      
      <Card className="p-4">
        <AdvancedDataTable
          columns={columns}
          data={courses}
          searchPlaceholder="Buscar por título, estado o nivel..."
          exportFilename="cursos"
          emptyState={emptyStateComponent}
          onRowClick={(course) => handleEditCourse(course as Course)}
        />
      </Card>

      {/* Pass the CourseForm component with the required props */}
      <EntityDrawer<Course>
        title="Editar Curso"
        description="Modifica los detalles del curso"
        isOpen={editorOpen}
        onOpenChange={setEditorOpen}
        onSave={handleSaveCourse}
        entity={selectedCourse}
      >
        {(props) => <CourseForm {...props} />}
      </EntityDrawer>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar curso?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El curso 
              <span className="font-semibold mx-1">
                {courseToDelete?.title}
              </span> 
              será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const AdminCourses: React.FC = () => {
  const tabs: AdminTabItem[] = [
    {
      value: 'list',
      label: 'Listado de cursos',
      icon: <List className="h-4 w-4" />,
      content: <AllCoursesTab />
    },
    {
      value: 'categories',
      label: 'Categorías',
      icon: <FolderTree className="h-4 w-4" />,
      content: <CategoriesTab />
    },
    {
      value: 'learning-paths',
      label: 'Rutas de Aprendizaje',
      icon: <Network className="h-4 w-4" />,
      content: <LearningPathsTab />
    },
    {
      value: 'certificates',
      label: 'Certificados',
      icon: <Award className="h-4 w-4" />,
      content: <CertificatesTab />
    },
    {
      value: 'analytics',
      label: 'Analíticas',
      icon: <BarChart3 className="h-4 w-4" />,
      content: <AnalyticsTab />
    }
  ];

  return (
    <AdminPageLayout
      title="Gestión de Cursos"
      subtitle="Administra cursos, categorías, rutas de aprendizaje y certificados"
      tabs={tabs}
      defaultTabValue="list"
    />
  );
};

export default AdminCourses;
