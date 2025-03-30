
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import { PageSection } from '@/layouts/SectionPageLayout';

interface CourseGeneralTabProps {
  course: any;
  editedCourse: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange: (checked: boolean) => void;
}

const CourseGeneralTab: React.FC<CourseGeneralTabProps> = ({
  course,
  editedCourse,
  handleInputChange,
  handleSwitchChange
}) => {
  return (
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
  );
};

export default CourseGeneralTab;
