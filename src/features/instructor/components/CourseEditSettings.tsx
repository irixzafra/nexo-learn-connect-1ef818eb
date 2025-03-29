
import React from 'react';
import { Course } from '@/types/course';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CourseEditSettingsProps {
  formData: Partial<Course>;
  onChange: (field: keyof Course, value: any) => void;
}

export const CourseEditSettings: React.FC<CourseEditSettingsProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Precios y visibilidad</CardTitle>
          <CardDescription>
            Configura opciones de precio y visibilidad de tu curso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                value={formData.price?.toString() || '0'}
                onChange={(e) => onChange('price', parseFloat(e.target.value) || 0)}
              />
              <p className="text-sm text-muted-foreground">
                Establece en 0 para un curso gratuito
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Moneda</Label>
              <Select 
                value={formData.currency || 'eur'}
                onValueChange={(value) => onChange('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="is_published">Publicar curso</Label>
              <Switch
                id="is_published"
                checked={formData.is_published || false}
                onCheckedChange={(checked) => onChange('is_published', checked)}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Cuando esté marcado, tu curso será visible para todos los usuarios
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="is_featured">Destacar en landing</Label>
              <Switch
                id="is_featured"
                checked={formData.is_featured_on_landing || false}
                onCheckedChange={(checked) => onChange('is_featured_on_landing', checked)}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Destaca este curso en la página principal
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>SEO y Metadatos</CardTitle>
          <CardDescription>
            Optimiza tu curso para motores de búsqueda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slug">URL amigable (slug)</Label>
            <Input
              id="slug"
              placeholder="mi-curso-de-ejemplo"
              value={formData.slug || ''}
              onChange={(e) => onChange('slug', e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              URL personalizada para tu curso (sin espacios, solo guiones)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seo_title">Título SEO</Label>
            <Input
              id="seo_title"
              placeholder="Título optimizado para SEO"
              value={formData.seo_title || ''}
              onChange={(e) => onChange('seo_title', e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Título optimizado para motores de búsqueda (60 caracteres máx.)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seo_description">Descripción SEO</Label>
            <Textarea
              id="seo_description"
              placeholder="Breve descripción para SEO"
              rows={3}
              value={formData.seo_description || ''}
              onChange={(e) => onChange('seo_description', e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Descripción corta para motores de búsqueda (160 caracteres máx.)
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Ajustes adicionales</CardTitle>
          <CardDescription>
            Otras configuraciones para tu curso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="display_order">Orden de visualización</Label>
            <Input
              id="display_order"
              type="number"
              placeholder="0"
              value={formData.display_order?.toString() || '0'}
              onChange={(e) => onChange('display_order', parseInt(e.target.value) || 0)}
            />
            <p className="text-sm text-muted-foreground">
              Define el orden en listas (números menores aparecen primero)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
