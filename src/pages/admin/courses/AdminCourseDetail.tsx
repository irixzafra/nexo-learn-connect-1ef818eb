
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Settings, Users, List, BarChart
} from 'lucide-react';
import { AdminTabItem } from "@/components/admin/AdminTabs";
import { useCourseDetails } from '@/features/admin/hooks/useCourseDetails';
import CourseContentTab from '@/features/admin/components/courses/CourseContentTab';
import CourseStudentsTab from '@/features/admin/components/courses/CourseStudentsTab';
import CourseNotFound from '@/features/admin/components/courses/CourseNotFound';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import CourseSettingsTab from '@/features/admin/components/courses/CourseSettingsTab';
import CourseInstructorsTab from '@/features/admin/components/courses/CourseInstructorsTab';
import CourseAnalyticsTab from '@/features/admin/components/courses/CourseAnalyticsTab';

const AdminCourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState("settings");
  
  const { 
    course, 
    isLoading, 
    isSaving,
    editedCourse,
    handleInputChange,
    handleSwitchChange,
    handleSave,
    fetchCourseDetails
  } = useCourseDetails();
  
  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
    }
  }, [courseId]);
  
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!course) {
    return <CourseNotFound />;
  }

  // Aseguramos que el curso tiene todas las propiedades necesarias
  const enhancedCourse = {
    ...course,
    currency: course.currency || 'eur' // Proporcionar un valor por defecto
  };

  // Define the tabs for the course detail page
  const tabs: AdminTabItem[] = [
    {
      value: 'settings',
      label: 'Configuración',
      icon: <Settings className="h-4 w-4" />,
      content: (
        <CourseSettingsTab 
          course={enhancedCourse} 
          isSaving={isSaving} 
          editedCourse={editedCourse}
          handleInputChange={handleInputChange}
          handleSwitchChange={handleSwitchChange}
          handleSave={handleSave}
        />
      )
    },
    {
      value: 'content',
      label: 'Contenido',
      icon: <List className="h-4 w-4" />,
      content: <CourseContentTab course={enhancedCourse} />
    },
    {
      value: 'students',
      label: 'Estudiantes',
      icon: <Users className="h-4 w-4" />,
      content: <CourseStudentsTab courseId={enhancedCourse.id} courseName={enhancedCourse.title} />
    },
    {
      value: 'instructors',
      label: 'Instructores',
      icon: <BookOpen className="h-4 w-4" />,
      content: <CourseInstructorsTab courseId={enhancedCourse.id} courseName={enhancedCourse.title} />
    },
    {
      value: 'analytics',
      label: 'Analíticas',
      icon: <BarChart className="h-4 w-4" />,
      content: <CourseAnalyticsTab courseId={enhancedCourse.id} courseName={enhancedCourse.title} />
    }
  ];

  return (
    <AdminPageLayout
      title={enhancedCourse.title || "Detalles del curso"}
      subtitle="Administra los detalles del curso"
      tabs={tabs}
      defaultTabValue="settings"
    />
  );
};

export default AdminCourseDetail;
