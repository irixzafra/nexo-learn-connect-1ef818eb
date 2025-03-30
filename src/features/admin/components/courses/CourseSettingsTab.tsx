
import React from 'react';
import { PageSection } from '@/layouts/SectionPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Save, Loader2 } from 'lucide-react';
import { Course } from '@/types/course';

interface CourseSettingsTabProps {
  course: Course;
  isSaving: boolean;
  editedCourse: Partial<Course>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange: (name: string, value: boolean) => void;
  handleSave: () => Promise<void>;
}

const CourseSettingsTab: React.FC<CourseSettingsTabProps> = ({
  course,
  isSaving,
  editedCourse,
  handleInputChange,
  handleSwitchChange,
  handleSave
}) => {
  return (
    <PageSection variant="card" title="Configuración del Curso" description="Datos básicos del curso">
      <Card>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título del curso</Label>
                <Input
                  id="title"
                  name="title"
                  value={editedCourse.title !== undefined ? editedCourse.title : course.title}
                  onChange={handleInputChange}
                  placeholder="Título del curso"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={editedCourse.slug !== undefined ? editedCourse.slug : (course.slug || '')}
                  onChange={handleInputChange}
                  placeholder="url-del-curso"
                />
                <p className="text-xs text-muted-foreground">El slug se genera automáticamente, pero puedes personalizarlo</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={editedCourse.description !== undefined ? editedCourse.description : (course.description || '')}
                onChange={handleInputChange}
                placeholder="Descripción del curso"
                rows={5}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={editedCourse.price !== undefined ? editedCourse.price : course.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Moneda</Label>
                <Select
                  name="currency"
                  value={editedCourse.currency !== undefined ? editedCourse.currency : course.currency}
                  onValueChange={(value) => handleInputChange({ target: { name: 'currency', value } } as any)}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Selecciona moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="usd">USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Nivel</Label>
                <Select
                  name="level"
                  value={editedCourse.level !== undefined ? editedCourse.level : (course.level || '')}
                  onValueChange={(value) => handleInputChange({ target: { name: 'level', value } } as any)}
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Selecciona nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Principiante</SelectItem>
                    <SelectItem value="intermediate">Intermedio</SelectItem>
                    <SelectItem value="advanced">Avanzado</SelectItem>
                    <SelectItem value="all_levels">Todos los niveles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_image_url">URL de imagen de portada</Label>
              <Input
                id="cover_image_url"
                name="cover_image_url"
                value={editedCourse.cover_image_url !== undefined ? editedCourse.cover_image_url : (course.cover_image_url || '')}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration_text">Duración (texto)</Label>
                <Input
                  id="duration_text"
                  name="duration_text"
                  value={editedCourse.duration_text !== undefined ? editedCourse.duration_text : (course.duration_text || '')}
                  onChange={handleInputChange}
                  placeholder="Ej: 10 horas"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Input
                  id="category"
                  name="category"
                  value={editedCourse.category !== undefined ? editedCourse.category : (course.category || '')}
                  onChange={handleInputChange}
                  placeholder="Ej: Marketing"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_published"
                checked={editedCourse.is_published !== undefined ? editedCourse.is_published : course.is_published}
                onCheckedChange={(checked) => handleSwitchChange('is_published', checked)}
              />
              <Label htmlFor="is_published">Publicado</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured_on_landing"
                checked={editedCourse.is_featured_on_landing !== undefined ? editedCourse.is_featured_on_landing : (course.is_featured_on_landing || false)}
                onCheckedChange={(checked) => handleSwitchChange('is_featured_on_landing', checked)}
              />
              <Label htmlFor="is_featured_on_landing">Destacado en página de inicio</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageSection>
  );
};

export default CourseSettingsTab;
