
import React from 'react';
import { Sparkles } from 'lucide-react';

interface PublishStatusBadgeProps {
  isPublished: boolean;
}

const PublishStatusBadge: React.FC<PublishStatusBadgeProps> = ({ isPublished }) => {
  if (isPublished) {
    return (
      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
        <Sparkles className="h-4 w-4" />
        Publicado
      </span>
    );
  }
  
  return (
    <span className="text-amber-600 dark:text-amber-400 font-medium">
      Borrador
    </span>
  );
};

export default PublishStatusBadge;
