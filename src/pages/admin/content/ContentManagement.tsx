
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Folder, PenSquare, Tag, Layers, FileText, BookOpen, Image, Route } from 'lucide-react';
import CategoryManagement from '@/pages/admin/CategoryManagement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import TemplatesPage from './TemplatesPage';

const ContentManagement: React.FC = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = React.useState("overview");
  
  // Verificar si el usuario tiene permiso para acceder a esta página
  if (userRole !== 'admin') {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
        <p>No tienes permiso para acceder a esta página.</p>
        <Button 
          className="mt-4" 
          onClick={() => navigate('/dashboard')}
        >
          Volver al Dashboard
        </Button>
      </div>
    );
  }

  // Secciones de contenido disponibles
  const contentSections = [
    {
      id: 'categories',
      title: 'Categorías',
      description: 'Administra las categorías para organizar el contenido',
      icon: Folder,
      path: '/admin/content/categories'
    },
    {
      id: 'learning-paths',
      title: 'Rutas de Aprendizaje',
      description: 'Gestiona rutas formativas para los estudiantes',
      icon: Route,
      path: '/admin/learning-paths'
    },
    {
      id: 'tags',
      title: 'Etiquetas',
      description: 'Gestiona etiquetas para clasificar el contenido',
      icon: Tag,
      path: '/admin/content/tags'
    },
    {
      id: 'templates',
      title: 'Plantillas',
      description: 'Gestiona plantillas para crear contenido rápidamente',
      icon: Layers,
      path: '/admin/content/templates'
    },
    {
      id: 'editor',
      title: 'Editor de Contenido',
      description: 'Crea y edita contenido con un editor avanzado',
      icon: PenSquare,
      path: '/admin/content/editor'
    },
    {
      id: 'assets',
      title: 'Biblioteca de Recursos',
      description: 'Administra imágenes, videos y otros recursos',
      icon: Image,
      path: '/admin/content/assets'
    }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Folder className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Gestión de Contenido</h1>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="learning-paths">Rutas de Aprendizaje</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentSections.map((section) => (
              <Card key={section.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <section.icon className="h-5 w-5 text-primary" />
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      if (section.id === 'categories') {
                        setActiveTab('categories');
                      } else if (section.id === 'learning-paths') {
                        setActiveTab('learning-paths');
                      } else if (section.id === 'templates') {
                        setActiveTab('templates');
                      } else {
                        navigate(section.path);
                      }
                    }}
                  >
                    Gestionar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <CategoryManagement embeddedView={true} />
        </TabsContent>
        
        <TabsContent value="learning-paths">
          <Card>
            <CardHeader>
              <CardTitle>Rutas de Aprendizaje</CardTitle>
              <CardDescription>
                Configura secuencias de cursos para guiar a los estudiantes en su proceso de formación.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Las rutas de aprendizaje permiten ordenar cursos en una secuencia lógica para formar competencias completas.</p>
              <div className="flex justify-center p-6 bg-muted/50 rounded-lg">
                <Route className="h-12 w-12 text-primary opacity-50" />
                <p className="ml-4">Funcionalidad en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <TemplatesPage />
        </TabsContent>
        
        <TabsContent value="editor">
          <Card>
            <CardHeader>
              <CardTitle>Editor de Contenido</CardTitle>
              <CardDescription>
                Esta función estará disponible próximamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>El editor te permitirá crear y editar contenido con herramientas avanzadas de formateo.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
