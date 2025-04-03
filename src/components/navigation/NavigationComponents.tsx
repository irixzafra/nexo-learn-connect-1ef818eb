import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Palette, Layers, ChevronDown, Settings, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

export const ModernNavMenu: React.FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Diseño</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/admin/design-system"
                  >
                    <Palette className="h-6 w-6 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Sistema de Diseño
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Configuración central de los elementos visuales de la plataforma
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <a
                  href="/admin/settings/design"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Temas</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Personalización de temas visuales
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="/components-showcase"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Componentes</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Catálogo de componentes disponibles
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="/admin/settings/customization"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Personalización</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Ajustes avanzados de personalización visual
                  </p>
                </a>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Contenido</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/admin/content/pages"
                  >
                    <div className="text-sm font-medium leading-none">Páginas</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Gestión de páginas de contenido
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/admin/content/blocks"
                  >
                    <div className="text-sm font-medium leading-none">Bloques</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Bloques de contenido reutilizables
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/admin/content/media"
                  >
                    <div className="text-sm font-medium leading-none">Media</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Biblioteca de imágenes y archivos
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/admin/content/settings"
                  >
                    <div className="text-sm font-medium leading-none">Ajustes</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Configuración de contenido
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button asChild variant="ghost" className={navigationMenuTriggerStyle()}>
            <Link href="/admin/dashboard">
              Dashboard
            </Link>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const ModernNavTabs: React.FC = () => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>General</span>
        </TabsTrigger>
        <TabsTrigger value="design" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <span>Diseño</span>
        </TabsTrigger>
        <TabsTrigger value="pages" className="flex items-center gap-2">
          <Layers className="h-4 w-4" />
          <span>Páginas</span>
        </TabsTrigger>
        <TabsTrigger value="admin" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          <span>Admin</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium mb-2">Configuración General</h3>
        <p className="text-muted-foreground">
          Ajustes generales de la plataforma y preferencias globales.
        </p>
      </TabsContent>
      <TabsContent value="design" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium mb-2">Sistema de Diseño</h3>
        <p className="text-muted-foreground">
          Personalización de temas, colores, fuentes y componentes visuales.
        </p>
      </TabsContent>
      <TabsContent value="pages" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium mb-2">Gestión de Páginas</h3>
        <p className="text-muted-foreground">
          Administra las páginas del sistema y su contenido.
        </p>
      </TabsContent>
      <TabsContent value="admin" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium mb-2">Panel de Administración</h3>
        <p className="text-muted-foreground">
          Herramientas y ajustes para administradores del sistema.
        </p>
      </TabsContent>
    </Tabs>
  );
};

export const ModernAccordionContainer: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Configuración General</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 space-y-4">
            <p className="text-muted-foreground">
              Aquí puedes configurar los ajustes generales del sistema.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">Ajustes Básicos</Button>
              <Button variant="outline" size="sm">Preferencias</Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="flex items-center">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <span>Sistema de Diseño</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 space-y-4">
            <p className="text-muted-foreground">
              Personalización del aspecto visual de la plataforma.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">Temas</Button>
              <Button variant="outline" size="sm">Componentes</Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="flex items-center">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <span>Contenido</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 space-y-4">
            <p className="text-muted-foreground">
              Gestión de contenido y páginas del sistema.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">Páginas</Button>
              <Button variant="outline" size="sm">Bloques</Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const CollapsibleSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full border rounded-md"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <h4 className="text-sm font-medium">Sistema de Diseño</h4>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "transform rotate-180")} />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="p-4">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            El sistema de diseño permite personalizar la apariencia visual de la plataforma.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full">Temas</Button>
            <Button variant="outline" size="sm" className="w-full">Colores</Button>
            <Button variant="outline" size="sm" className="w-full">Tipografía</Button>
            <Button variant="outline" size="sm" className="w-full">Componentes</Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
