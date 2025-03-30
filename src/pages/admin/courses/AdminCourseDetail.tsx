
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const AdminCourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');

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

  if (isLoading) {
    return <CourseLoadingState />;
  }

  if (!course) {
    return <CourseNotFound />;
  }

  return (
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
            label: "Vista Previa",
            icon: <Eye />,
            href: `/courses/${course.id}`,
            variant: "outline"
          },
          {
            label: "Eliminar",
            icon: <Trash />,
            onClick: () => {
              // Mostrar confirmación de eliminación
              console.log("Eliminar curso", course.id);
            },
            variant: "destructive"
          },
          {
            label: "Guardar Cambios",
            icon: isSaving ? undefined : <Save />,
            onClick: handleSave,
            disabled: isSaving
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
  );
};

export default AdminCourseDetail;
