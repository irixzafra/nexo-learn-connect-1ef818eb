
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AppLayout from '@/layouts/AppLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  ChevronsUpDown,
  Filter, 
  Medal, 
  Search, 
  Trophy, 
  TrendingUp, 
  Users, 
  Award, 
  Star,
  Share2
} from 'lucide-react';

// Datos dummy para el tablero de líderes
const LEADERBOARD_DATA = [
  {
    id: 1,
    user: {
      name: 'Carlos Rodríguez',
      avatar: 'https://i.pravatar.cc/150?img=1',
      username: 'carlos_dev',
      role: 'student'
    },
    points: 8750,
    position: 1,
    courses_completed: 12,
    streak_days: 78,
    achievements: 24,
    badges: ['Maestro Full-Stack', 'Experto en React', 'Maratonista'],
    trend: 'up'
  },
  {
    id: 2,
    user: {
      name: 'Laura Martínez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      username: 'lauram',
      role: 'student'
    },
    points: 8420,
    position: 2,
    courses_completed: 9,
    streak_days: 102,
    achievements: 18,
    badges: ['Analista de Datos', 'Campeona de Constancia'],
    trend: 'up'
  },
  {
    id: 3,
    user: {
      name: 'Miguel Ángel Gómez',
      avatar: 'https://i.pravatar.cc/150?img=3',
      username: 'miguelangel',
      role: 'student'
    },
    points: 7680,
    position: 3,
    courses_completed: 8,
    streak_days: 65,
    achievements: 21,
    badges: ['Full-Stack Developer', 'Arquitecto de Software'],
    trend: 'down'
  },
  {
    id: 4,
    user: {
      name: 'Ana Pérez',
      avatar: 'https://i.pravatar.cc/150?img=10',
      username: 'anaperez',
      role: 'instructor'
    },
    points: 7230,
    position: 4,
    courses_completed: 7,
    streak_days: 56,
    achievements: 15,
    badges: ['Diseñadora UX/UI', 'Mentor Destacado'],
    trend: 'stable'
  },
  {
    id: 5,
    user: {
      name: 'David López',
      avatar: 'https://i.pravatar.cc/150?img=8',
      username: 'davidl',
      role: 'student'
    },
    points: 6970,
    position: 5,
    courses_completed: 10,
    streak_days: 48,
    achievements: 19,
    badges: ['Desarrollador DevOps', 'Experto en Cloud'],
    trend: 'up'
  },
  {
    id: 6,
    user: {
      name: 'Sofía Gutiérrez',
      avatar: 'https://i.pravatar.cc/150?img=9',
      username: 'sofiag',
      role: 'student'
    },
    points: 6810,
    position: 6,
    courses_completed: 6,
    streak_days: 92,
    achievements: 17,
    badges: ['Analista de Marketing', 'Constancia Heroica'],
    trend: 'up'
  },
  {
    id: 7,
    user: {
      name: 'Javier Moreno',
      avatar: 'https://i.pravatar.cc/150?img=12',
      username: 'javimoreno',
      role: 'student'
    },
    points: 6580,
    position: 7,
    courses_completed: 8,
    streak_days: 42,
    achievements: 14,
    badges: ['Desarrollador Frontend', 'Maestro JavaScript'],
    trend: 'down'
  },
  {
    id: 8,
    user: {
      name: 'Elena Torres',
      avatar: 'https://i.pravatar.cc/150?img=16',
      username: 'elenat',
      role: 'student'
    },
    points: 6320,
    position: 8,
    courses_completed: 5,
    streak_days: 83,
    achievements: 12,
    badges: ['Experta SEO', 'Aprendiz Dedicado'],
    trend: 'up'
  },
  {
    id: 9,
    user: {
      name: 'Roberto Sánchez',
      avatar: 'https://i.pravatar.cc/150?img=15',
      username: 'robertosan',
      role: 'instructor'
    },
    points: 6190,
    position: 9,
    courses_completed: 7,
    streak_days: 37,
    achievements: 16,
    badges: ['Programador Python', 'Maestro de Ciencia de Datos'],
    trend: 'down'
  },
  {
    id: 10,
    user: {
      name: 'Carmen Díaz',
      avatar: 'https://i.pravatar.cc/150?img=7',
      username: 'carmend',
      role: 'student'
    },
    points: 5840,
    position: 10,
    courses_completed: 6,
    streak_days: 51,
    achievements: 11,
    badges: ['Diseñadora Web', 'Estrella Emergente'],
    trend: 'stable'
  }
];

