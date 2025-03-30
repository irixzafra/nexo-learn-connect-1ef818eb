
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Save, 
  Trash, 
  Eye, 
  Info, 
  Users, 
  BookOpen, 
  FileText
} from 'lucide-react';

// Refactored components
import CourseLoadingState from '@/features/admin/components/courses/CourseLoadingState';
import CourseNotFound from '@/features/admin/components/courses/CourseNotFound';
import CourseGeneralTab from '@/features/admin/components/courses/CourseGeneralTab';
import CourseContentTab from '@/features/admin/components/courses/CourseContentTab';
import CourseStudentsTab from '@/features/admin/components/courses/CourseStudentsTab';
import CourseStatsTab from '@/features/admin/components/courses/CourseStatsTab';

// Custom hook
import useCourseDetail from '@/features/admin/hooks/useCourseDetail';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AdminCourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab = location.state?.activeTab || 'general';
  const [activeTab, setActiveTab] = useState(initialTab);

  const { 
    course, 
    isLoading, 
    isSaving, 
    editedCourse, 
    handleInputChange, 
    handleSwitchChange, 
    handleSave 
  } = useCourseDetail({
    courseId, 
    onError: () => navigate('/admin/courses')
  });

  // Efecto para actualizar la pestaña activa si cambia en la navegación
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  if (isLoading) {
    return <CourseLoadingState />;
  }

  if (!course) {
    return <CourseNotFound />;
  }

  return (
    <TooltipProvider>
      <SectionPageLayout
        header={{
          title: course.title,
          description: `ID: ${course.id}`,
          breadcrumbs: [
            { title: "Admin", href: "/admin" },
            { title: "Cursos", href: "/admin/courses" },
            { title: course.title }
          ],
          actions: [
            {
              icon: <Eye />,
              href: `/courses/${course.id}`,
              variant: "outline",
              tooltip: "Vista Previa",
              size: "icon"
            },
            {
              icon: <Trash />,
              onClick: () => {
                // Mostrar confirmación de eliminación
                console.log("Eliminar curso", course.id);
              },
              variant: "destructive",
              tooltip: "Eliminar",
              size: "icon"
            },
            {
              icon: isSaving ? undefined : <Save />,
              onClick: handleSave,
              disabled: isSaving,
              tooltip: "Guardar Cambios",
              size: "icon"
            }
          ]
        }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden md:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Contenido</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Estudiantes</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Estadísticas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <CourseGeneralTab 
              course={course} 
              editedCourse={editedCourse} 
              handleInputChange={handleInputChange} 
              handleSwitchChange={handleSwitchChange} 
            />
          </TabsContent>

          <TabsContent value="content">
            <CourseContentTab />
          </TabsContent>

          <TabsContent value="students">
            <CourseStudentsTab courseId={courseId as string} courseName={course.title} />
          </TabsContent>

          <TabsContent value="stats">
            <CourseStatsTab />
          </TabsContent>
        </Tabs>
      </SectionPageLayout>
    </TooltipProvider>
  );
};

export default AdminCourseDetail;
