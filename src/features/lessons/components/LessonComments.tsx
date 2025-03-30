
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MoreVertical, MessageSquare, ThumbsUp, Flag, Reply, Send } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for comments
const MOCK_COMMENTS = [
  {
    id: '1',
    author: 'Juan Pérez',
    avatar: null,
    content: 'Me ha parecido una lección muy interesante. ¿Alguien sabe dónde puedo encontrar más información sobre este tema?',
    timestamp: '2023-08-15T10:30:00',
    likes: 5,
    replies: [
      {
        id: '1-1',
        author: 'Ana García',
        avatar: null,
        content: 'Puedes encontrar más información en el recurso adicional que compartió el instructor en la descripción del curso.',
        timestamp: '2023-08-15T11:15:00',
        likes: 2,
      },
      {
        id: '1-2',
        author: 'Profesor Martínez',
        avatar: null,
        isInstructor: true,
        content: 'Hola Juan, te recomiendo que consultes la bibliografía que compartí en los recursos adicionales. También puedes preguntarme cualquier duda en las sesiones en vivo.',
        timestamp: '2023-08-15T14:20:00',
        likes: 3,
      },
    ],
  },
  {
    id: '2',
    author: 'María López',
    avatar: null,
    content: 'Estoy teniendo problemas para entender la parte sobre la configuración del micrófono. ¿Alguien me podría explicar mejor ese punto?',
    timestamp: '2023-08-14T18:45:00',
    likes: 2,
    replies: [],
  },
];

interface LessonCommentsProps {
  lessonId: string;
}

export function LessonComments({ lessonId }: LessonCommentsProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    // In a real implementation, you would post to an API
    const newCommentObj = {
      id: Date.now().toString(),
      author: user?.displayName || 'Usuario',
      avatar: user?.photoURL || null,
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');

    toast({
      title: "Comentario publicado",
      description: "Tu comentario ha sido publicado con éxito.",
    });
  };

  const handlePostReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    // In a real implementation, you would post to an API
    const reply = {
      id: `${commentId}-${Date.now()}`,
      author: user?.displayName || 'Usuario',
      avatar: user?.photoURL || null,
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyContent('');
    setReplyingTo(null);

    toast({
      title: "Respuesta publicada",
      description: "Tu respuesta ha sido publicada con éxito.",
    });
  };

  const handleLikeComment = (commentId: string, isReply = false, parentId?: string) => {
    // In a real implementation, you would post to an API
    if (isReply && parentId) {
      const updatedComments = comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.likes + 1,
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      });
      setComments(updatedComments);
    } else {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likes + 1,
          };
        }
        return comment;
      });
      setComments(updatedComments);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comentarios y Preguntas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Textarea
            placeholder="Escribe un comentario o pregunta..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-end">
            <Button onClick={handlePostComment} className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Publicar
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.avatar || ''} alt={comment.author} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {comment.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{comment.author}</span>
                      {comment.isInstructor && (
                        <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary">
                          Instructor
                        </span>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Flag className="h-4 w-4 mr-2" />
                          Reportar comentario
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatTimestamp(comment.timestamp)}
                  </p>
                  <p className="mt-1">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground text-xs h-7 gap-1 px-2"
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground text-xs h-7 gap-1 px-2"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      <Reply className="h-3.5 w-3.5" />
                      Responder
                    </Button>
                  </div>
                  
                  {replyingTo === comment.id && (
                    <div className="mt-3">
                      <Textarea
                        placeholder="Escribe tu respuesta..."
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        className="mb-2 text-sm"
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancelar
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handlePostReply(comment.id)}
                        >
                          Responder
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {comment.replies.length > 0 && (
                    <div className="mt-4 pl-6 border-l space-y-4">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.avatar || ''} alt={reply.author} />
                            <AvatarFallback className="text-xs">
                              {reply.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">{reply.author}</span>
                              {reply.isInstructor && (
                                <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary">
                                  Instructor
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatTimestamp(reply.timestamp)}
                            </p>
                            <p className="mt-1 text-sm">{reply.content}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-muted-foreground text-xs h-6 gap-1 px-2"
                                onClick={() => handleLikeComment(reply.id, true, comment.id)}
                              >
                                <ThumbsUp className="h-3 w-3" />
                                {reply.likes > 0 && <span>{reply.likes}</span>}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
