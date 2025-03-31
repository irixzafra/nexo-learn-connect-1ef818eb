
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface Course {
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

export const useCoursesManagement = () => {
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

  return {
    courses,
    loading,
    deleteDialogOpen,
    courseToDelete,
    editorOpen,
    selectedCourse,
    setEditorOpen,
    handleDeleteClick,
    confirmDelete,
    handleEditCourse,
    handleSaveCourse,
    handleViewCourse,
    setDeleteDialogOpen
  };
};
