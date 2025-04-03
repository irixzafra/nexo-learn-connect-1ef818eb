
import React from 'react';
import { ModernNavMenu, ModernNavTabs, ModernAccordionContainer, CollapsibleSection } from '@/components/navigation/NavigationComponents';
import { ThemeSelector } from '@/components/themes/ThemeSelector';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ComponentsShowcase: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Componentes de Navegación</h1>
        <p className="text-muted-foreground mb-6">
          Demonstración de diversos componentes modernos de navegación y contenedores.
        </p>
      </div>
      
      <Tabs defaultValue="navigation" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="navigation">Navegación</TabsTrigger>
          <TabsTrigger value="containers">Contenedores</TabsTrigger>
          <TabsTrigger value="themes">Temas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="navigation" className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Menú de Navegación</h2>
            <div className="border rounded-lg overflow-hidden">
              <ModernNavMenu />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Pestañas de Navegación</h2>
            <div className="border rounded-lg p-6">
              <ModernNavTabs />
            </div>
          </section>
        </TabsContent>
        
        <TabsContent value="containers" className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Acordeón Contenedor</h2>
            <div className="border rounded-lg p-6">
              <ModernAccordionContainer />
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sección Colapsable</h2>
            <div className="border rounded-lg p-6">
              <CollapsibleSection />
            </div>
          </section>
        </TabsContent>
        
        <TabsContent value="themes" className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Selección de Temas</h2>
            <div className="border rounded-lg p-6">
              <ThemeSelector />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentsShowcase;
