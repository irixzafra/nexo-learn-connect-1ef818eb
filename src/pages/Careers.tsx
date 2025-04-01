
import React, { useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, Clock, Filter, Building } from "lucide-react";
import InlineEdit from "@/components/admin/InlineEdit";
import EducationalResources from "@/components/careers/EducationalResources";
import MentoringSection from "@/components/careers/MentoringSection";

// Job listings data
const jobListings = [
  {
    id: "job-1",
    title: "Instructor de Desarrollo Web",
    company: "Nexo Learning",
    location: "Madrid, España",
    type: "Tiempo Completo",
    salary: "€40,000 - €55,000",
    posted: "2 días atrás",
    category: "Enseñanza",
    description: "Buscamos un instructor experimentado en desarrollo web para enseñar HTML, CSS, JavaScript y React a nuestros estudiantes.",
    requirements: ["3+ años de experiencia en desarrollo web", "Experiencia docente", "Conocimientos avanzados de React"],
    featured: true
  },
  {
    id: "job-2",
    title: "Desarrollador Full Stack",
    company: "TechSolutions",
    location: "Barcelona, España",
    type: "Tiempo Completo",
    salary: "€45,000 - €60,000",
    posted: "1 semana atrás",
    category: "Desarrollo",
    description: "Empresa líder busca desarrollador full stack para trabajar en proyectos innovadores con tecnologías modernas.",
    requirements: ["Experiencia con React y Node.js", "Conocimiento de bases de datos SQL y NoSQL", "Metodologías ágiles"],
    featured: false
  },
  {
    id: "job-3",
    title: "Diseñador UX/UI",
    company: "Creativos Digitales",
    location: "Remoto",
    type: "Tiempo Parcial",
    salary: "€25,000 - €35,000",
    posted: "3 días atrás",
    category: "Diseño",
    description: "Buscamos un diseñador UX/UI para crear experiencias de usuario intuitivas y atractivas para aplicaciones web y móviles.",
    requirements: ["Portafolio con proyectos de UX/UI", "Experiencia con Figma y Adobe XD", "Conocimientos de diseño responsivo"],
    featured: false
  },
  {
    id: "job-4",
    title: "Especialista en Marketing Digital",
    company: "Growth Agency",
    location: "Valencia, España",
    type: "Tiempo Completo",
    salary: "€30,000 - €40,000",
    posted: "5 días atrás",
    category: "Marketing",
    description: "Se busca especialista en marketing digital para gestionar campañas SEM, SEO y redes sociales.",
    requirements: ["Experiencia en Google Ads y Analytics", "Conocimiento de herramientas SEO", "Estrategia de contenidos"],
    featured: true
  },
  {
    id: "job-5",
    title: "Data Scientist",
    company: "DataInsights",
    location: "Sevilla, España",
    type: "Tiempo Completo",
    salary: "€50,000 - €65,000",
    posted: "2 semanas atrás",
    category: "Análisis de Datos",
    description: "Empresa de análisis de datos busca científico de datos para proyectos de machine learning y BI.",
    requirements: ["Experiencia con Python y R", "Conocimientos de ML y estadística", "Manejo de grandes volúmenes de datos"],
    featured: false
  },
  {
    id: "job-6",
    title: "Product Manager",
    company: "Innovate Inc.",
    location: "Remoto",
    type: "Tiempo Completo",
    salary: "€55,000 - €70,000",
    posted: "1 día atrás",
    category: "Gestión",
    description: "Buscamos product manager con experiencia para liderar el desarrollo de nuevos productos digitales.",
    requirements: ["Experiencia en gestión de productos digitales", "Conocimiento de metodologías ágiles", "Habilidades de comunicación"],
    featured: true
  }
];

// Categories for filtering
const jobCategories = [
  { value: "all", label: "Todas las categorías" },
  { value: "Desarrollo", label: "Desarrollo" },
  { value: "Diseño", label: "Diseño" },
  { value: "Marketing", label: "Marketing" },
  { value: "Enseñanza", label: "Enseñanza" },
  { value: "Análisis de Datos", label: "Análisis de Datos" },
  { value: "Gestión", label: "Gestión" }
];

