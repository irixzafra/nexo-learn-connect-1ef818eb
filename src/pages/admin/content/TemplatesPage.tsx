
import React from 'react';
import { Layers, Plus, Search, FileText, Copy, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Datos de ejemplo para las plantillas
const templateExamples = [
  {
    id: '1',
    name: 'Plantilla de Curso Básico',
    type: 'course',
    category: 'educación',
    createdAt: '2025-02-12',
    updatedAt: '2025-03-15',
  },
  {
    id: '2',
    name: 'Plantilla de Landing Page',
    type: 'landing',
    category: 'marketing',
    createdAt: '2025-01-05',
    updatedAt: '2025-03-20',
  },
  {
    id: '3',
    name: 'Plantilla de Email Marketing',
    type: 'email',
    category: 'marketing',
    createdAt: '2025-03-01',
    updatedAt: '2025-03-10',
  },
  {
    id: '4',
    name: 'Plantilla de Documentación',
    type: 'documentation',
    category: 'soporte',
    createdAt: '2025-02-28',
    updatedAt: '2025-03-22',
  },
  {
    id: '5',
    name: 'Plantilla de Evaluación',
    type: 'assessment',
    category: 'educación',
    createdAt: '2025-01-15',
    updatedAt: '2025-02-28',
  },
];

// Componente para la visualización en modo tarjetas
const TemplateCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templateExamples.map((template) => (
        <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-3 bg-primary/5">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>Tipo: {template.type}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" /> Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" /> Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-sm text-muted-foreground">
              <p>Categoría: {template.category}</p>
              <p>Actualizado: {new Date(template.updatedAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/10 px-6 py-3">
            <Button variant="outline" size="sm" className="w-full">
              Usar plantilla
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {/* Tarjeta para crear nueva plantilla */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="overflow-hidden border-dashed hover:border-primary hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center min-h-[200px]">
            <CardContent className="flex flex-col items-center justify-center h-full py-8">
              <Plus className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground font-medium">Crear nueva plantilla</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nueva plantilla</DialogTitle>
            <DialogDescription>
              Rellena los detalles para crear una nueva plantilla personalizada.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre de la plantilla</label>
              <Input placeholder="Ingresa un nombre descriptivo..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de plantilla</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course">Curso</SelectItem>
                  <SelectItem value="landing">Landing Page</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="documentation">Documentación</SelectItem>
                  <SelectItem value="assessment">Evaluación</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoría</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="educación">Educación</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="soporte">Soporte</SelectItem>
                  <SelectItem value="ventas">Ventas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancelar</Button>
            <Button>Crear plantilla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Componente para la visualización en modo tabla
const TemplatesTable = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Actualización</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templateExamples.map((template) => (
            <TableRow key={template.id}>
              <TableCell className="font-medium">{template.name}</TableCell>
              <TableCell>{template.type}</TableCell>
              <TableCell>{template.category}</TableCell>
              <TableCell>{new Date(template.updatedAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" /> Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Componente principal de la página de plantillas
const TemplatesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Plantillas de Contenido</h1>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nueva Plantilla
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar plantillas..." className="pl-8" />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="course">Cursos</SelectItem>
              <SelectItem value="landing">Landing Pages</SelectItem>
              <SelectItem value="email">Emails</SelectItem>
              <SelectItem value="documentation">Documentación</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="educación">Educación</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="soporte">Soporte</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-end mb-4">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid-2x2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/></svg>
              Tarjetas
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
              Tabla
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid" className="mt-0">
          <TemplateCards />
        </TabsContent>
        
        <TabsContent value="table" className="mt-0">
          <TemplatesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplatesPage;
