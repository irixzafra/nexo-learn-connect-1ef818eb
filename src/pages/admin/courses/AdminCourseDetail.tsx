import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Save, 
  Trash, 
  Eye, 
  Info, 
  Users, 
  BookOpen, 
  FileText,
  Calendar 
} from 'lucide-react';
import StudentsSection from '@/features/admin/components/courses/StudentsSection';

const AdminCourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const [editedCourse, setEditedCourse] = useState<any>({
    title: '',
    description: '',
    price: 0,
    is_published: false,
    category: '',
    level: '',
    currency: 'eur',
  });

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
    }
  }, [courseId]);

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
      navigate('/admin/courses');
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
      
      fetchCourseDetails(courseId as string);
      
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

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-[70vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <SectionPageLayout
        header={{
          title: "Curso no encontrado",
          breadcrumbs: [
            { title: "Admin", href: "/admin" },
            { title: "Cursos", href: "/admin/courses" },
            { title: "Detalle" }
          ],
        }}
      >
        <PageSection variant="card">
          <div className="flex flex-col items-center justify-center p-6">
            <Info className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Curso no encontrado</h3>
            <p className="text-muted-foreground mb-4">
              El curso que estás buscando no existe o ha sido eliminado.
            </p>
            <Button onClick={() => navigate('/admin/courses')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Cursos
            </Button>
          </div>
        </PageSection>
      </SectionPageLayout>
    );
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PageSection variant="card" title="Información General" description="Detalles básicos del curso">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del Curso</Label>
                    <Input 
                      id="title"
                      name="title"
                      value={editedCourse.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input 
                      id="slug"
                      name="slug"
                      value={editedCourse.slug}
                      onChange={handleInputChange}
                      placeholder="curso-ejemplo"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea 
                      id="description"
                      name="description"
                      value={editedCourse.description}
                      onChange={handleInputChange}
                      rows={5}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Input 
                        id="category"
                        name="category"
                        value={editedCourse.category}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="level">Nivel</Label>
                      <Input 
                        id="level"
                        name="level"
                        value={editedCourse.level}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Precio</Label>
                      <Input 
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={editedCourse.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Moneda</Label>
                      <Input 
                        id="currency"
                        name="currency"
                        value={editedCourse.currency}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cover_image_url">URL de Imagen de Portada</Label>
                    <Input 
                      id="cover_image_url"
                      name="cover_image_url"
                      value={editedCourse.cover_image_url}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="is_published"
                      checked={editedCourse.is_published}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="is_published">Publicar curso</Label>
                  </div>
                </div>
              </PageSection>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <PageSection variant="card" title="Instructor" description="Responsable del curso">
                <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{course.profiles?.full_name || 'Sin instructor asignado'}</p>
                    <p className="text-sm text-muted-foreground">ID: {course.instructor_id || 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" disabled>
                    Cambiar instructor
                  </Button>
                </div>
              </PageSection>
              
              <PageSection variant="card" title="Información Adicional">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Fecha de creación</span>
                    <span>{new Date(course.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Última actualización</span>
                    <span>{new Date(course.updated_at || course.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Estado</span>
                    <Badge variant={course.is_published ? "default" : "secondary"}>
                      {course.is_published ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </div>
                </div>
              </PageSection>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <PageSection variant="card" title="Contenido del Curso" description="Módulos y lecciones">
            <div className="text-center py-10">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Editor de Contenido</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Aquí podrás gestionar los módulos y lecciones del curso. Esta funcionalidad está en desarrollo.
              </p>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Ver estructura actual
              </Button>
            </div>
          </PageSection>
        </TabsContent>

        <TabsContent value="students">
          <PageSection variant="card" title="Estudiantes Inscritos" description="Gestión de participantes">
            <StudentsSection courseId={courseId as string} courseName={course.title} />
          </PageSection>
        </TabsContent>

        <TabsContent value="stats">
          <PageSection variant="card" title="Estadísticas del Curso" description="Métricas de rendimiento">
            <div className="text-center py-10">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Estadísticas y Análisis</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Visualiza métricas sobre el rendimiento del curso, inscripciones y progreso de estudiantes. Esta funcionalidad está en desarrollo.
              </p>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Ver informes
              </Button>
            </div>
          </PageSection>
        </TabsContent>
      </Tabs>
    </SectionPageLayout>
  );
};

export default AdminCourseDetail;
