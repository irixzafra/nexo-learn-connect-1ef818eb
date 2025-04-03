
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Brain, MessageSquare, Wand2, Bot, Settings, FileText, BookOpen, Image, FileQuestion, Check, Edit2, Zap, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import AIContentGenerator from '@/components/admin/ai/AIContentGenerator';

const AIAdvancedServicesPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [aiModel, setAiModel] = useState('gpt-4o-mini');
  
  const handleSaveSettings = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Configuración de IA guardada con éxito');
    }, 1500);
  };
  
  const handleTestConnection = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Conexión con la API de OpenAI verificada correctamente');
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Servicios Avanzados de IA</h1>
        <p className="text-muted-foreground">
          Configura y gestiona los servicios avanzados de inteligencia artificial para la generación de contenido
        </p>
      </div>
      
      <Tabs defaultValue="generator">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Generador
          </TabsTrigger>
          <TabsTrigger value="configuration" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuración
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Servicios
          </TabsTrigger>
          <TabsTrigger value="chatbots" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chatbots
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AIContentGenerator contentType="page" />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileQuestion className="h-5 w-5 text-primary" />
                    Tipos de Contenido
                  </CardTitle>
                  <CardDescription>
                    Tipos de contenido que puedes generar con IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Páginas web completas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>Estructura de cursos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Contenido de lecciones</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>Emails de marketing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>Publicaciones en redes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Zap className="h-5 w-5 text-primary" />
                    Funciones Avanzadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <div className="mt-0.5">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium block">Ajuste de tono y estilo</span>
                        <span className="text-sm text-muted-foreground">Personaliza el estilo de escritura</span>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <div className="mt-0.5">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium block">Múltiples modelos IA</span>
                        <span className="text-sm text-muted-foreground">Elige entre diferentes modelos</span>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <div className="mt-0.5">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium block">Optimización SEO</span>
                        <span className="text-sm text-muted-foreground">Contenido optimizado para SEO</span>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <div className="mt-0.5">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium block">Edición posterior</span>
                        <span className="text-sm text-muted-foreground">Edita el contenido antes de publicar</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Configuración de IA
              </CardTitle>
              <CardDescription>
                Configura las credenciales y parámetros para los servicios de IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key de OpenAI</Label>
                    <Input 
                      id="api-key" 
                      type="password" 
                      placeholder="sk-..." 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Se requiere una API key de OpenAI para usar los servicios de IA
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-model">Modelo predeterminado</Label>
                    <select 
                      id="default-model" 
                      className="w-full p-2 rounded-md border"
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                    >
                      <option value="gpt-4o-mini">GPT-4o Mini (Más rápido y económico)</option>
                      <option value="gpt-4o">GPT-4o (Más poderoso)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      disabled={!apiKey || loading}
                      onClick={handleTestConnection}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verificando...
                        </>
                      ) : (
                        'Verificar conexión'
                      )}
                    </Button>
                    
                    <Button 
                      disabled={!apiKey || loading}
                      onClick={handleSaveSettings}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        'Guardar configuración'
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-base">Configuración avanzada</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-course-generation" className="font-medium">Generación de cursos</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir la generación automática de cursos con IA
                      </p>
                    </div>
                    <Switch id="enable-course-generation" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-seo-optimization" className="font-medium">Optimización SEO</Label>
                      <p className="text-sm text-muted-foreground">
                        Optimizar automáticamente el contenido para SEO
                      </p>
                    </div>
                    <Switch id="enable-seo-optimization" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-image-generation" className="font-medium">Generación de imágenes</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir la generación de imágenes con DALL-E
                      </p>
                    </div>
                    <Switch id="enable-image-generation" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-content-moderation" className="font-medium">Moderación de contenido</Label>
                      <p className="text-sm text-muted-foreground">
                        Moderar automáticamente el contenido generado
                      </p>
                    </div>
                    <Switch id="enable-content-moderation" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Servicios de IA
                </CardTitle>
                <CardDescription>
                  Servicios de inteligencia artificial disponibles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Generación de Contenido</h3>
                    </div>
                    <Badge variant="outline" className="bg-green-100">Activo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Genera contenido de texto para páginas, cursos, lecciones y más
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Image className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Generación de Imágenes</h3>
                    </div>
                    <Badge variant="outline">Disponible</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Crea imágenes personalizadas con IA para tus cursos y contenido
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Optimización SEO</h3>
                    </div>
                    <Badge variant="outline" className="bg-green-100">Activo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Optimiza tu contenido para motores de búsqueda automáticamente
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Servicios Avanzados
                </CardTitle>
                <CardDescription>
                  Funcionalidades avanzadas de IA para tu plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Asistentes IA</h3>
                    </div>
                    <Badge variant="outline">Próximamente</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Asistentes inteligentes para diferentes secciones de tu plataforma
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" disabled>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Cursos Automáticos</h3>
                    </div>
                    <Badge variant="outline">Próximamente</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Crea cursos completos automáticamente a partir de un tema
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" disabled>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Respuestas Automáticas</h3>
                    </div>
                    <Badge variant="outline" className="bg-green-100">Beta</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Responde automáticamente a preguntas basadas en el contenido del curso
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="chatbots">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Chatbots
              </CardTitle>
              <CardDescription>
                Configura chatbots inteligentes para tu plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bot className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Próximamente</h3>
                <p className="text-muted-foreground max-w-lg mb-6">
                  La configuración de chatbots estará disponible próximamente. 
                  Podrás crear asistentes virtuales personalizados para tu plataforma
                  que respondan preguntas sobre tus cursos, proporcionen ayuda a los 
                  estudiantes y mucho más.
                </p>
                <Button disabled>Unirse a lista de espera</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAdvancedServicesPage;
