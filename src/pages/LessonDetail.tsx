
import React from 'react';
import { useParams } from 'react-router-dom';

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Lección {lessonId}</h1>
      <div className="bg-card p-6 rounded-lg shadow">
        <p className="text-muted-foreground mb-4">Contenido de la lección se mostrará aquí</p>
      </div>
    </div>
  );
};

export default LessonDetail;
