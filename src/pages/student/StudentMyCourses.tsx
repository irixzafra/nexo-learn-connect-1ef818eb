
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentMyCourses: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Mis Cursos Inscritos</h1>
      
      <div className="grid gap-6">
        {[1, 2, 3].map((course) => (
          <Card key={course} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="bg-muted w-full md:w-48 h-32 md:h-auto flex items-center justify-center">
                <span className="text-muted-foreground">Imagen del curso {course}</span>
              </div>
              <div className="flex-1 p-6">
                <CardTitle className="mb-2">Curso de Ejemplo {course}</CardTitle>
                <p className="text-muted-foreground mb-4">
                  Descripción breve del curso de ejemplo número {course}.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      En progreso
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Progreso: 45%
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentMyCourses;
