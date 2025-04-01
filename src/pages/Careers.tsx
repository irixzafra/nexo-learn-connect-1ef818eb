
import React, { useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Filter, 
  GraduationCap, 
  Building,
  BookOpen,
  Users
} from "lucide-react";
import InlineEdit from "@/components/admin/InlineEdit";
import EducationalResources from "@/components/careers/EducationalResources";
import MentoringSection from "@/components/careers/MentoringSection";
import JobListingsSection from "@/components/careers/JobListingsSection";

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

// Componente principal de la página Careers
const Careers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [activeTab, setActiveTab] = useState("jobs");

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Ofertas de Trabajo</span>
              <span className="sm:hidden">Ofertas</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Recursos Educativos</span>
              <span className="sm:hidden">Recursos</span>
            </TabsTrigger>
            <TabsTrigger value="mentoring" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Mentorías y Desarrollo</span>
              <span className="sm:hidden">Mentorías</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-6">
            <div className="flex flex-col space-y-4 mb-6">
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
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="Desarrollo Web">Desarrollo Web</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Diseño">Diseño</SelectItem>
                      <SelectItem value="Marketing Digital">Marketing Digital</SelectItem>
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
                      <SelectItem value="all">Todas las ubicaciones</SelectItem>
                      <SelectItem value="Madrid">Madrid</SelectItem>
                      <SelectItem value="Barcelona">Barcelona</SelectItem>
                      <SelectItem value="Valencia">Valencia</SelectItem>
                      <SelectItem value="Remoto">Remoto</SelectItem>
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
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      <SelectItem value="full-time">Tiempo Completo</SelectItem>
                      <SelectItem value="part-time">Tiempo Parcial</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <JobListingsSection />
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <EducationalResources />
          </TabsContent>

          <TabsContent value="mentoring" className="mt-6">
            <MentoringSection />
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="bg-muted rounded-lg p-8 text-center mt-12">
          <GraduationCap className="h-12 w-12 mx-auto text-primary mb-4" />
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
