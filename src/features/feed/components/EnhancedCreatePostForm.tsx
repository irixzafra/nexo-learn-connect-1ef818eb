
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { RichTextEditor } from './RichTextEditor';
import { useCreatePost, usePostCategories } from '../hooks/useCommunityFeed';
import { useQueryClient } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, Video, AtSign, Smile, Send } from 'lucide-react';
import { toast } from 'sonner';

export const EnhancedCreatePostForm: React.FC = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const { createPost } = useCreatePost();
  const queryClient = useQueryClient();
  const { data: categories = [] } = usePostCategories();

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await createPost({
        user_id: user.id,
        content,
        category_id: categoryId,
      });
      
      setContent('');
      setCategoryId(null);
      setShowEditor(false);
      
      // Mostrar notificación de éxito
      toast.success('Publicación creada con éxito');
      
      // Invalidar la query para refrescar el feed
      queryClient.invalidateQueries({ queryKey: ['communityFeed'] });
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error al crear la publicación');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="p-6 text-center">
          <p>Inicia sesión para publicar en la comunidad</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3 pt-4 px-4 flex flex-row space-y-0 gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} alt="Avatar" />
          <AvatarFallback>{user.email?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-medium">{user.user_metadata?.full_name || user.email}</p>
          <Select value={categoryId || ''} onValueChange={(value) => setCategoryId(value || null)}>
            <SelectTrigger className="h-7 text-xs px-2 my-1 w-[140px] border-muted bg-muted/30">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 px-4">
        {!showEditor ? (
          <Button 
            variant="outline" 
            className="w-full h-12 justify-start text-muted-foreground font-normal px-4 rounded-lg"
            onClick={() => setShowEditor(true)}
          >
            ¿Qué quieres compartir?
          </Button>
        ) : (
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="¿Qué quieres compartir?"
            minHeight="150px"
            onSubmit={handleSubmit}
            submitting={isSubmitting}
          />
        )}
      </CardContent>
      
      {!showEditor && (
        <CardFooter className="flex justify-between pt-0 px-4 pb-3">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground"
              onClick={() => setShowEditor(true)}
            >
              <Image className="h-4 w-4 mr-1" />
              Imagen
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground"
              onClick={() => setShowEditor(true)}
            >
              <Video className="h-4 w-4 mr-1" />
              Video
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground"
              onClick={() => setShowEditor(true)}
            >
              <Smile className="h-4 w-4 mr-1" />
              Emoji
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hidden sm:flex"
              onClick={() => setShowEditor(true)}
            >
              <AtSign className="h-4 w-4 mr-1" />
              Mencionar
            </Button>
          </div>
          
          <Button 
            onClick={() => setShowEditor(true)} 
            size="sm"
          >
            <Send className="h-4 w-4 mr-1" />
            Publicar
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
