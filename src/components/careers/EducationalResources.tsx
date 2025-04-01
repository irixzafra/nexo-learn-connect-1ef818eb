
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, Podcast, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'ebook' | 'podcast';
  duration: string;
  level: string;
  author: string;
  url: string;
  cover_image_url: string;
  is_featured: boolean;
  category: string;
  tags: string[];
}

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
    <Card className={resource.is_featured ? "border-primary" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-muted rounded-full">
              <ResourceIcon type={resource.type as Resource['type']} />
            </div>
            <Badge variant="outline">{ResourceTypeLabel({ type: resource.type as Resource['type'] })}</Badge>
          </div>
          {resource.is_featured && <Badge>Destacado</Badge>}
        </div>
        <CardTitle className="mt-2">{resource.title}</CardTitle>
        <CardDescription>{resource.author}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
        <div className="flex flex-wrap gap-2">
          {resource.category && <Badge variant="secondary">{resource.category}</Badge>}
          <Badge variant="outline">{resource.level}</Badge>
          <Badge variant="outline">{resource.duration}</Badge>
          {resource.tags && resource.tags.length > 0 && 
            resource.tags.slice(0, 2).map((tag, idx) => (
              <Badge key={idx} variant="outline" className="bg-blue-50">{tag}</Badge>
            ))
          }
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => window.open(resource.url, '_blank')}
        >
          Acceder al recurso
          <ExternalLink className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const EducationalResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data, error } = await supabase
          .from('educational_resources')
          .select('*')
          .order('is_featured', { ascending: false });

        if (error) throw error;
        setResources(data || []);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los recursos');
        console.error('Error fetching resources:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 text-center">
        <p className="text-destructive">Error: {error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recursos Educativos</h2>
        <Button variant="outline">Ver todos</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.slice(0, 4).map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default EducationalResources;
