
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  MoreHorizontal, 
  Send, 
  Search,
  Users,
  MessageSquare,
  Bell,
  TrendingUp,
  LayoutGrid,
  UserPlus,
  UserCheck
} from 'lucide-react';

// Post interface
interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  createdAt: string;
  liked: boolean;
  category?: string;
}

// Group interface
interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
  joined: boolean;
}

// Mock data for posts
const posts: Post[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'María García',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Instructor'
    },
    content: 'Acabo de publicar un nuevo curso sobre React Native. Si estás interesado en el desarrollo móvil, ¡échale un vistazo!',
    likes: 24,
    comments: 8,
    createdAt: '2h',
    liked: true,
    category: 'Anuncio'
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Carlos López',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'Estudiante'
    },
    content: '¿Alguien podría recomendarme recursos para aprender TypeScript? Estoy buscando tutoriales que sean prácticos y no demasiado teóricos.',
    likes: 15,
    comments: 22,
    createdAt: '4h',
    liked: false,
    category: 'Pregunta'
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Ana Martínez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'Estudiante'
    },
    content: 'Acabo de terminar el curso de Desarrollo Web Avanzado y ha sido una experiencia increíble. Recomiendo a todos que lo prueben.',
    images: ['https://placehold.co/600x400/png'],
    likes: 47,
    comments: 13,
    createdAt: '1d',
    liked: true,
    category: 'Experiencia'
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'Javier Santos',
      avatar: 'https://i.pravatar.cc/150?img=4',
      role: 'Instructor'
    },
    content: 'Comparto este artículo sobre las tendencias en desarrollo web para 2024. Es importante mantenerse actualizado. https://example.com/web-trends-2024',
    likes: 32,
    comments: 5,
    createdAt: '2d',
    liked: false,
    category: 'Recurso'
  }
];

// Mock data for groups
const groups: Group[] = [
  {
    id: 'g1',
    name: 'Desarrolladores Frontend',
    description: 'Grupo para discutir temas de desarrollo frontend',
    members: 342,
    image: 'https://placehold.co/100/6E59A5/fff?text=FD',
    joined: true
  },
  {
    id: 'g2',
    name: 'Python Enthusiasts',
    description: 'Todo sobre Python y sus frameworks',
    members: 231,
    image: 'https://placehold.co/100/3182CE/fff?text=PY',
    joined: false
  },
  {
    id: 'g3',
    name: 'UX/UI Designers',
    description: 'Comparte diseños y obtén feedback',
    members: 187,
    image: 'https://placehold.co/100/DD6B20/fff?text=UX',
    joined: true
  },
  {
    id: 'g4',
    name: 'Machine Learning',
    description: 'Aprendizaje automático y ciencia de datos',
    members: 415,
    image: 'https://placehold.co/100/38A169/fff?text=ML',
    joined: false
  }
];

