
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  FileText, 
  Settings, 
  ArrowUpDown,
  Globe,
  Layout
} from 'lucide-react';

// Define the Page type
type PageStatus = 'published' | 'draft' | 'archived';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: PageStatus;
  lastModified: string;
  author: string;
  type: 'system' | 'custom';
}

// Mock data for the pages
const mockPages: Page[] = [
  {
    id: '1',
    title: 'Inicio',
    slug: 'home',
    status: 'published',
    lastModified: '2023-05-15',
    author: 'Sistema',
    type: 'system'
  },
  {
    id: '2',
    title: 'Sobre Nosotros',
    slug: 'about',
    status: 'published',
    lastModified: '2023-04-10',
    author: 'Admin',
    type: 'system'
  },
  {
    id: '3',
    title: 'Contacto',
    slug: 'contact',
    status: 'published',
    lastModified: '2023-03-22',
    author: 'Admin',
    type: 'system'
  },
  {
    id: '4',
    title: 'Términos y Condiciones',
    slug: 'terms',
    status: 'published',
    lastModified: '2023-02-18',
    author: 'Legal',
    type: 'system'
  },
  {
    id: '5',
    title: 'Política de Privacidad',
    slug: 'privacy',
    status: 'published',
    lastModified: '2023-02-18',
    author: 'Legal',
    type: 'system'
  }
];

// Mock data for landing page sections
interface LandingSection {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  order: number;
}

const mockLandingSections: LandingSection[] = [
  { id: '1', name: 'Hero Banner', type: 'hero', isActive: true, order: 1 },
  { id: '2', name: 'Características', type: 'features', isActive: true, order: 2 },
  { id: '3', name: 'Testimonios', type: 'testimonials', isActive: true, order: 3 },
  { id: '4', name: 'Precios', type: 'pricing', isActive: false, order: 4 },
  { id: '5', name: 'Preguntas Frecuentes', type: 'faq', isActive: true, order: 5 },
  { id: '6', name: 'Contacto', type: 'contact', isActive: true, order: 6 }
];

const SystemPagesManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('pages');
  
  // Filter pages based on search query and status filter
  const filteredPages = mockPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Define columns for the pages table
  const pageColumns = [
    {
      accessorKey: 'title',
      header: 'Título',
      cell: ({ row }: { row: any }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          <div className="text-xs text-muted-foreground">{row.original.slug}</div>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }: { row: any }) => {
        const status = row.original.status;
        let variant: 'default' | 'secondary' | 'outline' = 'default';
        
        if (status === 'draft') variant = 'secondary';
        if (status === 'archived') variant = 'outline';
        
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: 'type',
      header: 'Tipo',
      cell: ({ row }: { row: any }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: 'lastModified',
      header: ({ column }: { column: any }) => (
        <div className="flex items-center space-x-1">
          <span>Modificado</span>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-1"
          >
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>
      ),
      cell: ({ row }: { row: any }) => row.original.lastModified,
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" disabled={row.original.type === 'system'}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
  
  // Define columns for the landing sections table
  const landingSectionColumns = [
    {
      accessorKey: 'name',
      header: 'Sección',
      cell: ({ row }: { row: any }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">{row.original.type}</div>
        </div>
      ),
    },
    {
      accessorKey: 'isActive',
      header: 'Estado',
      cell: ({ row }: { row: any }) => (
        <Badge variant={row.original.isActive ? 'default' : 'outline'}>
          {row.original.isActive ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },
    {
      accessorKey: 'order',
      header: ({ column }: { column: any }) => (
        <div className="flex items-center space-x-1">
          <span>Orden</span>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-1"
          >
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>
      ),
      cell: ({ row }: { row: any }) => row.original.order,
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant={row.original.isActive ? "outline" : "default"}
            size="sm"
          >
            {row.original.isActive ? 'Desactivar' : 'Activar'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container px-4 py-6 mx-auto">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Páginas del Sistema</h1>
        <p className="text-muted-foreground">
          Administre las páginas del sistema y la configuración de la página de inicio
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Páginas</span>
            </TabsTrigger>
            <TabsTrigger value="landing" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <span>Landing</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Configuración</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Pages Tab */}
          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Páginas del Sistema</CardTitle>
                <CardDescription>
                  Vea y administre todas las páginas del sistema y contenido estático.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar páginas..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="archived">Archivado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Nueva Página</span>
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {pageColumns.map((column) => (
                          <TableHead key={column.accessorKey}>
                            {typeof column.header === 'function'
                              ? column.header({ column })
                              : column.header}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPages.length > 0 ? (
                        filteredPages.map((page) => (
                          <TableRow key={page.id}>
                            {pageColumns.map((column) => (
                              <TableCell key={column.accessorKey}>
                                {column.cell({ row: { original: page } })}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={pageColumns.length} className="h-24 text-center">
                            No se encontraron páginas.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Landing Tab */}
          <TabsContent value="landing">
            <Card>
              <CardHeader>
                <CardTitle>Página de Inicio</CardTitle>
                <CardDescription>
                  Configure las secciones y el contenido de la página de inicio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg font-medium">Vista previa del sitio:</span>
                    <a href="/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      Abrir en nueva pestaña
                    </a>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Sección
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {landingSectionColumns.map((column) => (
                          <TableHead key={column.accessorKey}>
                            {typeof column.header === 'function'
                              ? column.header({ column })
                              : column.header}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLandingSections.map((section) => (
                        <TableRow key={section.id}>
                          {landingSectionColumns.map((column) => (
                            <TableCell key={column.accessorKey}>
                              {column.cell({ row: { original: section } })}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Páginas</CardTitle>
                <CardDescription>
                  Configure ajustes globales para todas las páginas del sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <div className="font-medium">Página de inicio predeterminada</div>
                    <Select defaultValue="home">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar página" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Página de inicio</SelectItem>
                        <SelectItem value="landing">Landing Page</SelectItem>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Página que se mostrará a los usuarios al acceder a la URL principal.
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="font-medium">Redireccionamiento 404</div>
                    <Select defaultValue="notfound">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar página" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notfound">Página 404 personalizada</SelectItem>
                        <SelectItem value="home">Redireccionar a inicio</SelectItem>
                        <SelectItem value="contact">Redireccionar a contacto</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Comportamiento cuando un usuario accede a una URL inexistente.
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="font-medium">Caché de páginas</div>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue placeholder="Estado de caché" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Habilitado</SelectItem>
                        <SelectItem value="disabled">Deshabilitado</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Habilitar el caché de páginas mejora el rendimiento pero puede retrasar la visualización de cambios.
                    </p>
                  </div>
                  
                  <Button className="w-full md:w-auto">Guardar configuración</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemPagesManagement;
