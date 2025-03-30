
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2,
  Eye, 
  MoreHorizontal, 
  Loader2, 
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import AdminTabs from '@/components/admin/AdminTabs';
import useCourseDetail from '@/features/admin/hooks/useCourseDetail';

import CourseGeneralTab from '@/features/admin/components/courses/CourseGeneralTab';
import CourseContentTab from '@/features/admin/components/courses/CourseContentTab';
import CourseStudentsTab from '@/features/admin/components/courses/CourseStudentsTab';
import CourseStatsTab from '@/features/admin/components/courses/CourseStatsTab';
import CourseLoadingState from '@/features/admin/components/courses/CourseLoadingState';
import CourseError from '@/features/admin/components/courses/CourseError';
import CourseNotFound from '@/features/admin/components/courses/CourseNotFound';

const AdminCourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { course, isLoading, error } = useCourseDetail({ courseId });

  // Return to course list
  const handleBack = () => {
    navigate('/admin/courses');
  };
  
  // Handle delete course
  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      alert('Curso eliminado (simulado)');
      navigate('/admin/courses');
    }
  };

  // Render loading, error or not found states
  if (isLoading) return <CourseLoadingState />;
  if (error) return <CourseError error={error} onRetry={() => {}} onDismiss={() => {}} />;
  if (!course) return <CourseNotFound />;

  // Define available tabs
  const tabs = [
    { id: 'general', label: 'General', icon: <Eye className="h-4 w-4" /> },
    { id: 'content', label: 'Contenido', icon: <Edit className="h-4 w-4" /> },
    { id: 'students', label: 'Estudiantes', icon: <Eye className="h-4 w-4" /> },
    { id: 'stats', label: 'Estadísticas', icon: <Eye className="h-4 w-4" /> },
  ];

  // Define actions for the header
  const headerActions = React.useMemo(() => [
    <Button key="view" variant="outline" size="sm">
      <Eye className="h-4 w-4 mr-2" />
      Ver Curso
    </Button>,
    <Button key="edit" variant="outline" size="sm">
      <Edit className="h-4 w-4 mr-2" />
      Editar
    </Button>,
    <Button key="delete" variant="destructive" size="sm" onClick={handleDelete}>
      <Trash2 className="h-4 w-4 mr-2" />
      Eliminar
    </Button>
  ], [handleDelete]);

  return (
    <SectionPageLayout
      pageTitle={course.title}
      subtitle={`ID: ${course.id} · Creado: ${new Date(course.created_at).toLocaleDateString()}`}
      actions={headerActions}
      breadcrumbs={[
        { href: '/admin/dashboard', label: 'Dashboard' },
        { href: '/admin/courses', label: 'Cursos' },
        { href: '#', label: course.title, current: true }
      ]}
    >
      <div className="space-y-4">
        <AdminTabs tabs={tabs} defaultTabId="general" />
        
        <Tabs defaultValue="general" className="w-full">
          <TabsContent value="general">
            <CourseGeneralTab 
              course={course} 
              editedCourse={{
                title: course.title || '',
                description: course.description || '',
                price: course.price || 0,
                is_published: course.is_published || false,
                category: course.category || '',
                level: course.level || '',
                currency: course.currency || 'eur',
                cover_image_url: course.cover_image_url || '',
                slug: course.slug || '',
              }}
              handleInputChange={() => {}}
              handleSwitchChange={() => {}}
            />
          </TabsContent>
          
          <TabsContent value="content">
            <CourseContentTab />
          </TabsContent>
          
          <TabsContent value="students">
            <CourseStudentsTab courseId={course.id} courseName={course.title} />
          </TabsContent>
          
          <TabsContent value="stats">
            <CourseStatsTab />
          </TabsContent>
        </Tabs>
      </div>
    </SectionPageLayout>
  );
};

export default AdminCourseDetail;
