
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  ChevronDown, 
  Menu, 
  Home, 
  Settings, 
  User, 
  Book, 
  LayoutDashboard, 
  LogOut, 
  Bell,
  Search,
  Bookmark,
  Calendar,
  LineChart,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';
import {
  StyledAccordion,
  StyledAccordionItem
} from '@/components/ui/styled-accordion';

// Modern Horizontal Navigation Menu
export const ModernNavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              Nexo Learning
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-accent transition-colors">
              Inicio
            </Link>
            <Link to="/courses" className="px-3 py-2 rounded-md hover:bg-accent transition-colors">
              Cursos
            </Link>
            <Link to="/material-design" className="px-3 py-2 rounded-md hover:bg-accent transition-colors">
              Material Design
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md hover:bg-accent transition-colors">
              Nosotros
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md hover:bg-accent transition-colors">
              Contacto
            </Link>
          </div>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="default">
              Iniciar Sesión
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden p-4 space-y-3 border-t">
          <Link to="/" className="block px-3 py-2 rounded-md hover:bg-accent transition-colors">
            Inicio
          </Link>
          <Link to="/courses" className="block px-3 py-2 rounded-md hover:bg-accent transition-colors">
            Cursos
          </Link>
          <Link to="/material-design" className="block px-3 py-2 rounded-md hover:bg-accent transition-colors">
            Material Design
          </Link>
          <Link to="/about" className="block px-3 py-2 rounded-md hover:bg-accent transition-colors">
            Nosotros
          </Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md hover:bg-accent transition-colors">
            Contacto
          </Link>
          <div className="pt-3 border-t flex justify-end">
            <Button size="sm">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Modern Navigation Tabs
export const ModernNavTabs: React.FC = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid grid-cols-5 mb-6 h-auto">
        <TabsTrigger value="dashboard" className="flex items-center gap-2 py-3">
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </TabsTrigger>
        <TabsTrigger value="courses" className="flex items-center gap-2 py-3">
          <Book className="h-4 w-4" />
          <span>Mis Cursos</span>
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2 py-3">
          <Calendar className="h-4 w-4" />
          <span>Calendario</span>
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center gap-2 py-3">
          <LineChart className="h-4 w-4" />
          <span>Estadísticas</span>
        </TabsTrigger>
        <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
          <User className="h-4 w-4" />
          <span>Perfil</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-medium mb-4">Dashboard</h3>
          <p>Contenido del dashboard.</p>
        </div>
      </TabsContent>
      <TabsContent value="courses">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-medium mb-4">Mis Cursos</h3>
          <p>Listado de cursos inscritos.</p>
        </div>
      </TabsContent>
      <TabsContent value="calendar">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-medium mb-4">Calendario</h3>
          <p>Calendario de eventos y fechas importantes.</p>
        </div>
      </TabsContent>
      <TabsContent value="stats">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-medium mb-4">Estadísticas</h3>
          <p>Visualización de estadísticas de aprendizaje.</p>
        </div>
      </TabsContent>
      <TabsContent value="profile">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-medium mb-4">Perfil</h3>
          <p>Información del perfil de usuario.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

// Modern Accordion Content Container
export const ModernAccordionContainer: React.FC = () => {
  return (
    <StyledAccordion type="single" collapsible gap="md" className="w-full">
      <StyledAccordionItem 
        value="item-1" 
        title="Introducción al Curso" 
        icon={<Book className="h-5 w-5" />}
      >
        <div className="space-y-2">
          <p>Este módulo introduce los conceptos básicos del curso.</p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <span>Lección 1: Fundamentos</span>
            </li>
            <li className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <span>Lección 2: Conceptos clave</span>
            </li>
          </ul>
        </div>
      </StyledAccordionItem>
      
      <StyledAccordionItem 
        value="item-2" 
        title="Herramientas Avanzadas" 
        icon={<Settings className="h-5 w-5" />}
      >
        <div className="space-y-2">
          <p>Explora herramientas avanzadas para mejorar tu experiencia de aprendizaje.</p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <span>Lección 1: Configuración personalizada</span>
            </li>
            <li className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <span>Lección 2: Optimización</span>
            </li>
          </ul>
        </div>
      </StyledAccordionItem>
      
      <StyledAccordionItem 
        value="item-3" 
        title="Recursos Adicionales" 
        icon={<HelpCircle className="h-5 w-5" />}
      >
        <div className="space-y-2">
          <p>Recursos complementarios para profundizar en el tema.</p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <span>Material de lectura recomendado</span>
            </li>
            <li className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <span>Ejercicios prácticos</span>
            </li>
          </ul>
        </div>
      </StyledAccordionItem>
    </StyledAccordion>
  );
};

// Collapsible Section
export const CollapsibleSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full border rounded-lg overflow-hidden"
    >
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center justify-between w-full p-4 text-left rounded-none border-b"
        >
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            <span className="font-medium">Módulo de aprendizaje</span>
          </div>
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 space-y-2">
          <p>Este módulo contiene recursos y materiales de aprendizaje.</p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <span>Recurso 1</span>
            </li>
            <li className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <span>Recurso 2</span>
            </li>
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
