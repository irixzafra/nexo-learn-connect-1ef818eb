
import React, { useState, useEffect } from 'react';
import { Grid, LayoutList, Search, Filter, X, Database, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageNavigationCard, PageStatus } from '@/features/admin/components/settings/PageNavigationCard';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';

interface PageFilter {
  status?: PageStatus;
  category?: string;
  searchTerm?: string;
}

const initialPages = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    description: 'Página principal con resumen de actividad',
    status: 'active',
    category: 'General',
    importance: 'high'
  },
  {
    title: 'Cursos',
    path: '/courses',
    description: 'Listado de cursos disponibles',
    status: 'active',
    category: 'Learning',
    importance: 'high'
  },
  {
    title: 'Mi Curso',
    path: '/my-courses',
    description: 'Cursos en los que el usuario está inscrito',
    status: 'active',
    category: 'Learning',
    importance: 'high'
  },
  {
    title: 'Comunidad',
    path: '/community',
    description: 'Foros y grupos de discusión',
    status: 'active',
    category: 'Community'
  },
  {
    title: 'Mensajes',
    path: '/messages',
    description: 'Sistema de mensajería interna',
    status: 'active',
    category: 'Community'
  },
  {
    title: 'Calendario',
    path: '/calendar',
    description: 'Calendario personal del usuario',
    status: 'active',
    category: 'General'
  },
  {
    title: 'Pagos',
    path: '/billing',
    description: 'Información de facturación y pagos',
    status: 'active',
    category: 'General'
  },
  {
    title: 'Configuración',
    path: '/settings',
    description: 'Opciones de configuración del usuario',
    status: 'active',
    category: 'General'
  },
  {
    title: 'Admin Dashboard',
    path: '/admin/dashboard',
    description: 'Panel de administración del sistema',
    status: 'active',
    category: 'Admin',
    importance: 'high'
  },
  {
    title: 'Gestión de Cursos',
    path: '/admin/courses',
    description: 'Administración de cursos y categorías',
    status: 'development',
    category: 'Admin'
  },
  {
    title: 'Gestión de Usuarios',
    path: '/admin/users',
    description: 'Administración de usuarios y roles',
    status: 'development',
    category: 'Admin'
  },
  {
    title: 'Gestión de Páginas',
    path: '/admin/pages',
    description: 'Administración de páginas del sistema',
    status: 'development',
    category: 'Admin'
  },
  {
    title: 'Ajustes del Sistema',
    path: '/admin/settings',
    description: 'Configuración general del sistema',
    status: 'development',
    category: 'Admin'
  },
  {
    title: 'Panel de Instructor',
    path: '/instructor/dashboard',
    description: 'Panel para instructores',
    status: 'active',
    category: 'Instructor',
    importance: 'high'
  },
  {
    title: 'Mis Cursos (Instructor)',
    path: '/instructor/courses',
    description: 'Cursos gestionados por el instructor',
    status: 'active',
    category: 'Instructor'
  },
  {
    title: 'Mensajes (Instructor)',
    path: '/instructor/messages',
    description: 'Mensajes del instructor',
    status: 'active',
    category: 'Instructor'
  },
  {
    title: 'Crear Curso',
    path: '/instructor/courses/create',
    description: 'Formulario para crear un nuevo curso',
    status: 'not-implemented',
    category: 'Instructor'
  },
  {
    title: 'Editar Curso',
    path: '/instructor/courses/:courseId/edit',
    description: 'Formulario para editar un curso existente',
    status: 'not-implemented',
    category: 'Instructor'
  },
  {
    title: 'Lecciones',
    path: '/instructor/courses/:courseId/lessons',
    description: 'Gestión de lecciones del curso',
    status: 'not-implemented',
    category: 'Instructor'
  },
  {
    title: 'Estudiantes',
    path: '/instructor/courses/:courseId/students',
    description: 'Listado de estudiantes inscritos en el curso',
    status: 'not-implemented',
    category: 'Instructor'
  },
  {
    title: 'Vista Diseño (En construcción)',
    path: '/admin/pages/design-view',
    description: 'Vista de diseño de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Mapa (En construcción)',
    path: '/admin/pages/map-view',
    description: 'Vista de mapa de navegación (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Lista (En construcción)',
    path: '/admin/pages/list-view',
    description: 'Vista de lista de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Tabla (En construcción)',
    path: '/admin/pages/table-view',
    description: 'Vista de tabla de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Arbol (En construcción)',
    path: '/admin/pages/tree-view',
    description: 'Vista de árbol de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Diagrama (En construcción)',
    path: '/admin/pages/diagram-view',
    description: 'Vista de diagrama de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Jerárquica (En construcción)',
    path: '/admin/pages/hierarchy-view',
    description: 'Vista jerárquica de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Organigrama (En construcción)',
    path: '/admin/pages/orgchart-view',
    description: 'Vista de organigrama de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Grafo (En construcción)',
    path: '/admin/pages/graph-view',
    description: 'Vista de grafo de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Red (En construcción)',
    path: '/admin/pages/network-view',
    description: 'Vista de red de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Radial (En construcción)',
    path: '/admin/pages/radial-view',
    description: 'Vista radial de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Circular (En construcción)',
    path: '/admin/pages/circular-view',
    description: 'Vista circular de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Anillo (En construcción)',
    path: '/admin/pages/ring-view',
    description: 'Vista de anillo de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Espiral (En construcción)',
    path: '/admin/pages/spiral-view',
    description: 'Vista espiral de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Timeline (En construcción)',
    path: '/admin/pages/timeline-view',
    description: 'Vista de línea de tiempo de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Gantt (En construcción)',
    path: '/admin/pages/gantt-view',
    description: 'Vista de Gantt de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Kanban (En construcción)',
    path: '/admin/pages/kanban-view',
    description: 'Vista de Kanban de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Tablero (En construcción)',
    path: '/admin/pages/dashboard-view',
    description: 'Vista de tablero de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Matriz (En construcción)',
    path: '/admin/pages/matrix-view',
    description: 'Vista de matriz de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Mapa Mental (En construcción)',
    path: '/admin/pages/mindmap-view',
    description: 'Vista de mapa mental de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Flujo (En construcción)',
    path: '/admin/pages/flow-view',
    description: 'Vista de flujo de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Secuencia (En construcción)',
    path: '/admin/pages/sequence-view',
    description: 'Vista de secuencia de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Proceso (En construcción)',
    path: '/admin/pages/process-view',
    description: 'Vista de proceso de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Embudo (En construcción)',
    path: '/admin/pages/funnel-view',
    description: 'Vista de embudo de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Pirámide (En construcción)',
    path: '/admin/pages/pyramid-view',
    description: 'Vista de pirámide de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Iceberg (En construcción)',
    path: '/admin/pages/iceberg-view',
    description: 'Vista de iceberg de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Diagrama de Venn (En construcción)',
    path: '/admin/pages/venn-view',
    description: 'Vista de diagrama de Venn de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Mapa de Calor (En construcción)',
    path: '/admin/pages/heatmap-view',
    description: 'Vista de mapa de calor de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Treemap (En construcción)',
    path: '/admin/pages/treemap-view',
    description: 'Vista de treemap de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Sunburst (En construcción)',
    path: '/admin/pages/sunburst-view',
    description: 'Vista de sunburst de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Icicle (En construcción)',
    path: '/admin/pages/icicle-view',
    description: 'Vista de icicle de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Voronoi (En construcción)',
    path: '/admin/pages/voronoi-view',
    description: 'Vista de Voronoi de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Marimekko (En construcción)',
    path: '/admin/pages/marimekko-view',
    description: 'Vista de Marimekko de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Sankey (En construcción)',
    path: '/admin/pages/sankey-view',
    description: 'Vista de Sankey de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Chord (En construcción)',
    path: '/admin/pages/chord-view',
    description: 'Vista de Chord de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Network3D (En construcción)',
    path: '/admin/pages/network3d-view',
    description: 'Vista de red 3D de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Globo (En construcción)',
    path: '/admin/pages/globe-view',
    description: 'Vista de globo de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Mapa 3D (En construcción)',
    path: '/admin/pages/map3d-view',
    description: 'Vista de mapa 3D de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Realidad Aumentada (En construcción)',
    path: '/admin/pages/ar-view',
    description: 'Vista de realidad aumentada de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Realidad Virtual (En construcción)',
    path: '/admin/pages/vr-view',
    description: 'Vista de realidad virtual de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Holográfica (En construcción)',
    path: '/admin/pages/holographic-view',
    description: 'Vista holográfica de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Interactiva (En construcción)',
    path: '/admin/pages/interactive-view',
    description: 'Vista interactiva de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Dinámica (En construcción)',
    path: '/admin/pages/dynamic-view',
    description: 'Vista dinámica de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Adaptativa (En construcción)',
    path: '/admin/pages/adaptive-view',
    description: 'Vista adaptativa de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Personalizable (En construcción)',
    path: '/admin/pages/customizable-view',
    description: 'Vista personalizable de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Inteligente (En construcción)',
    path: '/admin/pages/intelligent-view',
    description: 'Vista inteligente de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Predictiva (En construcción)',
    path: '/admin/pages/predictive-view',
    description: 'Vista predictiva de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Colaborativa (En construcción)',
    path: '/admin/pages/collaborative-view',
    description: 'Vista colaborativa de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Social (En construcción)',
    path: '/admin/pages/social-view',
    description: 'Vista social de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Gamificada (En construcción)',
    path: '/admin/pages/gamified-view',
    description: 'Vista gamificada de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Inmersiva (En construcción)',
    path: '/admin/pages/immersive-view',
    description: 'Vista inmersiva de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Sensorial (En construcción)',
    path: '/admin/pages/sensory-view',
    description: 'Vista sensorial de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Emocional (En construcción)',
    path: '/admin/pages/emotional-view',
    description: 'Vista emocional de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Espiritual (En construcción)',
    path: '/admin/pages/spiritual-view',
    description: 'Vista espiritual de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Trascendental (En construcción)',
    path: '/admin/pages/transcendental-view',
    description: 'Vista trascendental de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Cósmica (En construcción)',
    path: '/admin/pages/cosmic-view',
    description: 'Vista cósmica de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  },
  {
    title: 'Vista Universal (En construcción)',
    path: '/admin/pages/universal-view',
    description: 'Vista universal de páginas (en construcción)',
    status: 'not-implemented',
    category: 'Admin'
  }
];

