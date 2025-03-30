
import React, { useState } from 'react';
import { useCommunityFeed } from '../hooks/useCommunityFeed';
import { PostItem } from './PostItem';
import { CreatePostForm } from './CreatePostForm';
import { FeedFilters } from './FeedFilters';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CommunityFeed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: posts = [], isLoading, isError, refetch } = useCommunityFeed(selectedCategory || undefined);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleCommentClick = (postId: string) => {
    // For now, just scroll to the post. Later we can open a comment modal
    const postElement = document.getElementById(`post-${postId}`);
    if (postElement) {
      postElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      <CreatePostForm />
      
      <FeedFilters 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Error al cargar las publicaciones</p>
          <Button onClick={() => refetch()}>Intentar de nuevo</Button>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 border rounded-md bg-muted/30">
          <h3 className="text-lg font-medium mb-2">No hay publicaciones</h3>
          <p className="text-muted-foreground mb-4">
            {selectedCategory 
              ? 'No hay publicaciones en esta categoría. Sé el primero en publicar algo!' 
              : 'Parece que no hay publicaciones. ¡Sé el primero en publicar algo!'}
          </p>
        </div>
      ) : (
        <div>
          {posts.map(post => (
            <div key={post.id} id={`post-${post.id}`}>
              <PostItem 
                post={post} 
                onCommentClick={handleCommentClick} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
