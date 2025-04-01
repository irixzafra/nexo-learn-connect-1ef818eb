
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, Podcast } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'ebook' | 'podcast';
  duration: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  author: string;
  featured: boolean;
}

const resources: Resource[] = [
  {
    id: 'res-1',
    title: 'Guía de inicio para desarrolladores web',
    description: 'Todo lo que necesitas saber para comenzar como desarrollador web en 2023.',
    type: 'ebook',
    duration: '1h 30min lectura',
    level: 'Básico',
    author: 'David Rodríguez',
    featured: true
  },
  {
    id: 'res-2',
    title: 'Principios de UX/UI para desarrolladores',
    description: 'Aprende los fundamentos de diseño que todo desarrollador debería conocer.',
    type: 'video',
    duration: '45min',
    level: 'Intermedio',
    author: 'Laura Martínez',
    featured: false
  },
  {
    id: 'res-3',
    title: 'El futuro del trabajo en tecnología',
    description: 'Perspectivas sobre cómo evolucionará el trabajo en el sector tecnológico.',
    type: 'podcast',
    duration: '28min',
    level: 'Avanzado',
    author: 'Carlos Gómez y Ana Torre',
    featured: true
  },
  {
    id: 'res-4',
    title: 'Cómo preparar una entrevista técnica',
    description: 'Consejos prácticos para superar con éxito entrevistas de programación.',
    type: 'article',
    duration: '12min lectura',
    level: 'Intermedio',
    author: 'Marta Sánchez',
    featured: false
  }
];

const ResourceIcon = ({ type }: { type: Resource['type'] }) => {
  switch (type) {
    case 'article':
      return <FileText className="h-5 w-5" />;
    case 'video':
      return <Video className="h-5 w-5" />;
    case 'ebook':
      return <BookOpen className="h-5 w-5" />;
    case 'podcast':
      return <Podcast className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const ResourceTypeLabel = ({ type }: { type: Resource['type'] }) => {
  switch (type) {
    case 'article':
      return 'Artículo';
    case 'video':
      return 'Video';
    case 'ebook':
      return 'E-Book';
    case 'podcast':
      return 'Podcast';
    default:
      return type;
  }
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <Card className={resource.featured ? "border-primary" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-muted rounded-full">
              <ResourceIcon type={resource.type} />
            </div>
            <Badge variant="outline">{ResourceTypeLabel({ type: resource.type })}</Badge>
          </div>
          {resource.featured && <Badge>Destacado</Badge>}
        </div>
        <CardTitle className="mt-2">{resource.title}</CardTitle>
        <CardDescription>{resource.author}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
        <div className="flex gap-2">
          <Badge variant="secondary">{resource.level}</Badge>
          <Badge variant="outline">{resource.duration}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full">Acceder al recurso</Button>
      </CardFooter>
    </Card>
  );
};

const EducationalResources: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recursos Educativos</h2>
        <Button variant="outline">Ver todos</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default EducationalResources;
