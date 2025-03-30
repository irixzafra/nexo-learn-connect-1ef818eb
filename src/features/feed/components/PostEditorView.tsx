
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { useCreatePost, usePostCategories } from '../hooks/useCommunityFeed';
import { useQueryClient } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Paperclip, Image, Video, Smile, Link2, BarChart2 } from 'lucide-react';
import { toast } from 'sonner';
import { RichTextEditor } from './RichTextEditor';

interface PostEditorViewProps {
  onClose?: () => void;
  standalone?: boolean;
}

export const PostEditorView: React.FC<PostEditorViewProps> = ({ onClose, standalone = false }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createPost } = useCreatePost();
  const queryClient = useQueryClient();
  const { data: categories = [] } = usePostCategories();

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await createPost({
        user_id: user.id,
        title,
        content,
        category_id: categoryId,
      });
      
      setContent('');
      setTitle('');
      setCategoryId(null);
      setShowEditor(false);
      
      // Mostrar notificación de éxito
      toast.success('Publicación creada con éxito');
      
      // Invalidar la query para refrescar el feed
      queryClient.invalidateQueries({ queryKey: ['communityFeed'] });
      
      if (onClose) onClose();
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

  const headerText = 'posting in';
  const communityName = 'IA Masters Automations';

  return (
    <Card className={`mx-auto ${standalone ? 'max-w-3xl shadow-lg border' : 'border-0 shadow-none'}`}>
      <CardContent className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} alt="Avatar" />
            <AvatarFallback>{user.email?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">
              {user.user_metadata?.full_name || user.email} <span className="text-muted-foreground">{headerText}</span> <span className="font-semibold">{communityName}</span>
            </p>

            <Select value={categoryId || ''} onValueChange={(value) => setCategoryId(value || null)}>
              <SelectTrigger className="h-7 text-xs px-2 mt-1 w-[180px] border-muted bg-muted/30">
                <SelectValue placeholder="Select a category" />
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
        </div>

        {/* Title input */}
        <Input
          placeholder="Title"
          className="text-xl border-none px-0 mb-2 focus-visible:ring-0 font-semibold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content */}
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Write something..."
          minHeight="150px"
          onSubmit={handleSubmit}
          submitting={isSubmitting}
        />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between mt-4 pt-2 border-t">
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Paperclip className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Attach</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Image className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Image</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Video className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Video</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Link2 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Link</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <BarChart2 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Poll</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Smile className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Emoji</span>
            </Button>
          </div>
          
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" onClick={onClose}>
              CANCEL
            </Button>
            <Button 
              size="sm" 
              onClick={handleSubmit}
              disabled={isSubmitting || !content.trim()}
            >
              POST
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
