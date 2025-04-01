import React, { useState } from 'react';
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
  BookOpen, 
  Briefcase, 
  Calendar, 
  Filter, 
  GraduationCap, 
  Search, 
  StarIcon,
  Users,
  Clock,
  BookCheck,
  Share
} from 'lucide-react';

// Datos dummy para las carreras profesionales
const CAREERS = [
  {
    id: 1,
    title: 'Desarrollo Full Stack',
    description: 'Conviértete en un desarrollador Full Stack dominando tanto el front-end como el back-end.',
    duration: '12 meses',
    level: 'Intermedio',
    courses: 8,
    students: 1245,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=300',
    category: 'programming',
    price: 1299.99,
    featured: true,
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'GraphQL']
  },
  {
    id: 2,
    title: 'Ciencia de Datos',
    description: 'Domina las técnicas de análisis de datos, machine learning y visualización.',
    duration: '10 meses',
    level: 'Avanzado',
    courses: 7,
    students: 890,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300',
    category: 'data-science',
    price: 1499.99,
    featured: true,
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'Tableau']
  },
  {
    id: 3,
    title: 'Diseño UX/UI',
    description: 'Aprende a crear experiencias de usuario atractivas y funcionales para aplicaciones y sitios web.',
    duration: '8 meses',
    level: 'Todos los niveles',
    courses: 6,
    students: 730,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=300',
    category: 'design',
    price: 999.99,
    featured: false,
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Testing']
  },
  {
    id: 4,
    title: 'Marketing Digital',
    description: 'Desarrolla estrategias efectivas de marketing en línea y optimiza la presencia web de las empresas.',
    duration: '6 meses',
    level: 'Principiante',
    courses: 5,
    students: 1050,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=300',
    category: 'marketing',
    price: 799.99,
    featured: false,
    skills: ['SEO', 'SEM', 'Social Media', 'Email Marketing', 'Analytics']
  },
  {
    id: 5,
    title: 'Ciberseguridad',
    description: 'Aprende a proteger sistemas y redes contra amenazas informáticas y ataques cibernéticos.',
    duration: '14 meses',
    level: 'Avanzado',
    courses: 9,
    students: 620,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=300',
    category: 'security',
    price: 1599.99,
    featured: true,
    skills: ['Ethical Hacking', 'Cryptography', 'Network Security', 'Penetration Testing']
  },
  {
    id: 6,
    title: 'Inteligencia Artificial',
    description: 'Especialízate en Machine Learning, Deep Learning y sistemas inteligentes.',
    duration: '15 meses',
    level: 'Avanzado',
    courses: 10,
    students: 480,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=300',
    category: 'ai',
    price: 1799.99,
    featured: true,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP']
  }
];

const CareersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filtrar carreras por búsqueda y categoría
  const filteredCareers = CAREERS.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || career.category === activeTab;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <PublicLayout>
      <Helmet>
        <title>Carreras Profesionales | Nexo Learning</title>
        <meta name="description" content="Explora las carreras profesionales en tecnología y negocios digitales en Nexo Learning." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Carreras Profesionales</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Programas formativos completos diseñados por expertos para impulsar tu carrera en el mundo digital.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar carreras..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Popularidad
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="programming">Programación</TabsTrigger>
              <TabsTrigger value="data-science">Ciencia de Datos</TabsTrigger>
              <TabsTrigger value="design">Diseño</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="ai">Inteligencia Artificial</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Featured Careers */}
        {activeTab === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Carreras Destacadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAREERS.filter(career => career.featured).map(career => (
                <Card key={career.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={career.image}
                      alt={career.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-primary text-white">Destacado</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{career.title}</CardTitle>
                    <CardDescription>{career.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {career.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                      {career.skills.length > 3 && (
                        <Badge variant="outline">+{career.skills.length - 3} más</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{career.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span>{career.level}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{career.courses} cursos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{career.students} estudiantes</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <span className="font-bold">{career.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(career.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="font-bold text-lg">€{career.price}</div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* All Careers */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {activeTab === 'all' ? 'Todas las Carreras' : 
             activeTab === 'programming' ? 'Carreras en Programación' :
             activeTab === 'data-science' ? 'Carreras en Ciencia de Datos' :
             activeTab === 'design' ? 'Carreras en Diseño' :
             activeTab === 'marketing' ? 'Carreras en Marketing' :
             activeTab === 'security' ? 'Carreras en Seguridad' :
             'Carreras en Inteligencia Artificial'}
          </h2>
          
          {filteredCareers.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCareers.map(career => (
                <Card key={career.id} className="flex flex-col md:flex-row overflow-hidden">
                  <div className="md:w-1/3 relative">
                    <img
                      src={career.image}
                      alt={career.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{career.title}</CardTitle>
                          <CardDescription className="mt-1">{career.description}</CardDescription>
                        </div>
                        {career.featured && (
                          <Badge variant="secondary" className="bg-primary text-white">Destacado</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{career.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookCheck className="h-4 w-4 text-muted-foreground" />
                          <span>{career.courses} cursos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{career.students} estudiantes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1">{career.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map(skill => (
                          <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="font-bold text-lg">€{career.price}</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4 mr-2" />
                          Compartir
                        </Button>
                        <Button>
                          Ver Detalles
                        </Button>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No se encontraron carreras que coincidan con tu búsqueda.</p>
              <Button variant="link" onClick={() => { setSearchTerm(''); setActiveTab('all'); }}>
                Mostrar todas las carreras
              </Button>
            </div>
          )}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contamos con asesores académicos que pueden ayudarte a encontrar la carrera perfecta para tus objetivos profesionales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="default" size="lg">
              <GraduationCap className="h-5 w-5 mr-2" />
              Hablar con un asesor
            </Button>
            <Button variant="outline" size="lg">
              <BookOpen className="h-5 w-5 mr-2" />
              Explorar todos los cursos
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default CareersPage;
