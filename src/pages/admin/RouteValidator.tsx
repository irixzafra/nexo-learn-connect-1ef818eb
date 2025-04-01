
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  RefreshCw,
  Link2,
  FileWarning,
  LucideDownload
} from 'lucide-react';
import { useRouteValidation } from '@/hooks/useRouteValidation';
import { RouteIssueType } from '@/utils/routeValidation';
import AdminPageLayout from '@/layouts/AdminPageLayout';

const RouteValidator: React.FC = () => {
  const { validationResult, isValidating, runValidation } = useRouteValidation();
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');
  
  const handleValidate = () => {
    runValidation();
  };
  
  const getSeverityIcon = (severity: 'error' | 'warning' | 'info') => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'info':
        return <Info className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };
  
  const getIssueTypeLabel = (type: RouteIssueType) => {
    switch (type) {
      case RouteIssueType.BROKEN_LINK:
        return <Badge variant="destructive" className="flex items-center gap-1">
          <Link2 className="h-3 w-3" />
          Enlace roto
        </Badge>;
      case RouteIssueType.DUPLICATE_ROUTE:
        return <Badge variant="warning" className="bg-amber-100 text-amber-800 flex items-center gap-1">
          <FileWarning className="h-3 w-3" />
          Duplicado
        </Badge>;
      case RouteIssueType.DEPRECATED_ROUTE:
        return <Badge variant="outline" className="flex items-center gap-1">
          Obsoleto
        </Badge>;
      case RouteIssueType.MISSING_ROLE_CHECK:
        return <Badge variant="warning" className="bg-amber-100 text-amber-800 flex items-center gap-1">
          Sin control de rol
        </Badge>;
      case RouteIssueType.INCONSISTENT_NAMING:
        return <Badge variant="outline" className="flex items-center gap-1">
          Nomenclatura
        </Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };
  
  const handleExport = () => {
    if (!validationResult) return;
    
    let data;
    let fileName;
    let mimeType;
    
    if (exportFormat === 'json') {
      data = JSON.stringify(validationResult, null, 2);
      fileName = 'route-validation-results.json';
      mimeType = 'application/json';
    } else {
      // Create CSV
      const headers = ['path', 'type', 'severity', 'message', 'suggestion', 'location'];
      const csvRows = [
        headers.join(','),
        ...validationResult.issues.map(issue => {
          return [
            `"${issue.path}"`,
            `"${issue.type}"`,
            `"${issue.severity}"`,
            `"${issue.message}"`,
            `"${issue.suggestion || ''}"`,
            `"${issue.location || ''}"`,
          ].join(',');
        })
      ];
      data = csvRows.join('\n');
      fileName = 'route-validation-results.csv';
      mimeType = 'text/csv';
    }
    
    // Create and download the file
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <AdminPageLayout
      title="Validador de Rutas"
      subtitle="Comprueba la validez de las rutas de navegación del sistema"
      backAction={{
        label: "Volver a Navegación",
        onClick: () => window.location.href = "/admin/navigation"
      }}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Validación de Rutas</span>
              <Button 
                variant="outline" 
                onClick={handleValidate} 
                disabled={isValidating}
                className="flex items-center gap-2"
              >
                {isValidating ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {isValidating ? 'Validando...' : 'Ejecutar Validación'}
              </Button>
            </CardTitle>
            <CardDescription>
              Esta herramienta analiza todas las rutas definidas en la configuración de navegación 
              para detectar posibles problemas como enlaces rotos, rutas duplicadas o inconsistencias.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!validationResult && !isValidating && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Sin datos de validación</AlertTitle>
                <AlertDescription>
                  Haz clic en "Ejecutar Validación" para comprobar las rutas del sistema.
                </AlertDescription>
              </Alert>
            )}
            
            {validationResult && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {validationResult.valid ? (
                      <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-300">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Todas las rutas son válidas</AlertTitle>
                        <AlertDescription>
                          No se encontraron problemas en las rutas de navegación.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-300">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Se encontraron problemas en las rutas</AlertTitle>
                        <AlertDescription>
                          Se detectaron {validationResult.stats.total} problemas en las rutas de navegación.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  {validationResult.issues.length > 0 && (
                    <div className="flex items-center gap-2">
                      <select 
                        className="border rounded px-2 py-1 text-sm"
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
                      >
                        <option value="json">JSON</option>
                        <option value="csv">CSV</option>
                      </select>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleExport}
                        className="flex items-center gap-1"
                      >
                        <LucideDownload className="h-4 w-4" />
                        Exportar
                      </Button>
                    </div>
                  )}
                </div>
                
                {validationResult.issues.length > 0 && (
                  <div className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Severidad</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Ruta</TableHead>
                          <TableHead>Mensaje</TableHead>
                          <TableHead>Sugerencia</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {validationResult.issues.map((issue, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex items-center">
                                {getSeverityIcon(issue.severity)}
                              </div>
                            </TableCell>
                            <TableCell>{getIssueTypeLabel(issue.type)}</TableCell>
                            <TableCell className="font-mono text-xs">{issue.path}</TableCell>
                            <TableCell>{issue.message}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{issue.suggestion}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                    Errores: {validationResult.stats.errors}
                  </Badge>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    Advertencias: {validationResult.stats.warnings}
                  </Badge>
                  <Badge variant="outline" className="bg-muted text-muted-foreground">
                    Información: {validationResult.stats.info}
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default RouteValidator;
