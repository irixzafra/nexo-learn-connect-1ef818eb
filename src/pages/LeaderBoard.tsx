
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PublicLayout from '@/layouts/PublicLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Trophy,
  Medal,
  Star,
  Search,
  Filter,
  Users,
  Calendar,
  CheckCircle,
  BarChart2,
  Award,
  Crown,
  Clock,
  Book
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Datos dummy para el tablero de líderes
const LEADERBOARD_USERS = [
  {
    id: 1,
    name: 'Laura Martínez',
    points: 9875,
    level: 'Experto',
    badges: 28,
    courses_completed: 15,
    streak_days: 87,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300',
    rank: 1,
    progress: 92,
    achievements: ['Experto en JavaScript', 'Maestro de React', 'Explorador Frontend']
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    points: 8640,
    level: 'Avanzado',
    badges: 22,
    courses_completed: 12,
    streak_days: 64,
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=300',
    rank: 2,
    progress: 87,
    achievements: ['Experto en Python', 'Científico de Datos', 'Analítico']
  },
  {
    id: 3,
    name: 'María García',
    points: 7920,
    level: 'Avanzado',
    badges: 19,
    courses_completed: 10,
    streak_days: 45,
    avatar: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=300',
    rank: 3,
    progress: 83,
    achievements: ['Diseñadora UX/UI', 'Creativa Visual', 'Pensamiento de Diseño']
  },
  {
    id: 4,
    name: 'Alejandro Pérez',
    points: 7450,
    level: 'Intermedio',
    badges: 17,
    courses_completed: 8,
    streak_days: 38,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300',
    rank: 4,
    progress: 78,
    achievements: ['DevOps Proficient', 'Cloud Expert']
  },
  {
    id: 5,
    name: 'Lucía Fernández',
    points: 6980,
    level: 'Intermedio',
    badges: 15,
    courses_completed: 7,
    streak_days: 30,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300',
    rank: 5,
    progress: 74,
    achievements: ['Analista de Marketing', 'Estratega SEO']
  },
  {
    id: 6,
    name: 'Jorge Navarro',
    points: 6240,
    level: 'Intermedio',
    badges: 14,
    courses_completed: 6,
    streak_days: 28,
    avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=300',
    rank: 6,
    progress: 69,
    achievements: ['Ciberseguridad']
  },
  {
    id: 7,
    name: 'Isabel Torres',
    points: 5980,
    level: 'Intermedio',
    badges: 13,
    courses_completed: 5,
    streak_days: 25,
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=300',
    rank: 7,
    progress: 65,
    achievements: ['Mobile Developer']
  },
  {
    id: 8,
    name: 'David López',
    points: 5650,
    level: 'Intermedio',
    badges: 12,
    courses_completed: 5,
    streak_days: 21,
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=300',
    rank: 8,
    progress: 62,
    achievements: ['Backend Developer']
  },
  {
    id: 9,
    name: 'Carmen Ruiz',
    points: 4980,
    level: 'Principiante',
    badges: 10,
    courses_completed: 4,
    streak_days: 18,
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=300',
    rank: 9,
    progress: 55,
    achievements: ['Scrum Master']
  },
  {
    id: 10,
    name: 'Miguel Jiménez',
    points: 4320,
    level: 'Principiante',
    badges: 8,
    courses_completed: 3,
    streak_days: 14,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
    rank: 10,
    progress: 48,
    achievements: ['Product Owner']
  }
];

const CHALLENGES = [
  {
    id: 1,
    title: 'Reto 30 días de código',
    description: 'Completa un ejercicio diario durante 30 días consecutivos',
    participants: 2435,
    difficulty: 'Intermedio',
    points: 5000,
    deadline: '15 días restantes',
    progress: 68,
    category: 'programming'
  },
  {
    id: 2,
    title: 'Maratón de Machine Learning',
    description: 'Completa 5 proyectos prácticos de Machine Learning',
    participants: 1270,
    difficulty: 'Avanzado',
    points: 7500,
    deadline: '10 días restantes',
    progress: 45,
    category: 'data-science'
  },
  {
    id: 3,
    title: 'UX Challenge',
    description: 'Diseña una aplicación completa desde cero',
    participants: 987,
    difficulty: 'Todos los niveles',
    points: 4000,
    deadline: '20 días restantes',
    progress: 30,
    category: 'design'
  },
  {
    id: 4,
    title: 'Semana de DevOps',
    description: 'Configura una pipeline CI/CD completa',
    participants: 650,
    difficulty: 'Avanzado',
    points: 6000,
    deadline: '5 días restantes',
    progress: 85,
    category: 'devops'
  },
  {
    id: 5,
    title: 'Cybersecurity CTF',
    description: 'Captura la bandera en 10 escenarios diferentes',
    participants: 820,
    difficulty: 'Avanzado',
    points: 8000,
    deadline: '3 días restantes',
    progress: 92,
    category: 'security'
  }
];

const LeaderBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [userRanking, setUserRanking] = useState<{ rank: number, points: number } | null>(null);

  // Filtrar usuarios
  const filteredUsers = LEADERBOARD_USERS.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Efecto para simular la obtención de la posición del usuario actual
  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setUserRanking({
        rank: 42,
        points: 2850
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PublicLayout>
      <Helmet>
        <title>Tabla de Posiciones | Nexo Learning</title>
        <meta name="description" content="Explora el ranking de estudiantes y los retos disponibles en la plataforma." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tabla de Posiciones</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compite, aprende y gana reconocimiento por tus logros académicos en nuestra comunidad.
          </p>
        </div>

        {/* Top Leaders Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Los Mejores Estudiantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEADERBOARD_USERS.slice(0, 3).map((user, index) => (
              <Card key={user.id} className={`overflow-hidden ${index === 0 ? 'border-yellow-400 border-2' : index === 1 ? 'border-gray-400 border-2' : 'border-amber-700 border-2'}`}>
                <div className="absolute top-4 right-4">
                  {index === 0 ? (
                    <Crown className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                  ) : index === 1 ? (
                    <Award className="h-8 w-8 text-gray-500 fill-gray-500" />
                  ) : (
                    <Medal className="h-8 w-8 text-amber-700 fill-amber-700" />
                  )}
                </div>
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 relative">
                    <Avatar className="w-24 h-24 mx-auto border-4 border-primary">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                      {user.rank}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-2">{user.name}</h3>
                  <p className="text-muted-foreground">{user.level}</p>
                  <div className="mt-4 text-2xl font-bold text-primary">{user.points.toLocaleString()} pts</div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-6 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Cursos</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Book className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{user.courses_completed}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Insignias</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{user.badges}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Racha</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{user.streak_days} días</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 px-6 py-3">
                  <div className="w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Nivel {Math.floor(user.progress / 10)}</span>
                      <span>Nivel {Math.ceil(user.progress / 10) + 1}</span>
                    </div>
                    <Progress value={user.progress % 10 * 10} className="h-2" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* User's Current Position */}
        {userRanking && (
          <Card className="mb-12 bg-muted/30">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Tu posición actual</h3>
                    <p className="text-muted-foreground">Sigue aprendiendo para subir en la clasificación</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">Posición</p>
                    <p className="text-2xl font-bold">#{userRanking.rank}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">Puntos</p>
                    <p className="text-2xl font-bold text-primary">{userRanking.points.toLocaleString()}</p>
                  </div>
                  <Button>
                    <Book className="h-4 w-4 mr-2" />
                    Seguir aprendiendo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div>
          <Tabs defaultValue="leaderboard" className="mb-8">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>Clasificación</span>
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>Retos</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Logros</span>
              </TabsTrigger>
            </TabsList>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="pt-6">
              <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Periodo de tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-time">Todo el tiempo</SelectItem>
                      <SelectItem value="this-month">Este mes</SelectItem>
                      <SelectItem value="this-week">Esta semana</SelectItem>
                      <SelectItem value="today">Hoy</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-muted/50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Posición
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Estudiante
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Nivel
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Puntos
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Cursos
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Insignias
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold 
                                ${user.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 
                                  user.rank === 2 ? 'bg-gray-100 text-gray-800' : 
                                  user.rank === 3 ? 'bg-amber-100 text-amber-800' : 
                                  'bg-muted/50'}`}>
                                {user.rank}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <Avatar>
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-muted-foreground flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{user.streak_days} días consecutivos</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={
                              user.level === 'Experto' ? 'default' : 
                              user.level === 'Avanzado' ? 'secondary' : 
                              'outline'
                            }>
                              {user.level}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                            {user.points.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                              {user.courses_completed}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                              {user.badges}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Challenges Tab */}
            <TabsContent value="challenges" className="pt-6">
              <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar retos..." className="pl-10" />
                </div>
                <div className="flex gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="programming">Programación</SelectItem>
                      <SelectItem value="data-science">Ciencia de datos</SelectItem>
                      <SelectItem value="design">Diseño</SelectItem>
                      <SelectItem value="security">Seguridad</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="active">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Retos activos</SelectItem>
                      <SelectItem value="completed">Completados</SelectItem>
                      <SelectItem value="upcoming">Próximos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CHALLENGES.map(challenge => (
                  <Card key={challenge.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle>{challenge.title}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-0">
                      <div className="flex flex-wrap gap-y-3 mb-4">
                        <Badge variant="outline" className="mr-2">
                          {challenge.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="mr-2">
                          {challenge.points.toLocaleString()} pts
                        </Badge>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          {challenge.deadline}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{challenge.participants.toLocaleString()} participantes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{challenge.deadline}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progreso</span>
                          <span>{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4">
                      <Button className="w-full">
                        Participar en el reto
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Mis Logros</CardTitle>
                    <CardDescription>
                      Has conseguido 18 de 50 logros disponibles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Progreso general</span>
                        <span>36%</span>
                      </div>
                      <Progress value={36} className="h-2" />
                      
                      <div className="mt-6 flex flex-wrap gap-2">
                        <Badge className="bg-green-100 text-green-800 border-green-200 py-1 px-2">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          <span>Primer curso completado</span>
                        </Badge>
                        <Badge className="bg-green-100 text-green-800 border-green-200 py-1 px-2">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          <span>Racha de 7 días</span>
                        </Badge>
                        <Badge className="bg-green-100 text-green-800 border-green-200 py-1 px-2">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          <span>5 pruebas perfectas</span>
                        </Badge>
                        <Badge className="bg-green-100 text-green-800 border-green-200 py-1 px-2">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          <span>Primeros 1000 puntos</span>
                        </Badge>
                        <Badge className="bg-gray-100 text-gray-500 border-gray-200 py-1 px-2 opacity-60">
                          <span>Completar 10 cursos</span>
                        </Badge>
                        <Badge className="bg-gray-100 text-gray-500 border-gray-200 py-1 px-2 opacity-60">
                          <span>Racha de 30 días</span>
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver todos los logros
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Insignias</CardTitle>
                    <CardDescription>
                      Colecciona insignias completando cursos y retos específicos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className={`flex flex-col items-center ${i > 5 ? 'opacity-40' : ''}`}>
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${i > 5 ? 'bg-gray-100' : 'bg-primary/10'}`}>
                            {i <= 5 ? (
                              <Award className={`h-8 w-8 ${i === 1 ? 'text-yellow-500' : i === 2 ? 'text-blue-500' : i === 3 ? 'text-green-500' : i === 4 ? 'text-purple-500' : 'text-red-500'}`} />
                            ) : (
                              <span className="text-gray-400 text-lg">?</span>
                            )}
                          </div>
                          <span className="text-xs mt-2 text-center">
                            {i <= 5 ? (
                              i === 1 ? 'Maestro JS' : 
                              i === 2 ? 'Python Pro' : 
                              i === 3 ? 'UX Expert' : 
                              i === 4 ? 'DevOps' : 
                              'Security+'
                            ) : (
                              'Bloqueado'
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver mi colección
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Retos de la Comunidad</CardTitle>
                  <CardDescription>
                    Compite con otros estudiantes en retos especiales para ganar puntos extra e insignias exclusivas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Codificador Semanal', 
                        description: 'Completa 5 ejercicios de código en una semana', 
                        reward: '500 puntos + Insignia', 
                        participants: 1240,
                        completed: 3,
                        total: 5
                      },
                      { 
                        title: 'Maratón de Aprendizaje', 
                        description: 'Estudia al menos 30 minutos cada día durante 2 semanas', 
                        reward: '1000 puntos + Acceso anticipado a nuevo curso', 
                        participants: 850,
                        completed: 8,
                        total: 14
                      },
                      { 
                        title: 'Mentor Estrella', 
                        description: 'Ayuda a 10 estudiantes en el foro de la comunidad', 
                        reward: '750 puntos + Insignia de Mentor', 
                        participants: 320,
                        completed: 6,
                        total: 10
                      }
                    ].map((challenge, i) => (
                      <div key={i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <h3 className="font-semibold">{challenge.title}</h3>
                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{challenge.reward}</span>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end gap-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{challenge.participants.toLocaleString()} participantes</span>
                            </div>
                            <div className="w-full md:w-48">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progreso</span>
                                <span>{challenge.completed}/{challenge.total}</span>
                              </div>
                              <Progress value={challenge.completed / challenge.total * 100} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar retos
                  </Button>
                  <Button>
                    Ver todos los retos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LeaderBoard;
