
import React, { useState } from 'react';
import { EnhancedCreatePostForm } from './EnhancedCreatePostForm';
import { PostItem } from './PostItem';
import { FeedFilters } from './FeedFilters';
import { useCommunityFeed } from '../hooks/useCommunityFeed';
import { Skeleton } from '@/components/ui/skeleton';

export const CommunityFeed: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const { posts, isLoading, error } = useCommunityFeed(currentFilter);

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  return (
    <div className="space-y-6">
      <EnhancedCreatePostForm />
      
      <FeedFilters activeFilter={currentFilter} onFilterChange={handleFilterChange} />
      
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-md p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <div className="text-center p-6 border rounded-md bg-destructive/10">
          <p className="text-destructive font-medium">Error al cargar publicaciones</p>
          <p className="text-muted-foreground">Por favor intenta de nuevo más tarde</p>
        </div>
      )}
      
      {!isLoading && !error && posts.length === 0 && (
        <div className="text-center p-6 border rounded-md bg-muted/30">
          <p className="text-lg font-medium">No hay publicaciones aún</p>
          <p className="text-muted-foreground">¡Sé el primero en publicar algo!</p>
        </div>
      )}
      
      <div className="space-y-4">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
