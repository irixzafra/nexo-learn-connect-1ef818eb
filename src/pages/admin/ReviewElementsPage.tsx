
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileWarning, Link2, FileX, FileQuestion, AlertTriangle } from 'lucide-react';
import OrphanReviewPage from './OrphanReviewPage';
import BrokenLinkMonitor from '@/components/error-tracking/BrokenLinkMonitor';

const ReviewElementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('broken-links');
  
  return (
    <AdminPageLayout 
      title="Revisión de Elementos" 
      subtitle="Identifica y gestiona elementos problemáticos en toda la plataforma"
      backHref="/app/admin/dashboard"
    >
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-amber-500 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Información Importante
          </CardTitle>
          <CardDescription>
            Esta sección muestra elementos problemáticos que requieren revisión. Puedes filtrar por 
            tipo de problema y realizar acciones como marcar como revisado, archivar o eliminar.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none mb-6">
          <TabsTrigger value="broken-links" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            <span className="hidden md:inline">Enlaces Rotos</span>
            <span className="md:hidden">Enlaces</span>
          </TabsTrigger>
          <TabsTrigger value="orphan-pages" className="flex items-center gap-2">
            <FileQuestion className="h-4 w-4" />
            <span className="hidden md:inline">Páginas Huérfanas</span>
            <span className="md:hidden">Páginas</span>
          </TabsTrigger>
          <TabsTrigger value="unused-components" className="flex items-center gap-2">
            <FileX className="h-4 w-4" />
            <span className="hidden md:inline">Componentes Sin Usar</span>
            <span className="md:hidden">Componentes</span>
          </TabsTrigger>
          <TabsTrigger value="general-issues" className="flex items-center gap-2">
            <FileWarning className="h-4 w-4" />
            <span className="hidden md:inline">Problemas Generales</span>
            <span className="md:hidden">Problemas</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="broken-links" className="mt-0">
          <BrokenLinkMonitor />
        </TabsContent>
        
        <TabsContent value="orphan-pages" className="mt-0">
          <OrphanReviewPage />
        </TabsContent>
        
        <TabsContent value="unused-components" className="mt-0">
          <UnusedComponentsTab />
        </TabsContent>
        
        <TabsContent value="general-issues" className="mt-0">
          <GeneralIssuesTab />
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

// Componente provisional para la pestaña de componentes sin usar
const UnusedComponentsTab: React.FC = () => {
  const unusedComponents = [
    { path: 'src/components/admin/AdminNavigation.tsx', reason: 'Componente obsoleto, reemplazado por layout/sidebar/navigation/AdminNavigation' },
    { path: 'src/components/layout/sidebar/AdminSection.tsx', reason: 'Componente vacío, reemplazado por AdminNavigation' },
    { path: 'src/components/layout/sidebars/AdminSidebar.tsx', reason: 'Duplicado de funcionalidad (actualizar o eliminar)' },
    { path: 'src/components/shared/AdminDataTable.tsx', reason: 'Posible duplicado con EditableDataTable' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Componentes Sin Usar</CardTitle>
        <CardDescription>
          Componentes que podrían ser obsoletos o no estar siendo utilizados en la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {unusedComponents.map((component, index) => (
            <div 
              key={index} 
              className="flex items-start p-4 rounded-md border border-border bg-card/50 hover:bg-muted/50 transition-colors"
            >
              <FileX className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-mono text-sm">{component.path}</div>
                <p className="text-sm text-muted-foreground mt-1">{component.reason}</p>
                <div className="flex gap-2 mt-2">
                  <button className="text-xs text-blue-500 hover:text-blue-700">Ver código</button>
                  <button className="text-xs text-green-500 hover:text-green-700">Marcar como revisado</button>
                  <button className="text-xs text-red-500 hover:text-red-700">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Componente provisional para la pestaña de problemas generales
const GeneralIssuesTab: React.FC = () => {
  const generalIssues = [
    { 
      type: 'warning', 
      title: 'Componentes demasiado grandes', 
      description: 'Algunos componentes exceden el tamaño recomendado de 250 líneas',
      items: [
        'src/components/error-tracking/BrokenLinkMonitor.tsx (272 líneas)',
        'src/pages/admin/dashboard/index.tsx (348 líneas)'
      ]
    },
    { 
      type: 'error', 
      title: 'Posibles conflictos de estilos', 
      description: 'Componentes que podrían tener conflictos de estilos',
      items: [
        'Conflicto entre .sidebar-nav y .side-navigation',
        'Anidación excesiva de contenedores flexbox'
      ]
    },
    { 
      type: 'info', 
      title: 'Optimizaciones pendientes', 
      description: 'Componentes que podrían beneficiarse de optimización',
      items: [
        'Los componentes de tabla no implementan virtualización',
        'Faltan lazy loading en secciones grandes de la navegación'
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Problemas Generales</CardTitle>
        <CardDescription>
          Problemas de código, arquitectura o rendimiento detectados en la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {generalIssues.map((issue, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className={`px-4 py-3 ${
                issue.type === 'error' ? 'bg-red-50 text-red-800 border-b border-red-200' :
                issue.type === 'warning' ? 'bg-amber-50 text-amber-800 border-b border-amber-200' :
                'bg-blue-50 text-blue-800 border-b border-blue-200'
              }`}>
                <h3 className="font-medium">{issue.title}</h3>
                <p className="text-sm">{issue.description}</p>
              </div>
              <div className="p-4 bg-card">
                <ul className="space-y-2">
                  {issue.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm flex items-start">
                      <span className="mr-2">•</span>
                      <span className="font-mono">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewElementsPage;
