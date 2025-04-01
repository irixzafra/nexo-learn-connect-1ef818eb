
import React, { useState } from 'react';
import { PageNavigationCard } from './PageNavigationCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, Monitor, Database, FileBadge, GraduationCap, Users, BarChart4, Home, Folder } from 'lucide-react';

// Define the page data structure
interface PageData {
  title: string;
  path: string;
  description: string;
  status: 'active' | 'development' | 'not-implemented' | 'duplicate' | 'deprecated';
  category: string;
  importance: 'high' | 'medium' | 'low';
  image?: string;
}

// Import all the system pages from our documentation
const systemPages: PageData[] = [
  // Páginas Públicas
  {
    title: "Landing",
    path: "/landing",
    description: "Página principal para visitantes",
    status: "active",
    category: "Marketing",
    importance: "high",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Login",
    path: "/auth/login",
    description: "Inicio de sesión",
    status: "active",
    category: "Autenticación",
    importance: "high",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Registro",
    path: "/auth/register",
    description: "Registro de usuario",
    status: "active",
    category: "Autenticación",
    importance: "high",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Sobre Nosotros",
    path: "/about-us",
    description: "Información institucional",
    status: "active",
    category: "Marketing",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Becas",
    path: "/scholarships",
    description: "Información sobre becas",
    status: "active",
    category: "Marketing",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Contacto",
    path: "/contact",
    description: "Formulario de contacto",
    status: "development",
    category: "Marketing",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Explorar Cursos",
    path: "/courses",
    description: "Catálogo de cursos disponibles",
    status: "active",
    category: "Cursos",
    importance: "high",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Detalle de Curso",
    path: "/courses/:id",
    description: "Vista detallada de un curso",
    status: "active",
    category: "Cursos",
    importance: "high",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop"
  },
  
  // Páginas de Estudiante
  {
    title: "Dashboard Estudiante",
    path: "/home",
    description: "Panel principal del estudiante",
    status: "active",
    category: "Dashboard",
    importance: "high",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Mis Cursos",
    path: "/my-courses",
    description: "Lista de cursos inscritos",
    status: "active",
    category: "Cursos",
    importance: "high",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2074&auto=format&fit=crop"
  },
  {
    title: "Aprendizaje",
    path: "/courses/:id/learn",
    description: "Interfaz de aprendizaje",
    status: "active",
    category: "Cursos",
    importance: "high",
    image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=2088&auto=format&fit=crop"
  },
  {
    title: "Lección",
    path: "/courses/:id/learn/:lessonId",
    description: "Vista de lección específica",
    status: "active",
    category: "Cursos",
    importance: "high",
    image: "https://images.unsplash.com/photo-1485546784815-e380f3297414?q=80&w=2069&auto=format&fit=crop"
  },
  {
    title: "Notas",
    path: "/courses/:id/notes",
    description: "Notas del estudiante",
    status: "development",
    category: "Cursos",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop"
  },
  
  // Páginas de Instructor
  {
    title: "Dashboard Instructor",
    path: "/instructor/dashboard",
    description: "Panel principal del instructor",
    status: "development",
    category: "Dashboard",
    importance: "high",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Mis Cursos (Instructor)",
    path: "/instructor/courses",
    description: "Gestión de cursos",
    status: "development",
    category: "Cursos",
    importance: "high",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop"
  },
  {
    title: "Crear Curso",
    path: "/instructor/courses/create",
    description: "Creación de nuevo curso",
    status: "development",
    category: "Cursos",
    importance: "high",
    image: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?q=80&w=2074&auto=format&fit=crop"
  },
  
  // Páginas de Administración
  {
    title: "Dashboard Admin",
    path: "/admin/dashboard",
    description: "Panel administrativo",
    status: "active",
    category: "Dashboard",
    importance: "high",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Usuarios",
    path: "/admin/users",
    description: "Gestión de usuarios",
    status: "development",
    category: "Usuarios",
    importance: "high",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop"
  },
  {
    title: "Roles",
    path: "/admin/roles",
    description: "Gestión de roles y permisos",
    status: "development",
    category: "Seguridad",
    importance: "high",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Cursos (Admin)",
    path: "/admin/courses",
    description: "Administración de cursos",
    status: "duplicate",
    category: "Cursos",
    importance: "high",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Categorías",
    path: "/admin/categories",
    description: "Gestión de categorías",
    status: "development",
    category: "Contenido",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Analíticas",
    path: "/admin/analytics",
    description: "Analíticas del sistema",
    status: "development",
    category: "Reportes",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Contenido",
    path: "/admin/content",
    description: "Gestión de contenido",
    status: "development",
    category: "Contenido",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1558655146-605d86ed13b6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Páginas",
    path: "/admin/pages",
    description: "Gestión de páginas",
    status: "development",
    category: "Contenido",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=2073&auto=format&fit=crop"
  },
  {
    title: "Configuración",
    path: "/admin/settings",
    description: "Configuración del sistema",
    status: "active",
    category: "Sistema",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=2080&auto=format&fit=crop"
  },
  {
    title: "Funcionalidades",
    path: "/admin/settings/features",
    description: "Gestión de características",
    status: "development",
    category: "Sistema",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Integraciones",
    path: "/admin/settings/integrations",
    description: "Gestión de integraciones",
    status: "development",
    category: "Sistema",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1490971128424-a756e7eb20a3?q=80&w=2013&auto=format&fit=crop"
  },
  {
    title: "Datos",
    path: "/admin/settings/data",
    description: "Gestión de datos",
    status: "development",
    category: "Sistema",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1503252947848-7338d3f92f31?q=80&w=2031&auto=format&fit=crop"
  },
  {
    title: "Diseño",
    path: "/admin/settings/design",
    description: "Sistema de diseño",
    status: "development",
    category: "Diseño",
    importance: "medium",
    image: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Roles y Permisos",
    path: "/admin/settings/roles",
    description: "Gestión de roles y permisos",
    status: "active",
    category: "Seguridad",
    importance: "high",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop"
  },
  // Añade aquí más páginas según la documentación
];