// Top achievers data
const TOP_ACHIEVERS = [
  {
    id: 1,
    user: {
      name: 'Carlos Rodríguez',
      avatar: 'https://i.pravatar.cc/150?img=1',
      username: 'carlos_dev'
    },
    points: 8750,
    achievement: 'Maestro Full-Stack',
    description: 'Completó todos los cursos de desarrollo full-stack con distinción'
  },
  {
    id: 2,
    user: {
      name: 'Laura Martínez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      username: 'lauram'
    },
    points: 8420,
    achievement: 'Campeona de Constancia',
    description: 'Más de 100 días consecutivos de aprendizaje'
  },
  {
    id: 3,
    user: {
      name: 'Miguel Ángel Gómez',
      avatar: 'https://i.pravatar.cc/150?img=3',
      username: 'miguelangel'
    },
    points: 7680,
    achievement: 'Arquitecto de Software',
    description: 'Reconocido por sus excepcionales diseños de arquitectura de software'
  }
];

const LeaderBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [timeFrame, setTimeFrame] = useState('week');
  
  // Filtrar usuarios según la búsqueda
  const filteredUsers = LEADERBOARD_DATA.filter(item => 
    item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AppLayout>
      <Helmet>
        <title>Tablero de Líderes | Nexo Learning</title>
        <meta name="description" content="Explora el tablero de líderes y compite con otros estudiantes en Nexo Learning." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Trophy className="h-8 w-8 text-yellow-500 mr-2" />
              Tablero de Líderes
            </h1>
            <p className="text-muted-foreground mt-1">
              Compite, destaca y gana reconocimiento en nuestra comunidad de aprendizaje
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Mi Posición
            </Button>
            <Button variant="outline" size="sm">
              <Award className="h-4 w-4 mr-2" />
              Mis Logros
            </Button>
          </div>
        </div>
        
        {/* Top Achievers Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            Campeones de la Semana
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TOP_ACHIEVERS.map((achiever, index) => (
              <Card key={achiever.id} className={`bg-gradient-to-br ${
                index === 0 ? 'from-yellow-50 to-yellow-100 dark:from-yellow-900/10 dark:to-yellow-800/10 border-yellow-200 dark:border-yellow-800/30' :
                index === 1 ? 'from-slate-50 to-slate-100 dark:from-slate-900/10 dark:to-slate-800/10 border-slate-200 dark:border-slate-800/30' :
                'from-amber-50 to-amber-100 dark:from-amber-900/10 dark:to-amber-800/10 border-amber-200 dark:border-amber-800/30'
              }`}>
                <CardHeader className="pb-2">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className={`rounded-full p-3 ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-slate-400' :
                      'bg-amber-600'
                    }`}>
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Avatar className="h-20 w-20 border-4 border-background">
                      <AvatarImage src={achiever.user.avatar} alt={achiever.user.name} />
                      <AvatarFallback>{achiever.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center mt-2">
                    <CardTitle>{achiever.user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">@{achiever.user.username}</p>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge className="mb-2" variant={
                    index === 0 ? 'default' :
                    index === 1 ? 'secondary' :
                    'outline'
                  }>
                    {achiever.achievement}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-2">{achiever.description}</p>
                  <div className="font-bold text-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 mr-1 text-green-500" />
                    {achiever.points.toLocaleString()} puntos
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Main Leaderboard */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Clasificación Global</CardTitle>
                <CardDescription>Los estudiantes con mejor desempeño en la plataforma</CardDescription>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <Tabs value={timeFrame} onValueChange={setTimeFrame} className="w-full md:w-auto">
                  <TabsList>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="month">Mes</TabsTrigger>
                    <TabsTrigger value="alltime">Todo</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex gap-2 w-full md:w-auto">
                  <Tabs value={category} onValueChange={setCategory} className="w-full">
                    <TabsList>
                      <TabsTrigger value="all">Todos</TabsTrigger>
                      <TabsTrigger value="courses">Cursos</TabsTrigger>
                      <TabsTrigger value="streak">Racha</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3 px-4 font-medium"># Posición</th>
                    <th className="py-3 px-4 font-medium">Estudiante</th>
                    <th className="py-3 px-4 font-medium">
                      <div className="flex items-center cursor-pointer">
                        Puntos <ChevronsUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 font-medium">Cursos Completados</th>
                    <th className="py-3 px-4 font-medium">Racha</th>
                    <th className="py-3 px-4 font-medium">Insignias</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            {user.position <= 3 ? (
                              <div className={`
                                p-1 rounded-full mr-2
                                ${user.position === 1 ? 'bg-yellow-500' : 
                                  user.position === 2 ? 'bg-slate-400' : 
                                  'bg-amber-600'}
                              `}>
                                <Medal className="h-4 w-4 text-white" />
                              </div>
                            ) : (
                              <span className="font-bold text-muted-foreground ml-2 mr-3">{user.position}</span>
                            )}
                            
                            {user.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                            {user.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.user.avatar} alt={user.user.name} />
                              <AvatarFallback>{user.user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.user.name}</div>
                              <div className="text-sm text-muted-foreground">@{user.user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-bold">{user.points.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-primary" />
                            {user.courses_completed}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            {user.streak_days} días
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {user.badges.slice(0, 2).map((badge, i) => (
                              <Badge key={i} variant="outline" className="whitespace-nowrap">
                                {badge}
                              </Badge>
                            ))}
                            {user.badges.length > 2 && (
                              <Badge variant="outline">+{user.badges.length - 2}</Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        No se encontraron usuarios que coincidan con tu búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredUsers.length} de {LEADERBOARD_DATA.length} estudiantes
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm" className="px-3">1</Button>
                <Button variant="outline" size="sm" disabled>Siguiente</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Achievements Board */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Logros Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 text-purple-500 mr-2" />
                  Maestros Persistentes
                </CardTitle>
                <CardDescription>Estudiantes con las rachas más largas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {LEADERBOARD_DATA
                    .sort((a, b) => b.streak_days - a.streak_days)
                    .slice(0, 5)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="font-bold text-muted-foreground w-5">{index + 1}</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.user.avatar} />
                            <AvatarFallback>{user.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm font-medium">{user.user.name}</div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-primary" />
                          <span className="font-bold">{user.streak_days}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                  Máximos Completadores
                </CardTitle>
                <CardDescription>Mayor número de cursos completados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {LEADERBOARD_DATA
                    .sort((a, b) => b.courses_completed - a.courses_completed)
                    .slice(0, 5)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="font-bold text-muted-foreground w-5">{index + 1}</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.user.avatar} />
                            <AvatarFallback>{user.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm font-medium">{user.user.name}</div>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1 text-primary" />
                          <span className="font-bold">{user.courses_completed}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Medal className="h-5 w-5 text-amber-500 mr-2" />
                  Coleccionistas de Logros
                </CardTitle>
                <CardDescription>Mayor número de logros desbloqueados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {LEADERBOARD_DATA
                    .sort((a, b) => b.achievements - a.achievements)
                    .slice(0, 5)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="font-bold text-muted-foreground w-5">{index + 1}</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.user.avatar} />
                            <AvatarFallback>{user.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm font-medium">{user.user.name}</div>
                        </div>
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-1 text-primary" />
                          <span className="font-bold">{user.achievements}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Community Challenges Section */}
        <Card className="mb-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 text-primary mr-2" />
              Desafíos Comunitarios
            </CardTitle>
            <CardDescription>Participa en desafíos para ganar puntos adicionales y recompensas exclusivas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-card">
                <h3 className="font-bold mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Desafío de Constancia
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Completa al menos una lección cada día durante 30 días consecutivos.
                </p>
                <div className="flex justify-between items-center">
                  <Badge>En Curso</Badge>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Invitar
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-card">
                <h3 className="font-bold mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                  Maratón de Aprendizaje
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Completa un curso completo en un fin de semana.
                </p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Próximamente</Badge>
                  <Button variant="outline" size="sm" disabled>
                    <Share2 className="h-4 w-4 mr-2" />
                    Invitar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* My Performance (Vista previa - no funcional) */}
        <Card className="border-dashed border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mi Rendimiento</CardTitle>
              <Badge variant="outline">Vista Previa - No Funcional</Badge>
            </div>
            <CardDescription>Esta sección mostrará estadísticas personalizadas cuando inicies sesión</CardDescription>
          </CardHeader>
          <CardContent className="py-8 text-center">
            <Button>Iniciar Sesión para Ver Mi Rendimiento</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default LeaderBoard;
