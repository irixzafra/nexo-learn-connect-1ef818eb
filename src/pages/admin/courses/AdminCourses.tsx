
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Book, Eye, Pencil, BarChart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import SectionPageLayout from "@/layouts/SectionPageLayout";
import { Breadcrumb } from "@/components/layout/page/PageHeader";
import ManualEnrollmentDialog from "@/components/admin/ManualEnrollmentDialog";

// Componentes refactorizados
import CourseError from "@/features/admin/components/courses/CourseError";
import AllCoursesTab from "@/features/admin/components/courses/AllCoursesTab";
import PublishedCoursesTab from "@/features/admin/components/courses/PublishedCoursesTab";
import DraftCoursesTab from "@/features/admin/components/courses/DraftCoursesTab";
import AnalyticsTab from "@/features/admin/components/courses/AnalyticsTab";

// Hook personalizado
import { useAdminCourses } from "@/features/admin/hooks/useAdminCourses";

const AdminCourses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-courses");
  const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{id: string, title: string} | null>(null);
  
  const { courses, isLoading, error, fetchCourses, setCourses } = useAdminCourses();

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

  const filteredCourses = searchTerm.trim() === "" 
    ? courses 
    : courses.filter(course => 
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructors?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));

  const publishedCourses = filteredCourses.filter(course => course.status === 'published' || course.is_published === true);
  const draftCourses = filteredCourses.filter(course => course.status === 'draft' || course.is_published === false);

  const navigateToDetails = (courseId: string) => navigate(`/admin/courses/${courseId}`);
  const navigateToEdit = (courseId: string) => navigate(`/instructor/course/${courseId}/edit`);

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
        ] as Breadcrumb[]
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

      {error && (
        <CourseError 
          error={error} 
          onRetry={fetchCourses} 
          onDismiss={handleDismissError} 
        />
      )}

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
        
        <TabsContent value="all-courses" className="space-y-6">
          <AllCoursesTab
            courses={filteredCourses}
            isLoading={isLoading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onViewDetails={navigateToDetails}
            onEdit={navigateToEdit}
            onEnrollUsers={handleEnrollUsers}
          />
        </TabsContent>
        
        <TabsContent value="published" className="space-y-6">
          <PublishedCoursesTab
            publishedCourses={publishedCourses}
            isLoading={isLoading}
            onEnrollUsers={handleEnrollUsers}
          />
        </TabsContent>
        
        <TabsContent value="drafts" className="space-y-6">
          <DraftCoursesTab
            draftCourses={draftCourses}
            isLoading={isLoading}
            onEdit={navigateToEdit}
          />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>

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
