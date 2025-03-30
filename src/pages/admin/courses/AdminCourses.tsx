
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
import CategoriesTab from "@/features/admin/components/courses/CategoriesTab";
import LearningPathsTab from "@/features/admin/components/courses/LearningPathsTab";
import AllCertificatesTab from "@/features/admin/components/courses/AllCertificatesTab";
import AnalyticsTab from "@/features/admin/components/courses/AnalyticsTab";
import { useAdminCourses } from "@/features/admin/hooks/useAdminCourses";
import { useToast } from "@/hooks/use-toast";

const AdminCourses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{id: string, title: string} | null>(null);
  const { courses, isLoading, error, fetchCourses, setCourses } = useAdminCourses();
  const { toast } = useToast();

  const handleViewDetails = (courseId: string) => navigate(`/admin/courses/${courseId}`);
  const handleEdit = (courseId: string) => navigate(`/instructor/course/${courseId}/edit`);
  
  const handleEnrollUsers = (courseId: string, courseTitle: string) => {
    setSelectedCourse({ id: courseId, title: courseTitle });
    setEnrollmentDialogOpen(true);
  };

  const handleEnrollmentComplete = () => {
    toast({
      title: "Éxito",
      description: "Usuario matriculado exitosamente"
    });
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
      content: <AllCertificatesTab />
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
