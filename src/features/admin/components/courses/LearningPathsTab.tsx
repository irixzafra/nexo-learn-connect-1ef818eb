
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Plus, Search, Pencil, Trash2, Layout, Eye } from 'lucide-react';
import { LearningPath } from '@/types/course';

export function LearningPathsTab() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const { data: learningPaths, isLoading } = useQuery({
    queryKey: ['learningPaths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching learning paths:', error);
        throw error;
      }
      
      return data as LearningPath[];
    },
  });
  
  const filteredPaths = learningPaths?.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (path.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'published') return matchesSearch && path.is_published;
    if (filter === 'drafts') return matchesSearch && !path.is_published;
    
    return matchesSearch;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar rutas de aprendizaje..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={filter}
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="published">Publicados</SelectItem>
              <SelectItem value="drafts">Borradores</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={() => navigate('/admin/learning-paths/new')}
          className="shrink-0"
        >
          <Plus className="h-4 w-4 mr-1" />
          Nueva Ruta
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Rutas de Aprendizaje</CardTitle>
          <CardDescription>
            Gestiona las rutas de aprendizaje disponibles en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !filteredPaths?.length ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || filter !== 'all' ? (
                <p>No se encontraron rutas de aprendizaje con los criterios de búsqueda actuales.</p>
              ) : (
                <div className="space-y-2">
                  <p>No hay rutas de aprendizaje creadas todavía.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/admin/learning-paths/new')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Crear primera ruta
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Nivel</TableHead>
                    <TableHead>Duración est.</TableHead>
                    <TableHead>Fecha creación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPaths.map((path) => (
                    <TableRow key={path.id}>
                      <TableCell className="font-medium">
                        {path.title}
                      </TableCell>
                      <TableCell>
                        {path.is_published ? (
                          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                            Publicado
                          </Badge>
                        ) : (
                          <Badge variant="outline">Borrador</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {path.level ? (
                          <span className="capitalize">{path.level}</span>
                        ) : (
                          <span className="text-muted-foreground text-xs">No definido</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {path.estimated_hours ? (
                          `${path.estimated_hours} horas`
                        ) : (
                          <span className="text-muted-foreground text-xs">No definido</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(path.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" title="Previsualizar">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => navigate(`/admin/learning-paths/${path.id}/edit`)}
                            title="Editar"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => navigate(`/admin/learning-paths/${path.id}/structure`)}
                            title="Estructura"
                          >
                            <Layout className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
