
import React from 'react';
import { Course } from '@/types/course';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormControl, FormDescription, FormLabel } from '@/components/ui/form';

interface CourseEditBasicProps {
  formData: Partial<Course>;
  onChange: (field: keyof Course, value: any) => void;
}

export const CourseEditBasic: React.FC<CourseEditBasicProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información básica</CardTitle>
          <CardDescription>
            Proporciona la información esencial sobre tu curso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título del curso *</Label>
            <Input
              id="title"
              placeholder="Ej: Introducción a React"
              value={formData.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Un título conciso y descriptivo para tu curso (50-60 caracteres)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Describe tu curso y lo que los estudiantes aprenderán..."
              rows={6}
              value={formData.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Una descripción completa que explique lo que cubre el curso
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Detalles del curso</CardTitle>
          <CardDescription>
            Información adicional sobre tu curso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Nivel</Label>
              <Select 
                value={formData.level || ''}
                onValueChange={(value) => onChange('level', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="principiante">Principiante</SelectItem>
                  <SelectItem value="intermedio">Intermedio</SelectItem>
                  <SelectItem value="avanzado">Avanzado</SelectItem>
                  <SelectItem value="todos">Todos los niveles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select 
                value={formData.category || 'curso'}
                onValueChange={(value) => onChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="curso">Curso</SelectItem>
                  <SelectItem value="programacion">Programación</SelectItem>
                  <SelectItem value="diseno">Diseño</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="negocios">Negocios</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration_text">Duración</Label>
              <Input
                id="duration_text"
                placeholder="Ej: 10 horas"
                value={formData.duration_text || ''}
                onChange={(e) => onChange('duration_text', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="featured_instructor">Instructor destacado</Label>
              <Input
                id="featured_instructor"
                placeholder="Nombre del instructor"
                value={formData.featured_instructor || ''}
                onChange={(e) => onChange('featured_instructor', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prerequisites_text">Requisitos previos</Label>
            <Textarea
              id="prerequisites_text"
              placeholder="¿Qué necesitan saber los estudiantes antes de tomar este curso?"
              rows={3}
              value={formData.prerequisites_text || ''}
              onChange={(e) => onChange('prerequisites_text', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Imagen del curso</CardTitle>
          <CardDescription>
            Sube una imagen atractiva para tu curso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cover_image_url">URL de la imagen de portada</Label>
            <Input
              id="cover_image_url"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formData.cover_image_url || ''}
              onChange={(e) => onChange('cover_image_url', e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              URL de la imagen que se mostrará como portada del curso (recomendado: 1280x720px)
            </p>
          </div>
          
          {formData.cover_image_url && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Vista previa:</p>
              <div className="aspect-video bg-muted rounded-md overflow-hidden">
                <img 
                  src={formData.cover_image_url} 
                  alt="Vista previa de la portada" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
