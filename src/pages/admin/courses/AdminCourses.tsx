import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  List, 
  FolderTree, 
  Network, 
  Award, 
  BarChart3, 
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminPageLayout from "@/layouts/AdminPageLayout";
import { AdminTabItem } from "@/components/admin/AdminTabs";
import AllCoursesTab from "@/features/admin/components/courses/AllCoursesTab";
import { useAdminCourses } from "@/features/admin/hooks/useAdminCourses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Create placeholder components for the new tabs
const CategoriesTab: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Gestión de Categorías</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
        <FolderTree className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
        <p className="text-muted-foreground">
          La gestión de categorías estará disponible próximamente.
        </p>
      </div>
    </CardContent>
  </Card>
);

const LearningPathsTab: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Rutas de Aprendizaje</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
        <Network className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
        <p className="text-muted-foreground">
          La gestión de rutas de aprendizaje estará disponible próximamente.
        </p>
      </div>
    </CardContent>
  </Card>
);

const CertificatesTab: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Certificados</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
        <Award className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
        <p className="text-muted-foreground">
          La gestión de certificados estará disponible próximamente.
        </p>
      </div>
    </CardContent>
  </Card>
);

const AnalyticsTab: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Analíticas de Cursos</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
        <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
        <p className="text-muted-foreground">
          Las analíticas de cursos estarán disponibles próximamente.
        </p>
      </div>
    </CardContent>
  </Card>
);

const AdminCourses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{id: string, title: string} | null>(null);
  const { courses, isLoading, error, fetchCourses, setCourses } = useAdminCourses();

  const handleViewDetails = (courseId: string) => navigate(`/admin/courses/${courseId}`);
  const handleEdit = (courseId: string) => navigate(`/instructor/course/${courseId}/edit`);
  
  const handleEnrollUsers = (courseId: string, courseTitle: string) => {
    setSelectedCourse({ id: courseId, title: courseTitle });
    setEnrollmentDialogOpen(true);
  };

  const handleEnrollmentComplete = () => {
    toast.success("Usuario matriculado exitosamente");
    fetchCourses();
  };

  const handleDismissError = () => {
    // Solo limpiamos el error en la UI, pero no refrescamos los datos
    setCourses([]);
  };

  // Create tabs array for AdminPageLayout
  const tabs: AdminTabItem[] = [
    {
      value: 'list',
      label: 'Listado de cursos',
      icon: <List className="h-4 w-4" />,
      content: (
        <AllCoursesTab 
          courses={courses}
          isLoading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onEnrollUsers={handleEnrollUsers}
        />
      )
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
    >
      {error && (
        <div className="bg-destructive/10 border border-destructive rounded-md p-4 mb-6">
          <p className="text-destructive font-medium">Error: {error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchCourses} 
            className="mt-2"
          >
            Reintentar
          </Button>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/instructor/create-course")} className="gap-2">
          <Plus className="h-4 w-4" />
          Crear Curso
        </Button>
      </div>
    </AdminPageLayout>
  );
};

export default AdminCourses;