// Get all unique categories
const allCategories = [...new Set(systemPages.map(page => page.category))];

export const SystemPagesNavigation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Filter pages based on search, category, and status
  const filteredPages = systemPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          page.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || page.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Group pages by category
  const pagesByCategory = allCategories.reduce<Record<string, PageData[]>>((acc, category) => {
    acc[category] = filteredPages.filter(page => page.category === category);
    return acc;
  }, {});

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Marketing': return <Home className="h-4 w-4" />;
      case 'Autenticación': return <Users className="h-4 w-4" />;
      case 'Cursos': return <GraduationCap className="h-4 w-4" />;
      case 'Dashboard': return <Monitor className="h-4 w-4" />;
      case 'Contenido': return <FileBadge className="h-4 w-4" />;
      case 'Sistema': return <Database className="h-4 w-4" />;
      case 'Reportes': return <BarChart4 className="h-4 w-4" />;
      default: return <Folder className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar páginas..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-[180px]">
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Todas las categorías</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="w-[180px]">
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">✅ Activas</option>
              <option value="development">🚧 En desarrollo</option>
              <option value="not-implemented">❌ No implementadas</option>
              <option value="duplicate">🔄 Duplicadas</option>
              <option value="deprecated">⚠️ Deprecadas</option>
            </select>
          </div>
          <Button variant="outline" size="icon" title="Filtros adicionales">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {filteredPages.length} páginas encontradas
          </p>
          <TabsList>
            <TabsTrigger value="grid">Cuadrícula</TabsTrigger>
            <TabsTrigger value="categories">Por Categorías</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPages.map((page, index) => (
              <PageNavigationCard
                key={`${page.path}-${index}`}
                {...page}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <div className="space-y-8">
            {Object.entries(pagesByCategory)
              .filter(([_, pages]) => pages.length > 0)
              .map(([category, pages]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-4">
                    {getCategoryIcon(category)}
                    <h3 className="text-lg font-medium">{category}</h3>
                    <Badge variant="outline" className="ml-2">{pages.length}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pages.map((page, index) => (
                      <PageNavigationCard
                        key={`${category}-${page.path}-${index}`}
                        {...page}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