export const SystemPagesNavigation: React.FC = () => {
  const [pages, setPages] = useState(initialPages);
  const [filter, setFilter] = useState<PageFilter>({});
  const [isGridView, setIsGridView] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    applyFilters();
  }, [filter]);

  const handleSearch = (term: string) => {
    setFilter(prev => ({ ...prev, searchTerm: term }));
  };

  const handleStatusFilter = (status?: PageStatus) => {
    setFilter(prev => ({ ...prev, status: status }));
  };

  const handleCategoryFilter = (category?: string) => {
    setFilter(prev => ({ ...prev, category: category }));
  };

  const clearFilters = () => {
    setFilter({});
  };

  const applyFilters = () => {
    let filteredPages = initialPages;

    if (filter.searchTerm) {
      filteredPages = filteredPages.filter(page =>
        page.title.toLowerCase().includes(filter.searchTerm!.toLowerCase()) ||
        (page.description && page.description.toLowerCase().includes(filter.searchTerm!.toLowerCase()))
      );
    }

    if (filter.status) {
      filteredPages = filteredPages.filter(page => page.status === filter.status);
    }

    if (filter.category) {
      filteredPages = filteredPages.filter(page => page.category === filter.category);
    }

    setPages(filteredPages);
  };

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(prev => prev.filter(c => c !== category));
    } else {
      setExpandedCategories(prev => [...prev, category]);
    }
  };

  const getUniqueCategories = () => {
    return [...new Set(initialPages.map(page => page.category))];
  };

  const renderFilters = () => (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <p className="text-sm font-medium">Filtros</p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-3 w-3 mr-2" />
          Limpiar
        </Button>
      </CardHeader>
      <CardContent className="pl-2">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="status">
            <AccordionTrigger>Estado</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Button variant="outline" size="sm" onClick={() => handleStatusFilter(undefined)} className={filter.status === undefined ? "bg-accent" : ""}>Todos</Button>
                <Button variant="outline" size="sm" onClick={() => handleStatusFilter('active')} className={filter.status === 'active' ? "bg-accent" : ""}>Activo</Button>
                <Button variant="outline" size="sm" onClick={() => handleStatusFilter('development')} className={filter.status === 'development' ? "bg-accent" : ""}>En Desarrollo</Button>
                <Button variant="outline" size="sm" onClick={() => handleStatusFilter('not-implemented')} className={filter.status === 'not-implemented' ? "bg-accent" : ""}>No Implementado</Button>
                <Button variant="outline" size="sm" onClick={() => handleStatusFilter('duplicate')} className={filter.status === 'duplicate' ? "bg-accent" : ""}>Duplicado</Button>
                <Button variant="outline" size="sm" onClick={() => handleStatusFilter('deprecated')} className={filter.status === 'deprecated' ? "bg-accent" : ""}>Deprecado</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="category">
            <AccordionTrigger>Categoría</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Button variant="outline" size="sm" onClick={() => handleCategoryFilter(undefined)} className={filter.category === undefined ? "bg-accent" : ""}>Todas</Button>
                {getUniqueCategories().map(category => (
                  <Button key={category} variant="outline" size="sm" onClick={() => handleCategoryFilter(category)} className={filter.category === category ? "bg-accent" : ""}>{category}</Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );

  const renderPages = () => (
    <div className={isGridView ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
      {pages.map(page => (
        <PageNavigationCard key={page.path} {...page} />
      ))}
    </div>
  );

  const renderList = () => (
    <div className="space-y-3">
      {getUniqueCategories().map(category => (
        <Accordion key={category} type="single" collapsible>
          <AccordionItem value={category}>
            <AccordionTrigger onClick={() => toggleCategory(category)} className="text-left">
              <div className="flex items-center justify-between w-full">
                {category}
                <Badge variant="secondary">{pages.filter(page => page.category === category).length}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {pages.filter(page => page.category === category).map(page => (
                  <PageNavigationCard key={page.path} {...page} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Buscar página..." className="max-w-sm" onChange={(e) => handleSearch(e.target.value)} />
          </div>
          <ToggleGroup type="single" defaultValue={isGridView ? "grid" : "list"} onValueChange={(value) => setIsGridView(value === "grid")}>
            <ToggleGroupItem value="grid" aria-label="Grid">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List">
              <LayoutList className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[200px_1fr]">
          <div className="hidden md:block">{renderFilters()}</div>
          <div>
            {isGridView ? renderPages() : renderList()}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Info className="h-4 w-4 mr-2" />
          Total: {pages.length} páginas
        </CardFooter>
      </Card>
    </div>
  );
};
