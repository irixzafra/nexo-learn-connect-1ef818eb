
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, Calendar, ArrowRight, Medal, Users, Bookmark, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const MyCourses: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('in-progress');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mis Cursos</h1>
        <p className="text-muted-foreground">Administra tus cursos y continúa tu aprendizaje</p>
      </div>

      <Tabs defaultValue="in-progress" className="space-y-6" onValueChange={setActiveFilter}>
        <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:inline-flex">
          <TabsTrigger value="in-progress" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>En Progreso</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Completados</span>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Todos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <CourseInProgressCard 
                key={`progress-${idx}`}
                title={`Curso en Progreso ${idx + 1}`}
                progress={[32, 64, 54][idx]}
                lastActivity={2}
                completedModules={[3, 3, 3][idx]}
                totalModules={[8, 7, 11][idx]}
              />
            ))}
          </div>
          
          <CourseSuggestions />
          <UpcomingDeadlines />
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 2 }).map((_, idx) => (
              <CourseCompletedCard 
                key={`completed-${idx}`}
                title={`Curso Completado ${idx + 1}`}
                completionDate="1/4/2025"
                grade={10}
                completedModules={[6, 8][idx]}
                totalModules={[7, 6][idx]}
              />
            ))}
          </div>
          
          <CertificatesSection />
          <NextLevelCourses />
        </TabsContent>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              idx < 3 ? (
                <CourseInProgressCard 
                  key={`all-progress-${idx}`}
                  title={`Curso ${idx + 1}`}
                  progress={[30, 13, 45][idx]}
                  lastActivity={2}
                  completedModules={idx + 1}
                  totalModules={idx + 5}
                />
              ) : (
                <CourseCompletedCard 
                  key={`all-completed-${idx}`}
                  title={`Curso ${idx + 1}`}
                  completionDate="1/4/2025"
                  grade={9}
                  completedModules={idx + 2}
                  totalModules={idx + 3}
                  minimal
                />
              )
            ))}
          </div>
          
          <StudyAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Course Card Components with fixed heights
interface CourseInProgressCardProps {
  title: string;
  progress: number;
  lastActivity: number;
  completedModules: number;
  totalModules: number;
}

const CourseInProgressCard: React.FC<CourseInProgressCardProps> = ({
  title,
  progress,
  lastActivity,
  completedModules,
  totalModules
}) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">{title}</CardTitle>
        <CardDescription className="text-base">Progreso: {progress}%</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between pb-2">
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-auto">
          <div className="text-sm text-muted-foreground flex justify-between items-center">
            <span>Última actividad: hace {lastActivity} días</span>
            <span className="font-medium">{completedModules}/{totalModules} módulos</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/student/courses/course-${title.split(' ').pop()}`}>
            <Bookmark className="h-4 w-4 mr-2" />
            Guardar
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/student/courses/course-${title.split(' ').pop()}`}>
            Continuar
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface CourseCompletedCardProps {
  title: string;
  completionDate: string;
  grade: number;
  completedModules: number;
  totalModules: number;
  minimal?: boolean;
}

