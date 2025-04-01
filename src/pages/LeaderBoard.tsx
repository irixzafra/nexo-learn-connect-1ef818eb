
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PublicLayout from '@/layouts/PublicLayout';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Medal, 
  Award, 
  TrendingUp, 
  Users, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Flame,
  Trophy,
  Star,
  Zap
} from 'lucide-react';

// Datos dummy para el Leaderboard
const LEADERBOARD_USERS = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    username: 'carlos_rod',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    points: 9875,
    rank: 1,
    level: 32,
    streakDays: 85,
    completedCourses: 12,
    badges: 24,
    activity: 'high',
    isVerified: true,
    lastActive: '2023-06-22T10:30:00Z',
  },
  {
    id: 2,
    name: 'Laura Martínez',
    username: 'laura_m',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    points: 8640,
    rank: 2,
    level: 29,
    streakDays: 62,
    completedCourses: 9,
    badges: 18,
    activity: 'high',
    isVerified: true,
    lastActive: '2023-06-21T14:45:00Z',
  },
  {
    id: 3,
    name: 'Alejandro Sánchez',
    username: 'alex_sanchez',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    points: 7520,
    rank: 3,
    level: 26,
    streakDays: 45,
    completedCourses: 8,
    badges: 15,
    activity: 'medium',
    isVerified: true,
    lastActive: '2023-06-20T09:15:00Z',
  },
  {
    id: 4,
    name: 'Paula García',
    username: 'paula_g',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    points: 6890,
    rank: 4,
    level: 24,
    streakDays: 38,
    completedCourses: 7,
    badges: 14,
    activity: 'high',
    isVerified: true,
    lastActive: '2023-06-22T08:30:00Z',
  },
  {
    id: 5,
    name: 'Daniel López',
    username: 'dani_lopez',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    points: 6240,
    rank: 5,
    level: 21,
    streakDays: 30,
    completedCourses: 6,
    badges: 12,
    activity: 'medium',
    isVerified: false,
    lastActive: '2023-06-18T16:20:00Z',
  },
  {
    id: 6,
    name: 'Elena Ruiz',
    username: 'elena_r',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    points: 5780,
    rank: 6,
    level: 19,
    streakDays: 25,
    completedCourses: 5,
    badges: 10,
    activity: 'low',
    isVerified: true,
    lastActive: '2023-06-15T11:45:00Z',
  },
  {
    id: 7,
    name: 'Mario González',
    username: 'mario_g',
    avatarUrl: 'https://i.pravatar.cc/150?img=18',
    points: 5320,
    rank: 7,
    level: 18,
    streakDays: 22,
    completedCourses: 4,
    badges: 9,
    activity: 'medium',
    isVerified: true,
    lastActive: '2023-06-19T13:10:00Z',
  },
  {
    id: 8,
    name: 'Sofía Torres',
    username: 'sofia_t',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    points: 4950,
    rank: 8,
    level: 17,
    streakDays: 19,
    completedCourses: 4,
    badges: 8,
    activity: 'high',
    isVerified: true,
    lastActive: '2023-06-21T10:05:00Z',
  },
  {
    id: 9,
    name: 'Javier Fernández',
    username: 'javi_f',
    avatarUrl: 'https://i.pravatar.cc/150?img=17',
    points: 4680,
    rank: 9,
    level: 16,
    streakDays: 15,
    completedCourses: 3,
    badges: 7,
    activity: 'low',
    isVerified: false,
    lastActive: '2023-06-12T09:30:00Z',
  },
  {
    id: 10,
    name: 'Carmen Navarro',
    username: 'carmen_n',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    points: 4320,
    rank: 10,
    level: 15,
    streakDays: 12,
    completedCourses: 3,
    badges: 6,
    activity: 'medium',
    isVerified: true,
    lastActive: '2023-06-18T15:25:00Z',
  }
];

