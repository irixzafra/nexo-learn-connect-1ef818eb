
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateRoute, validateRoutes, RouteIssue } from '@/utils/routeValidation';
import { Badge } from '@/components/ui/badge';
import { Link2, CheckCircle2, XCircle, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { routeMap } from '@/utils/routeUtils';
import { toast } from 'sonner';

const LinkDiagnostics: React.FC = () => {
  const [routeToCheck, setRouteToCheck] = useState<string>('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [allRoutes, setAllRoutes] = useState<string[]>([]);
  
  // Extraer todas las rutas del routeMap al cargar
  useEffect(() => {
    const routes = Object.values(routeMap)
      .filter(route => typeof route === 'string')
      .map(route => route as string);
    setAllRoutes(routes);
  }, []);
  
  // Validar una ruta específica
  const handleValidateSingleRoute = () => {
    if (!routeToCheck.trim()) {
      toast.error('Por favor ingresa una ruta para validar');
      return;
    }
    
    setIsValidating(true);
    const result = validateRoute(routeToCheck, true);
    setValidationResult(result);
    setIsValidating(false);
  };
  
  // Validar todas las rutas
  const handleValidateAllRoutes = () => {
    setIsValidating(true);
    const result = validateRoutes(allRoutes);
    setValidationResult(result);
    setIsValidating(false);
  };
  
  // Manejar tecla Enter en el input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleValidateSingleRoute();
    }
  };
  
  // Filtrar problemas según la pestaña activa
  const getFilteredIssues = () => {
    if (!validationResult?.issues) return [];
    
    return validationResult.issues.filter((issue: RouteIssue) => {
      if (activeTab === 'all') return true;
      return issue.severity === activeTab;
    });
  };
  
  // Renderizar un ícono según la severidad
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'info':
        return <Info className="h-5 w-5 text-info" />;
      default:
        return null;
    }
  };
  
  return (
    <AdminPageLayout 
      title="Diagnóstico de Enlaces" 
      subtitle="Validación y detección de problemas en rutas y enlaces"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Validación de Rutas
            </CardTitle>
            <CardDescription>
              Comprueba si una ruta específica o todas las rutas son válidas en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="/ruta/a/validar" 
                  value={routeToCheck}
                  onChange={(e) => setRouteToCheck(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button 
                  onClick={handleValidateSingleRoute} 
                  disabled={isValidating || !routeToCheck.trim()}
                >
                  Validar Ruta
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {validationResult ? (
                    <>
                      Se encontraron {validationResult.issues.length} problemas
                      <span className="ml-2">
                        {validationResult.valid ? (
                          <Badge variant="success" className="ml-2">Válido</Badge>
                        ) : (
                          <Badge variant="destructive" className="ml-2">Inválido</Badge>
                        )}
                      </span>
                    </>
                  ) : (
                    'Ingresa una ruta para validar o valida todas las rutas del sistema'
                  )}
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleValidateAllRoutes}
                  disabled={isValidating}
                >
                  Validar Todas las Rutas
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {validationResult && (
          <Card>
            <CardHeader>
              <CardTitle>Resultados de Validación</CardTitle>
              <CardDescription>
                Se encontraron {validationResult.issues.length} problemas en {allRoutes.length} rutas
              </CardDescription>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">
                    Todos <Badge variant="outline" className="ml-1">{validationResult.stats.total}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="error">
                    Errores <Badge variant="destructive" className="ml-1">{validationResult.stats.errors}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="warning">
                    Advertencias <Badge variant="warning" className="ml-1">{validationResult.stats.warnings}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="info">
                    Info <Badge variant="info" className="ml-1">{validationResult.stats.info}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto">
              {getFilteredIssues().length > 0 ? (
                <div className="space-y-3">
                  {getFilteredIssues().map((issue: RouteIssue, index: number) => (
                    <div 
                      key={index} 
                      className={`p-3 border rounded-md ${
                        issue.severity === 'error' ? 'border-destructive/30 bg-destructive/5' :
                        issue.severity === 'warning' ? 'border-warning/30 bg-warning/5' :
                        'border-info/30 bg-info/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getSeverityIcon(issue.severity)}</div>
                        <div>
                          <div className="font-medium">
                            {issue.title || `Problema en ruta: ${issue.path}`}
                          </div>
                          <div className="text-sm mt-1">{issue.message}</div>
                          {issue.suggestion && (
                            <div className="text-sm font-medium mt-2">
                              Sugerencia: {issue.suggestion}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-success mb-2" />
                  <p className="text-muted-foreground">No se encontraron problemas en esta categoría</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-end">
          <Button variant="outline" asChild>
            <a href="/docs/MAPA_DE_RUTAS.md" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Ver Mapa de Rutas
            </a>
          </Button>
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default LinkDiagnostics;