const CourseCompletedCard: React.FC<CourseCompletedCardProps> = ({
  title,
  completionDate,
  grade,
  completedModules,
  totalModules,
  minimal = false
}) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">{title}</CardTitle>
        <CardDescription className="text-base">Completado el {completionDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between pb-2">
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
          <div className="h-full bg-green-500 w-full"></div>
        </div>
        <div className="mt-auto">
          <div className="text-sm flex justify-between items-center">
            <span className="text-muted-foreground">Calificación: {grade}/10</span>
            <span className="font-medium">{completedModules}/{totalModules} módulos</span>
          </div>
        </div>
      </CardContent>
      {!minimal && (
        <CardFooter className="pt-2 border-t flex justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/certificates/course-${title.split(' ').pop()}`}>
              <Medal className="h-4 w-4 mr-2" />
              Certificado
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/student/courses/course-${title.split(' ').pop()}`}>
              Ver curso
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      )}
      {minimal && (
        <CardFooter className="pt-2 border-t">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to={`/student/courses/course-${title.split(' ').pop()}`}>
              Ver detalles
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

// Additional sections for the Courses page
const CourseSuggestions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Cursos Recomendados</CardTitle>
        <CardDescription>Basado en tu progreso y preferencias</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/40 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 h-12 w-12 rounded-md flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Diseño UX/UI Avanzado</p>
              <p className="text-sm text-muted-foreground">90% de coincidencia con tu perfil</p>
            </div>
          </div>
          <Badge variant="secondary">Popular</Badge>
        </div>
        <div className="bg-muted/40 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 h-12 w-12 rounded-md flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">React Native para Desarrolladores</p>
              <p className="text-sm text-muted-foreground">85% de coincidencia con tu perfil</p>
            </div>
          </div>
          <Badge variant="secondary">Nuevo</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link to="/recommendations">
            Ver más recomendaciones
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const UpcomingDeadlines: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Próximas Fechas Límite</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/40 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 h-12 w-12 rounded-md flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="font-medium">Entrega Proyecto Final</p>
              <p className="text-sm text-muted-foreground">Curso en Progreso 1 • Faltan 3 días</p>
            </div>
          </div>
          <Badge variant="destructive">Urgente</Badge>
        </div>
        <div className="bg-muted/40 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 h-12 w-12 rounded-md flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">Quiz Módulo 5</p>
              <p className="text-sm text-muted-foreground">Curso en Progreso 2 • Faltan 7 días</p>
            </div>
          </div>
          <Badge>Próximo</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link to="/calendar">
            Ver calendario completo
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const CertificatesSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tus Certificados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/40 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/10 h-12 w-12 rounded-md flex items-center justify-center">
              <Medal className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="font-medium">Curso Completado 1</p>
              <p className="text-sm text-muted-foreground">Emitido el 1/4/2025</p>
            </div>
          </div>
          <Button size="sm" variant="outline">Descargar</Button>
        </div>
        <div className="bg-muted/40 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/10 h-12 w-12 rounded-md flex items-center justify-center">
              <Medal className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="font-medium">Curso Completado 2</p>
              <p className="text-sm text-muted-foreground">Emitido el 1/4/2025</p>
            </div>
          </div>
          <Button size="sm" variant="outline">Descargar</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link to="/certificates">
            Ver todos los certificados
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const NextLevelCourses: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Siguiente Nivel</CardTitle>
        <CardDescription>Cursos avanzados relacionados con tu aprendizaje</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/40 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/10 h-12 w-12 rounded-md flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="font-medium">Curso Avanzado - Nivel Master</p>
              <p className="text-sm text-muted-foreground">Continuación de Curso Completado 1</p>
            </div>
          </div>
          <Button size="sm" variant="outline">Ver</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link to="/recommendations">
            Ver más cursos avanzados
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const StudyAnalytics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Estadísticas de Estudio</CardTitle>
        <CardDescription>Resumen de tu actividad esta semana</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/40 rounded-md p-4 text-center">
            <p className="text-3xl font-bold text-primary">12h</p>
            <p className="text-sm text-muted-foreground">Tiempo de estudio</p>
          </div>
          <div className="bg-muted/40 rounded-md p-4 text-center">
            <p className="text-3xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Lecciones completadas</p>
          </div>
          <div className="bg-muted/40 rounded-md p-4 text-center">
            <p className="text-3xl font-bold text-primary">85%</p>
            <p className="text-sm text-muted-foreground">Promedio de quiz</p>
          </div>
        </div>
        <div className="p-3 border rounded-md">
          <p className="text-center text-sm text-muted-foreground">
            Estadísticas detalladas disponibles en la sección de Analíticas
            <span className="text-primary font-medium block mt-1">En desarrollo</span>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link to="/analytics/personal">
            Ver analíticas completas
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyCourses;
