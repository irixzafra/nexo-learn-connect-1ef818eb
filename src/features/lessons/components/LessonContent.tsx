
import React from "react";
import { Lesson } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, Download, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LessonContentProps {
  lesson: Lesson;
}

export const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Generate embed URL
  const getEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Check if it's already an embed URL
    if (url.includes("youtube.com/embed/")) {
      return url;
    }
    
    // Handle Vimeo URLs (basic support)
    if (url.includes("vimeo.com")) {
      const vimeoId = url.split("/").pop();
      if (vimeoId) {
        return `https://player.vimeo.com/video/${vimeoId}`;
      }
    }
    
    return url; // Return original URL if we can't parse it
  };

  // Mock data for resources (to be implemented with real data later)
  const resources = [
    { id: '1', name: 'Material complementario.pdf', type: 'pdf', size: '1.2 MB' },
    { id: '2', name: 'Ejercicios prácticos.docx', type: 'docx', size: '450 KB' },
    { id: '3', name: 'Plantilla de proyecto.zip', type: 'zip', size: '3.5 MB' },
  ];

  // Mock data for links (to be implemented with real data later)
  const links = [
    { id: '1', title: 'Documentación oficial', url: 'https://docs.example.com' },
    { id: '2', title: 'Tutorial relacionado', url: 'https://tutorial.example.com' },
    { id: '3', title: 'Artículo de referencia', url: 'https://article.example.com' },
  ];

  if (lesson.content_type === "video" && lesson.content_video_url) {
    return (
      <div className="space-y-4">
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src={getEmbedUrl(lesson.content_video_url)}
            className="w-full h-full"
            title={lesson.title}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        
        <Tabs defaultValue="description" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              <span>Descripción</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              <span>Recursos</span>
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center">
              <Link className="w-4 h-4 mr-2" />
              <span>Enlaces</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="p-4 bg-muted/30 rounded-md mt-2">
            <p className="text-muted-foreground whitespace-pre-wrap">
              {lesson.content_text ? lesson.content_text.content : "No hay descripción disponible para esta lección."}
            </p>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-2">
            <Card>
              <CardContent className="p-4">
                {resources.length > 0 ? (
                  <ul className="divide-y">
                    {resources.map(resource => (
                      <li key={resource.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-primary mr-3" />
                          <div>
                            <p className="font-medium">{resource.name}</p>
                            <p className="text-xs text-muted-foreground">{resource.size}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Descargar
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-6">
                    No hay recursos disponibles para esta lección.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="links" className="mt-2">
            <Card>
              <CardContent className="p-4">
                {links.length > 0 ? (
                  <ul className="divide-y">
                    {links.map(link => (
                      <li key={link.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <Link className="h-5 w-5 text-primary mr-3" />
                          <p className="font-medium">{link.title}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => window.open(link.url, '_blank')}>
                          Abrir enlace
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-6">
                    No hay enlaces disponibles para esta lección.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (lesson.content_type === "text" && lesson.content_text) {
    return (
      <Card>
        <CardContent className="prose prose-sm sm:prose-base max-w-none p-6">
          <div className="whitespace-pre-wrap">
            {lesson.content_text.content || "No hay contenido disponible para esta lección."}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="text-center p-6 bg-muted rounded-lg">
      <p className="text-muted-foreground">Esta lección no tiene contenido.</p>
    </div>
  );
};
