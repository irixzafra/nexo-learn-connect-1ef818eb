
import React from 'react';

export const PlatformTourStep: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tour por la Plataforma</h2>
      <p className="text-muted-foreground">
        Conoce las diferentes secciones y herramientas disponibles en Nexo.
      </p>
      <div className="bg-muted/50 p-4 rounded-md">
        <p className="text-sm">Secciones principales:</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• Dashboard: Tu espacio personal con resumen de actividad</li>
          <li>• Mis Cursos: Accede a tus cursos en progreso</li>
          <li>• Explorar: Encuentra nuevos cursos y recursos</li>
          <li>• Comunidad: Conecta con otros estudiantes</li>
          <li>• Recursos: Materiales adicionales de aprendizaje</li>
        </ul>
      </div>
    </div>
  );
};