// Mock trending topics
const trendingTopics = [
  'React', 'JavaScript', 'Python', 'UX Design', 'Machine Learning',
  'Next.js', 'Data Science', 'Career Advice', 'Web Development', 'Mobile Apps'
];

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim() === '') return;
    alert('Funcionalidad en desarrollo: Publicar "' + newPost + '"');
    setNewPost('');
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          {/* Left Sidebar - Profile & Navigation */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium">Usuario Demo</h3>
                <p className="text-muted-foreground text-sm">Estudiante</p>
                <div className="flex gap-4 mt-4">
                  <div className="text-center">
                    <p className="font-bold">128</p>
                    <p className="text-xs text-muted-foreground">Conexiones</p>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="text-center">
                    <p className="font-bold">36</p>
                    <p className="text-xs text-muted-foreground">Publicaciones</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('feed')}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Feed de actividad
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('groups')}>
                  <Users className="mr-2 h-4 w-4" />
                  Grupos
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notificaciones
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Tendencias
                </Button>
              </nav>
            </CardContent>
          </Card>
          
          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Temas Tendencia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map(topic => (
                  <Badge key={topic} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-2/4">
          {/* Main Content Area */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="groups">Grupos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed" className="space-y-6">
              {/* New Post Form */}
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handlePostSubmit}>
                    <div className="flex gap-4 mb-4">
                      <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                      <Input
                        placeholder="¿Qué quieres compartir hoy?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm">
                          Imagen
                        </Button>
                        <Button type="button" variant="outline" size="sm">
                          Enlace
                        </Button>
                      </div>
                      <Button type="submit" size="sm" disabled={!newPost.trim()}>
                        Publicar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              {/* Post Feed */}
              {posts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{post.user.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {post.user.role}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">Hace {post.createdAt}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {post.category && (
                        <Badge variant="secondary" className="mt-2 mb-1">
                          {post.category}
                        </Badge>
                      )}
                      
                      <p className="mt-3 text-sm">{post.content}</p>
                      
                      {post.images && post.images.length > 0 && (
                        <div className="mt-4">
                          <img src={post.images[0]} alt="Post content" className="rounded-md w-full" />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                        <div>{post.likes} me gusta • {post.comments} comentarios</div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex justify-between">
                        <Button variant="ghost" size="sm" className={post.liked ? 'text-primary' : ''}>
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Me gusta
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Comentar
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Compartir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="groups" className="space-y-6">
              {/* Groups Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Grupos</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Ver todos
                  </Button>
                  <Button size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Crear grupo
                  </Button>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar grupos" className="pl-10" />
              </div>
              
              {/* Groups Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map(group => (
                  <Card key={group.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="h-full w-24 flex-shrink-0">
                          <img src={group.image} alt={group.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="p-4 flex-1">
                          <h3 className="font-medium">{group.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{group.members} miembros</p>
                          <p className="text-sm mb-3 line-clamp-2">{group.description}</p>
                          <Button 
                            variant={group.joined ? "outline" : "default"} 
                            size="sm"
                            className="w-full"
                          >
                            {group.joined ? (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Unido
                              </>
                            ) : (
                              <>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Unirse
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Recommended Groups - Placeholder */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-base">Grupos Recomendados</CardTitle>
                  <CardDescription>Basados en tus intereses y actividad</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 text-muted-foreground">
                    <p>Funcionalidad en desarrollo. Las recomendaciones estarán disponibles próximamente.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:w-1/4">
          {/* Right Sidebar - Suggestions & Upcoming Events */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Sugerencias de Conexión</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                      <AvatarFallback>SU</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-medium">Usuario Sugerido {i}</h4>
                      <p className="text-xs text-muted-foreground">Instructor</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span className="sr-only md:not-sr-only md:inline">Conectar</span>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Webinar: Introducción a Next.js</h4>
                      <p className="text-xs text-muted-foreground">Mañana, 18:00 - 19:30</p>
                    </div>
                    <Badge>Online</Badge>
                  </div>
                  <p className="text-sm mb-3">Aprende los fundamentos de Next.js y cómo construir aplicaciones web modernas.</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Ver detalles
                  </Button>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Taller: Diseño UX</h4>
                      <p className="text-xs text-muted-foreground">Viernes, 17:00 - 20:00</p>
                    </div>
                    <Badge>Presencial</Badge>
                  </div>
                  <p className="text-sm mb-3">Taller práctico sobre principios de diseño UX y usabilidad.</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Ver detalles
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="link" size="sm">
                  Ver todos los eventos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Message Input - Fixed at bottom */}
      <div className="fixed bottom-0 right-6 w-80 bg-card rounded-t-lg shadow-lg border border-border z-10">
        <div className="p-3 border-b flex justify-between items-center">
          <h3 className="font-medium text-sm">Mensajes</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-3 flex gap-2">
          <Input placeholder="Escribe un mensaje..." size={1} className="text-sm" />
          <Button size="icon" className="h-8 w-8">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;