// Datos dummy para desafíos
const CHALLENGES = [
  {
    id: 1,
    title: 'Maratón de Programación',
    description: 'Completa 5 cursos de programación en 30 días',
    points: 2000,
    participants: 245,
    endDate: '2023-07-15T23:59:59Z',
    category: 'programming',
    difficulty: 'hard',
    progressRequired: 5,
    badgeUrl: 'https://img.icons8.com/fluency/48/code.png'
  },
  {
    id: 2,
    title: 'Desafío de Datos',
    description: 'Resuelve 10 ejercicios de análisis de datos',
    points: 1500,
    participants: 187,
    endDate: '2023-07-10T23:59:59Z',
    category: 'data-science',
    difficulty: 'medium',
    progressRequired: 10,
    badgeUrl: 'https://img.icons8.com/fluency/48/combo-chart.png'
  },
  {
    id: 3,
    title: 'Diseñador Experto',
    description: 'Crea 3 prototipos funcionales en Figma',
    points: 1200,
    participants: 130,
    endDate: '2023-07-20T23:59:59Z',
    category: 'design',
    difficulty: 'medium',
    progressRequired: 3,
    badgeUrl: 'https://img.icons8.com/fluency/48/apple-pencil.png'
  },
  {
    id: 4,
    title: 'Racha de Aprendizaje',
    description: 'Mantén una racha diaria de 14 días',
    points: 1000,
    participants: 520,
    endDate: '2023-08-01T23:59:59Z',
    category: 'general',
    difficulty: 'easy',
    progressRequired: 14,
    badgeUrl: 'https://img.icons8.com/fluency/48/fire-element.png'
  }
];

// Datos dummy para logros
const ACHIEVEMENTS = [
  {
    id: 1,
    name: 'Maestro del Código',
    description: 'Completar todos los cursos de programación',
    icon: <Code className="h-6 w-6 text-indigo-500" />,
    rarity: 'legendary',
    unlockedBy: 0.02, // 2% de usuarios
    points: 5000
  },
  {
    id: 2,
    name: 'Analista de Datos',
    description: 'Completar todos los cursos de ciencia de datos',
    icon: <BarChart2 className="h-6 w-6 text-blue-500" />,
    rarity: 'epic',
    unlockedBy: 0.05, // 5% de usuarios
    points: 3000
  },
  {
    id: 3,
    name: 'Diseñador UI/UX',
    description: 'Completar todos los cursos de diseño',
    icon: <Palette className="h-6 w-6 text-pink-500" />,
    rarity: 'rare',
    unlockedBy: 0.08, // 8% de usuarios
    points: 2500
  },
  {
    id: 4,
    name: 'Experto en Marketing',
    description: 'Completar todos los cursos de marketing digital',
    icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    rarity: 'uncommon',
    unlockedBy: 0.12, // 12% de usuarios
    points: 2000
  },
  {
    id: 5,
    name: 'Maestro de la Ciberseguridad',
    description: 'Completar todos los cursos de seguridad informática',
    icon: <Shield className="h-6 w-6 text-red-500" />,
    rarity: 'rare',
    unlockedBy: 0.07, // 7% de usuarios
    points: 2800
  },
  {
    id: 6,
    name: 'Racha de 100 días',
    description: 'Mantener una racha de aprendizaje de 100 días',
    icon: <Flame className="h-6 w-6 text-orange-500" />,
    rarity: 'epic',
    unlockedBy: 0.04, // 4% de usuarios
    points: 3500
  },
  {
    id: 7,
    name: 'Estudiante Dedicado',
    description: 'Completar 50 cursos en la plataforma',
    icon: <GraduationCap className="h-6 w-6 text-indigo-700" />,
    rarity: 'legendary',
    unlockedBy: 0.01, // 1% de usuarios
    points: 6000
  },
  {
    id: 8,
    name: 'Colaborador Activo',
    description: 'Ayudar a 100 estudiantes en el foro de la comunidad',
    icon: <Users className="h-6 w-6 text-green-600" />,
    rarity: 'uncommon',
    unlockedBy: 0.15, // 15% de usuarios
    points: 1800
  }
];

// Componente de Lucide React para iconos faltantes
const Code = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const BarChart2 = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="10" width="4" height="10"></rect>
    <rect x="10" y="4" width="4" height="16"></rect>
    <rect x="18" y="8" width="4" height="12"></rect>
  </svg>
);

