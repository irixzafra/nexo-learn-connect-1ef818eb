
import React from 'react';

export const ExploreCoursesStep: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Explora Cursos</h2>
      <p className="text-muted-foreground">
        Descubre cursos que se adapten a tus intereses y objetivos de aprendizaje.
      </p>
      <div className="bg-muted/50 p-4 rounded-md">
        <p className="text-sm">Cómo encontrar los cursos perfectos:</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• Usa filtros por categoría, nivel o duración</li>
          <li>• Revisa las valoraciones y comentarios de otros estudiantes</li>
          <li>• Guarda cursos para verlos más tarde</li>
          <li>• Consulta las rutas de aprendizaje recomendadas</li>
        </ul>
      </div>
    </div>
  );
};
