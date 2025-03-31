
import React from 'react';
import { AIServicesManager } from '@/components/admin/pages/ai-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MessageSquare, Wand2, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AIServicesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Servicios de IA</h1>
        <p className="text-muted-foreground">
          Configura y gestiona los servicios de inteligencia artificial para la generación de contenido
        </p>
      </div>
      
      <Tabs defaultValue="services">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Servicios
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Generación
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chatbots
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="services">
          <AIServicesManager />
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Generación de Contenido
              </CardTitle>
              <CardDescription>
                Configura los parámetros de generación de contenido para cada tipo de elemento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="border p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Páginas</h3>
                    <Badge variant="outline">OpenAI</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configuración para generación de contenido de páginas web completas
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Cursos</h3>
                    <Badge variant="outline">Sin configurar</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configuración para generación de contenido de cursos y lecciones
                  </p>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Marketing</h3>
                    <Badge variant="outline">Sin configurar</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configuración para generación de contenido de marketing
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Chatbots
              </CardTitle>
              <CardDescription>
                Configura chatbots inteligentes para tu plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Próximamente</h3>
                <p className="text-muted-foreground max-w-md">
                  La configuración de chatbots estará disponible próximamente. 
                  Podrás crear asistentes virtuales personalizados para tu plataforma.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIServicesPage;
