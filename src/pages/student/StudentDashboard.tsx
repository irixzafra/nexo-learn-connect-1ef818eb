
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentDashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Estudiante</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cursos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-muted-foreground">Cursos en los que estás inscrito</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">65%</p>
            <p className="text-muted-foreground">Promedio de avance de tus cursos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Próximas Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
            <p className="text-muted-foreground">Tareas pendientes esta semana</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
