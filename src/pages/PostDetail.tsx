
import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Publicación {postId}</h1>
      <div className="bg-card p-6 rounded-lg shadow">
        <p className="text-muted-foreground mb-4">Contenido de la publicación se mostrará aquí</p>
      </div>
    </div>
  );
};

export default PostDetail;
