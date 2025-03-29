import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCourseDetails } from '@/features/courses/hooks/useCourseDetails';
import AppLayout from '@/layouts/AppLayout';
import { useOfflineCourses } from '@/features/courses/hooks/useOfflineCourses';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { course, isLoading } = useCourseDetails(id);
  const { markCourseAsViewed } = useOfflineCourses();
  
  // Cuando se carga el curso, guardarlo para acceso offline
  useEffect(() => {
    if (course) {
      markCourseAsViewed(course);
    }
  }, [course]);

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{course?.title || 'Cargando curso...'}</h1>
          <p className="text-muted-foreground">{course?.description || 'Cargando descripción...'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Course content */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Acerca de este curso</h2>
                <p>{course?.description}</p>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Lo que aprenderás</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Dominar los fundamentos de la programación</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Crear aplicaciones web interactivas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Implementar bases de datos y APIs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Desplegar aplicaciones en la nube</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Contenido del curso</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Módulo 1: Introducción</h3>
                    <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>• Bienvenida al curso</li>
                      <li>• Configuración del entorno</li>
                      <li>• Primeros pasos</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium">Módulo 2: Fundamentos</h3>
                    <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>• Variables y tipos de datos</li>
                      <li>• Estructuras de control</li>
                      <li>• Funciones y métodos</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium">Módulo 3: Avanzado</h3>
                    <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>• Programación orientada a objetos</li>
                      <li>• Patrones de diseño</li>
                      <li>• Optimización y rendimiento</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            {/* Course sidebar */}
            <div className="bg-card rounded-lg p-6 shadow-sm sticky top-6">
              <div className="aspect-video bg-muted rounded-md mb-4">
                <img
                  src={course?.cover_image_url || 'https://via.placeholder.com/640x360'}
                  alt={course?.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="mb-4">
                <div className="text-2xl font-bold mb-1">
                  {course?.price ? `${course.price} ${course.currency?.toUpperCase()}` : 'Gratis'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {course?.duration_text || 'Duración: 10 horas'}
                </div>
              </div>
              <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                Inscribirse
              </button>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Instructor:</span>
                  <span>{course?.instructor?.full_name || 'Profesor'}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Nivel:</span>
                  <span>{course?.level || 'Principiante'}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Categoría:</span>
                  <span>{course?.category || 'Programación'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CourseDetail;
