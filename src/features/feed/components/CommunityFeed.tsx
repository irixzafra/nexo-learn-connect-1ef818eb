
import React, { useState } from 'react';
import { PostItem } from './PostItem';
import { CategoryFilters } from './CategoryFilters';
import { useCommunityFeed } from '../hooks/useCommunityFeed';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';
import { PostEditorView } from './PostEditorView';
import { useAuth } from '@/contexts/AuthContext';

export const CommunityFeed: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const { data: posts = [], isLoading, error } = useCommunityFeed(currentFilter);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleFilterChange = (filter: string | null) => {
    setCurrentFilter(filter);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Community Feed</h2>
        
        {isAuthenticated && (
          <Button 
            onClick={() => setIsPostDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <PenSquare className="h-4 w-4" />
            <span>New Post</span>
          </Button>
        )}
      </div>
      
      <CategoryFilters 
        selectedCategory={currentFilter} 
        onCategoryChange={handleFilterChange} 
      />
      
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
          <p className="text-xl font-medium">No hay publicaciones aún</p>
          <p className="text-muted-foreground">¡Sé el primero en publicar algo!</p>
        </div>
      )}
      
      <div className="space-y-4">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-3xl p-0">
          <PostEditorView onClose={() => setIsPostDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
