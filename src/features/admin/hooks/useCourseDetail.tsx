
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface UseCourseDetailProps {
  courseId: string | undefined;
  onError?: () => void;
}

interface EditedCourse {
  title: string;
  description: string;
  price: number;
  is_published: boolean;
  category: string;
  level: string;
  currency: string;
  cover_image_url: string;
  slug: string;
}

const useCourseDetail = ({ courseId, onError }: UseCourseDetailProps) => {
  const { toast } = useToast();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editedCourse, setEditedCourse] = useState<EditedCourse>({
    title: '',
    description: '',
    price: 0,
    is_published: false,
    category: '',
    level: '',
    currency: 'eur',
    cover_image_url: '',
    slug: '',
  });

  const fetchCourseDetails = async (id: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id (
            id,
            full_name
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      setCourse(data);
      setEditedCourse({
        title: data.title || '',
        description: data.description || '',
        price: data.price || 0,
        is_published: data.is_published || false,
        category: data.category || '',
        level: data.level || '',
        currency: data.currency || 'eur',
        cover_image_url: data.cover_image_url || '',
        slug: data.slug || '',
      });
      
    } catch (error) {
      console.error('Error fetching course details:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar la información del curso.",
      });
      if (onError) onError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setEditedCourse(prev => ({
      ...prev,
      is_published: checked
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from('courses')
        .update({
          title: editedCourse.title,
          description: editedCourse.description,
          price: editedCourse.price,
          is_published: editedCourse.is_published,
          category: editedCourse.category,
          level: editedCourse.level,
          currency: editedCourse.currency,
          slug: editedCourse.slug,
          cover_image_url: editedCourse.cover_image_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Curso actualizado",
        description: "Los cambios se han guardado correctamente.",
      });
      
      if (courseId) {
        fetchCourseDetails(courseId);
      }
      
    } catch (error) {
      console.error('Error saving course:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron guardar los cambios del curso.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
    }
  }, [courseId]);

  return {
    course,
    isLoading,
    isSaving,
    editedCourse,
    handleInputChange,
    handleSwitchChange,
    handleSave,
    fetchCourseDetails
  };
};

export default useCourseDetail;
