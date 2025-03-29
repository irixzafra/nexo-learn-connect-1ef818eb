
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, BookOpen, FilterIcon } from 'lucide-react';
import { featuredCourses } from '@/features/courses/utils/featuredCoursesData';

const CoursesCatalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("todos");
  
  // Simular un error para mostrar la UI de error que aparece en la imagen
  const [hasError, setHasError] = useState(true);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-2">Catálogo de Cursos</h1>
        <p className="text-muted-foreground mb-8">
          Explora nuestros cursos y comienza a aprender hoy mismo
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Input
              placeholder="Buscar cursos..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Filtros:</span>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Seleccionar nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Nivel</SelectItem>
                <SelectItem value="principiante">Principiante</SelectItem>
                <SelectItem value="intermedio">Intermedio</SelectItem>
                <SelectItem value="avanzado">Avanzado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {hasError ? (
          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error al cargar los cursos</AlertTitle>
            <AlertDescription>
              Error de recursión en políticas RLS. Por favor, contacte al administrador.
            </AlertDescription>
            
            <div className="mt-6 text-sm">
              <h3 className="font-medium mb-2">Información de depuración:</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 my-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-700 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Detectado error de recursión RLS</p>
                    <p className="text-yellow-800">Revisar las políticas RLS de la tabla courses y la función get_user_role</p>
                  </div>
                </div>
              </div>
              
              <h3 className="font-medium my-2">Sugerencias de verificación:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Verificar que las políticas RLS estén correctamente configuradas</li>
                <li>Comprobar permisos de acceso para usuarios anónimos</li>
                <li>Revisar estructura de la tabla courses</li>
                <li>Verificar que existan cursos publicados en la base de datos</li>
                <li>Revisar que no haya recursión en las políticas RLS</li>
              </ul>
              
              <div className="bg-gray-100 rounded p-3 mt-4 font-mono text-xs overflow-auto">
                {JSON.stringify({ "errorType": "rls recursion" }, null, 2)}
              </div>
            </div>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video w-full bg-gray-100 relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                      {course.category}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {course.hours} horas
                      </span>
                    </div>
                    <Button size="sm">Ver curso</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CoursesCatalog;
