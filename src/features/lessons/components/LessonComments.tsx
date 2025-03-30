
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  MessageSquare,
  Send,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Dummy data for comments
// In a real implementation, this would come from a database
const DUMMY_COMMENTS = [
  {
    id: '1',
    author: 'Ana García',
    avatar: '/lovable-uploads/69a3f68a-63d6-4fa4-a8aa-9cd3023f201a.png',
    content: 'Gran explicación. Me ayudó mucho a entender este concepto que me estaba costando.',
    timestamp: '2 horas atrás',
    likes: 3,
    isInstructor: true,
    replies: [
      {
        id: '101',
        author: 'Miguel Torres',
        avatar: '/lovable-uploads/76db81f1-1b84-4977-963b-69a243d7f86a.png',
        content: '¡A mí también me resultó muy útil!',
        timestamp: '1 hora atrás',
        likes: 1,
      },
    ],
  },
  {
    id: '2',
    author: 'Roberto López',
    avatar: '/lovable-uploads/ab16dc8b-143e-45bb-8cd6-b634344e8e1f.png',
    content: 'Tengo una duda sobre la parte donde hablas del proceso XYZ. ¿Podrías aclarar un poco más?',
    timestamp: '1 día atrás',
    likes: 0,
    replies: [],
  },
];

interface LessonCommentsProps {
  lessonId: string;
}

export function LessonComments({ lessonId }: LessonCommentsProps) {
  const [comments, setComments] = useState(DUMMY_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmitComment = () => {
    if (!newComment.trim() || !user) return;
    
    const newCommentObj = {
      id: Date.now().toString(),
      author: user.email || 'Anonymous User',
      avatar: '/placeholder.svg',
      content: newComment,
      timestamp: 'Ahora mismo',
      likes: 0,
      replies: [],
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
    
    toast({
      title: "Comentario enviado",
      description: "Tu comentario ha sido publicado con éxito.",
    });
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyTexts[commentId]?.trim() || !user) return;
    
    const newReply = {
      id: Date.now().toString(),
      author: user.email || 'Anonymous User',
      avatar: '/placeholder.svg',
      content: replyTexts[commentId],
      timestamp: 'Ahora mismo',
      likes: 0,
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyTexts({ ...replyTexts, [commentId]: '' });
    
    toast({
      title: "Respuesta enviada",
      description: "Tu respuesta ha sido publicada con éxito.",
    });
  };

  const toggleReplies = (commentId: string) => {
    setExpandedComments(prev => 
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleLike = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    
    setComments(updatedComments);
    
    toast({
      title: "Me gusta",
      description: "Has indicado que te gusta este comentario.",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold">Comentarios y preguntas</h3>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Comment Input */}
        {user && (
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="User Avatar" />
              <AvatarFallback>
                {user.email ? getInitials(user.email) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Comparte tu opinión o pregunta..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="resize-none"
              />
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4 mr-1" />
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        )}

        <Separator className="my-4" />
        
        {/* Comments List */}
        {comments.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No hay comentarios todavía. ¡Sé el primero en comentar!
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="space-y-3">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>{getInitials(comment.author)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium">{comment.author}</h4>
                      {comment.isInstructor && (
                        <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-xs">
                          Instructor
                        </Badge>
                      )}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{comment.content}</p>
                    <div className="mt-2 flex gap-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-muted-foreground hover:text-foreground"
                        onClick={() => handleLike(comment.id)}
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        <span className="text-xs">{comment.likes}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-muted-foreground hover:text-foreground"
                        onClick={() => toggleReplies(comment.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="text-xs">
                          {comment.replies.length > 0 ? comment.replies.length : "Responder"}
                        </span>
                        {comment.replies.length > 0 && (
                          expandedComments.includes(comment.id) ? 
                          <ChevronUp className="h-4 w-4 ml-1" /> : 
                          <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Replies */}
                {expandedComments.includes(comment.id) && (
                  <div className="ml-12 space-y-3 mt-2">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.avatar} alt={reply.author} />
                          <AvatarFallback>{getInitials(reply.author)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h5 className="text-sm font-medium">{reply.author}</h5>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {reply.timestamp}
                            </span>
                          </div>
                          <p className="mt-1 text-xs">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Reply input */}
                    {user && (
                      <div className="flex gap-2 mt-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                          <AvatarFallback>
                            {user.email ? getInitials(user.email) : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Escribe una respuesta..."
                            value={replyTexts[comment.id] || ''}
                            onChange={(e) => setReplyTexts({
                              ...replyTexts,
                              [comment.id]: e.target.value
                            })}
                            className="resize-none text-sm min-h-[60px]"
                          />
                          <div className="flex justify-end mt-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={() => handleSubmitReply(comment.id)}
                              disabled={!replyTexts[comment.id]?.trim()}
                            >
                              <Send className="h-3 w-3 mr-1" />
                              Responder
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>Los comentarios están sujetos a moderación. Por favor, sé respetuoso y sigue las normas de la comunidad.</p>
      </CardFooter>
    </Card>
  );
}