const Palette = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="13.5" cy="6.5" r="1.5"></circle>
    <circle cx="17.5" cy="10.5" r="1.5"></circle>
    <circle cx="8.5" cy="7.5" r="1.5"></circle>
    <circle cx="6.5" cy="12.5" r="1.5"></circle>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
  </svg>
);

const Shield = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const GraduationCap = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);

const LeaderBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [timeFilter, setTimeFilter] = useState('all-time');
  
  // Filtrar usuarios por búsqueda
  const filteredUsers = LEADERBOARD_USERS.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <PublicLayout>
      <Helmet>
        <title>Tablero de Líderes | Nexo Learning</title>
        <meta name="description" content="Explora el tablero de líderes y desafíos en Nexo Learning. Compite con otros estudiantes y gana puntos." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tablero de Líderes</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compite con otros estudiantes, gana puntos y desbloquea logros en tu camino de aprendizaje.
          </p>
        </div>
        
        {/* Top Players Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Estudiantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEADERBOARD_USERS.slice(0, 3).map((user, index) => (
              <Card key={user.id} className={`overflow-hidden ${index === 0 ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-transparent dark:from-yellow-950/20 dark:to-transparent' : index === 1 ? 'border-slate-400 bg-gradient-to-br from-slate-50 to-transparent dark:from-slate-950/20 dark:to-transparent' : 'border-amber-700 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-950/20 dark:to-transparent'}`}>
                <div className="relative p-6 text-center">
                  <div className="absolute top-0 left-0 w-full flex justify-center -mt-8">
                    <div className={`rounded-full p-3 ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-slate-400' : 'bg-amber-700'}`}>
                      <Trophy className={`h-6 w-6 ${index === 0 ? 'text-yellow-800' : index === 1 ? 'text-slate-700' : 'text-amber-100'}`} />
                    </div>
                  </div>
                  
                  <div className="mt-6 mb-4">
                    <Avatar className="w-20 h-20 mx-auto border-4 border-white shadow-lg">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className="text-muted-foreground">@{user.username}</p>
                    {user.isVerified && (
                      <Badge variant="secondary" className="mt-1">Verificado</Badge>
                    )}
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold">{user.points.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Puntos</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <div className="font-semibold">{user.level}</div>
                      <p className="text-xs text-muted-foreground">Nivel</p>
                    </div>
                    <div>
                      <div className="font-semibold">{user.badges}</div>
                      <p className="text-xs text-muted-foreground">Insignias</p>
                    </div>
                    <div>
                      <div className="font-semibold">{user.streakDays}</div>
                      <p className="text-xs text-muted-foreground">Racha</p>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant={index === 0 ? "default" : "outline"}>
                    Ver Perfil
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Tabs for Leaderboard, Challenges, Achievements */}
        <Tabs defaultValue="leaderboard" value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="leaderboard">Clasificación</TabsTrigger>
              <TabsTrigger value="challenges">Desafíos</TabsTrigger>
              <TabsTrigger value="achievements">Logros</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setTimeFilter('all-time')} className={timeFilter === 'all-time' ? 'bg-secondary' : ''}>
                Todos los tiempos
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTimeFilter('monthly')} className={timeFilter === 'monthly' ? 'bg-secondary' : ''}>
                Mensual
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTimeFilter('weekly')} className={timeFilter === 'weekly' ? 'bg-secondary' : ''}>
                Semanal
              </Button>
            </div>
          </div>
          
          {/* Leaderboard Tab Content */}
          <TabsContent value="leaderboard">
            <div className="mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o usuario..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Tablero de Puntuación {timeFilter === 'monthly' ? '- Mensual' : timeFilter === 'weekly' ? '- Semanal' : ''}</CardTitle>
                <CardDescription>
                  Compite con otros estudiantes y sube en la clasificación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Rank</th>
                        <th className="text-left py-3 px-4 font-medium">Usuario</th>
                        <th className="text-left py-3 px-4 font-medium">Nivel</th>
                        <th className="text-left py-3 px-4 font-medium">Puntos</th>
                        <th className="text-left py-3 px-4 font-medium">Racha</th>
                        <th className="text-left py-3 px-4 font-medium">Actividad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {user.rank <= 3 ? (
                                <div className={`p-1 rounded-full mr-2 ${
                                  user.rank === 1 ? 'bg-yellow-400' : 
                                  user.rank === 2 ? 'bg-slate-400' : 
                                  'bg-amber-700'
                                }`}>
                                  <Medal className="h-4 w-4 text-white" />
                                </div>
                              ) : (
                                <span className="font-semibold text-muted-foreground ml-2 mr-1">
                                  {user.rank}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium flex items-center">
                                  {user.name}
                                  {user.isVerified && (
                                    <CheckCircle2 className="h-3 w-3 ml-1 text-blue-500" />
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">@{user.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span>{user.level}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-semibold">
                            {user.points.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Flame className="h-4 w-4 text-orange-500 mr-1" />
                              <span>{user.streakDays} días</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={
                              user.activity === 'high' ? 'default' : 
                              user.activity === 'medium' ? 'secondary' : 
                              'outline'
                            }>
                              {user.activity === 'high' ? 'Alta' : 
                               user.activity === 'medium' ? 'Media' : 'Baja'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No se encontraron usuarios</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Challenges Tab Content */}
          <TabsContent value="challenges">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CHALLENGES.map(challenge => (
                <Card key={challenge.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                            <img src={challenge.badgeUrl} alt={challenge.title} className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{challenge.title}</CardTitle>
                            <CardDescription>{challenge.description}</CardDescription>
                          </div>
                        </div>
                      </div>
                      <Badge variant={
                        challenge.difficulty === 'easy' ? 'outline' : 
                        challenge.difficulty === 'medium' ? 'secondary' : 
                        'destructive'
                      }>
                        {challenge.difficulty === 'easy' ? 'Fácil' : 
                         challenge.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">{challenge.points}</div>
                        <p className="text-xs text-muted-foreground">Puntos</p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">{challenge.participants}</div>
                        <p className="text-xs text-muted-foreground">Participantes</p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">
                          {new Date(challenge.endDate).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </div>
                        <p className="text-xs text-muted-foreground">Finaliza</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días restantes
                        </span>
                      </div>
                      <Button>Participar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Ver todos los desafíos
              </Button>
            </div>
          </TabsContent>
          
          {/* Achievements Tab Content */}
          <TabsContent value="achievements">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar logros..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    Rareza
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACHIEVEMENTS.map(achievement => (
                <Card key={achievement.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className={`h-14 w-14 rounded-full flex items-center justify-center mr-4 ${
                        achievement.rarity === 'legendary' ? 'bg-yellow-100 dark:bg-yellow-900/20' : 
                        achievement.rarity === 'epic' ? 'bg-purple-100 dark:bg-purple-900/20' : 
                        achievement.rarity === 'rare' ? 'bg-blue-100 dark:bg-blue-900/20' : 
                        'bg-green-100 dark:bg-green-900/20'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{achievement.name}</h3>
                          <Badge variant={
                            achievement.rarity === 'legendary' ? 'default' : 
                            achievement.rarity === 'epic' ? 'secondary' : 
                            achievement.rarity === 'rare' ? 'outline' : 
                            'ghost'
                          } className={
                            achievement.rarity === 'legendary' ? 'bg-yellow-600' : 
                            achievement.rarity === 'epic' ? 'bg-purple-600' : 
                            achievement.rarity === 'rare' ? 'border-blue-600 text-blue-600' : 
                            'border-green-600 text-green-600'
                          }>
                            {achievement.rarity === 'legendary' ? 'Legendario' : 
                            achievement.rarity === 'epic' ? 'Épico' : 
                            achievement.rarity === 'rare' ? 'Raro' : 
                            'Común'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{achievement.points} puntos</span>
                          </div>
                          <div className="text-muted-foreground">
                            Desbloqueado por {(achievement.unlockedBy * 100).toFixed(1)}% de estudiantes
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Call to Action */}
        <div className="mt-16 bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¡Alcanza la cima del Ranking!</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Completa cursos, participa en desafíos y mantén tu racha diaria para ganar puntos y destacar entre los mejores estudiantes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="default" size="lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              Explorar Cursos
            </Button>
            <Button variant="outline" size="lg">
              <Users className="h-5 w-5 mr-2" />
              Unirse a la Comunidad
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LeaderBoard;