// Locations for filtering
const jobLocations = [
  { value: "all", label: "Todas las ubicaciones" },
  { value: "Madrid", label: "Madrid" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Valencia", label: "Valencia" },
  { value: "Sevilla", label: "Sevilla" },
  { value: "Remoto", label: "Remoto" }
];

// Job types for filtering
const jobTypes = [
  { value: "all", label: "Todos los tipos" },
  { value: "Tiempo Completo", label: "Tiempo Completo" },
  { value: "Tiempo Parcial", label: "Tiempo Parcial" },
  { value: "Contrato", label: "Contrato" },
  { value: "Freelance", label: "Freelance" },
  { value: "Prácticas", label: "Prácticas" }
];

const CareerRecommendations = () => {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Recomendaciones de carrera</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluación de habilidades</CardTitle>
              <CardDescription>Descubre tus puntos fuertes y áreas de mejora</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Realiza una evaluación completa de tus habilidades técnicas y blandas para identificar oportunidades de crecimiento profesional.</p>
            </CardContent>
            <CardFooter>
              <Button>Iniciar evaluación</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Plan de desarrollo profesional</CardTitle>
              <CardDescription>Traza tu camino hacia el éxito</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Crea un plan personalizado para alcanzar tus objetivos profesionales con recomendaciones específicas para tu perfil.</p>
            </CardContent>
            <CardFooter>
              <Button>Crear plan</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <EducationalResources />
      
      <MentoringSection />
    </div>
  );
};

const JobListingCard = ({ job }: { job: any }) => {
  return (
    <Card className={job.featured ? "border-primary" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="mb-1">{job.title}</CardTitle>
            <CardDescription className="flex items-center">
              <Building className="h-4 w-4 mr-1" />
              {job.company}
            </CardDescription>
          </div>
          {job.featured && (
            <Badge variant="default" className="ml-2">
              Destacado
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" /> {job.location}
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" /> {job.type}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" /> {job.posted}
          </div>
        </div>
        <p className="text-sm mb-3">{job.description}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          <Badge variant="secondary">{job.category}</Badge>
          <Badge variant="outline">{job.salary}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          Ver detalles
        </Button>
        <Button size="sm">Aplicar</Button>
      </CardFooter>
    </Card>
  );
};

const Careers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [activeTab, setActiveTab] = useState("jobs");

  // Filter jobs based on search and filters
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = category === "all" || job.category === category;
    const matchesLocation =
      location === "all" || job.location.includes(location);
    const matchesType = jobType === "all" || job.type === jobType;

    return matchesSearch && matchesCategory && matchesLocation && matchesType;
  });

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-3">
            <InlineEdit
              table="content"
              id="careers-title"
              field="text"
              value="Oportunidades Profesionales"
              className="text-3xl font-bold"
            />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <InlineEdit
              table="content"
              id="careers-subtitle"
              field="text"
              value="Descubre oportunidades laborales y recursos para impulsar tu carrera en el mundo tecnológico"
              className="text-lg text-muted-foreground"
              multiline
            />
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-8"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Ofertas de Trabajo</TabsTrigger>
            <TabsTrigger value="career">Desarrollo Profesional</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-6">
            <div className="flex flex-col space-y-4 mb-6">
              {/* Search and filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por título, empresa o palabras clave..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-1 flex-col sm:flex-row gap-4">
                  <Select
                    value={category}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger className="w-full">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={location}
                    onValueChange={setLocation}
                  >
                    <SelectTrigger className="w-full">
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobLocations.map((loc) => (
                        <SelectItem key={loc.value} value={loc.value}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={jobType}
                    onValueChange={setJobType}
                  >
                    <SelectTrigger className="w-full">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Mostrando {filteredJobs.length} de {jobListings.length} ofertas
                </p>
                <Button variant="outline" size="sm" onClick={() => {
                  setSearchQuery("");
                  setCategory("all");
                  setLocation("all");
                  setJobType("all");
                }}>
                  Limpiar filtros
                </Button>
              </div>
            </div>

            {/* Job listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobListingCard key={job.id} job={job} />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No se encontraron ofertas que coincidan con tus criterios.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setCategory("all");
                      setLocation("all");
                      setJobType("all");
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="career" className="mt-6">
            <CareerRecommendations />
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="bg-muted rounded-lg p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">¿Buscas impulsar tu carrera profesional?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Únete a nuestra comunidad de profesionales y accede a recursos exclusivos, mentorías y oportunidades laborales personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="default" size="lg">
              Regístrate ahora
            </Button>
            <Button variant="outline" size="lg">
              Solicitar asesoramiento
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Careers;
