
import React, { useState, useCallback, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  RefreshCw, 
  Download
} from 'lucide-react';
import { useRouteValidation } from '@/hooks/useRouteValidation';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const RouteValidator: React.FC = () => {
  const { validationResult, isValidating, lastValidated, runValidation } = useRouteValidation();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (!validationResult) {
      runValidation();
    }
  }, []);

  const handleExportReport = useCallback(() => {
    if (!validationResult) return;
    
    const report = {
      timestamp: new Date().toISOString(),
      result: validationResult
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `route-validation-report-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [validationResult]);

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'info':
        return 'bg-info/10 text-info border-info/20';
      default:
        return 'bg-muted';
    }
  };

  const filteredIssues = validationResult?.issues.filter(issue => {
    if (activeTab === 'all') return true;
    return issue.severity === activeTab;
  }) || [];

  return (
    <AdminPageLayout
      title="Route Validator"
      subtitle="Validate application routes and identify issues"
      actions={
        <>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportReport} 
            disabled={isValidating || !validationResult}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={runValidation} 
            disabled={isValidating}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isValidating ? 'animate-spin' : ''}`} />
            {isValidating ? 'Validating...' : 'Run Validation'}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Validation Summary</CardTitle>
            <CardDescription>
              {lastValidated 
                ? `Last run: ${lastValidated.toLocaleString()}` 
                : 'Not validated yet'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {validationResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status:</span>
                  <div className="flex items-center">
                    {validationResult.valid ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-success mr-2" />
                        <span className="text-success font-medium">Passed</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-destructive mr-2" />
                        <span className="text-destructive font-medium">Failed</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Errors:</span>
                    <Badge variant="destructive">{validationResult.stats.errors}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Warnings:</span>
                    <Badge variant="warning">{validationResult.stats.warnings}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Info:</span>
                    <Badge variant="info">{validationResult.stats.info}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total:</span>
                    <Badge variant="outline">{validationResult.stats.total}</Badge>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="text-sm font-medium mb-1">Validation Health</div>
                  <Progress
                    value={validationResult.valid ? 100 : Math.max(0, 100 - (validationResult.stats.errors * 25))}
                    className={`h-2 ${validationResult.valid ? 'bg-success' : 'bg-destructive'}`}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                {isValidating ? (
                  <>
                    <RefreshCw className="animate-spin h-10 w-10 text-primary mb-4" />
                    <p className="text-muted-foreground">
                      Validating routes...
                    </p>
                  </>
                ) : (
                  <>
                    <Info className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Click "Run Validation" to start.
                    </p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Route Issues</CardTitle>
            <CardDescription>
              Details of issues found during route validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {validationResult ? (
              <>
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">
                      All <Badge variant="outline" className="ml-2">{validationResult.stats.total}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="error">
                      Errors <Badge variant="destructive" className="ml-2">{validationResult.stats.errors}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="warning">
                      Warnings <Badge variant="warning" className="ml-2">{validationResult.stats.warnings}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="info">
                      Info <Badge variant="info" className="ml-2">{validationResult.stats.info}</Badge>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab} className="mt-0">
                    {filteredIssues.length > 0 ? (
                      <div className="space-y-4">
                        {filteredIssues.map((issue, index) => (
                          <div key={index} className={`p-4 border rounded-lg ${getSeverityColor(issue.severity)}`}>
                            <div className="flex items-start">
                              <div className="mr-3 mt-0.5">
                                {getSeverityIcon(issue.severity)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{issue.title}</h4>
                                <p className="mt-1 text-sm">{issue.description}</p>
                                {issue.path && (
                                  <div className="mt-2 bg-background/50 rounded p-1.5 text-xs font-mono">
                                    {issue.path}
                                  </div>
                                )}
                                {issue.recommendation && (
                                  <p className="mt-2 text-sm font-medium">
                                    Recommendation: {issue.recommendation}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <CheckCircle2 className="h-10 w-10 text-success mb-4" />
                        <p className="text-muted-foreground">
                          No issues found in this category!
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-10 text-center">
                {isValidating ? (
                  <RefreshCw className="animate-spin h-12 w-12 text-primary mb-4" />
                ) : (
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                )}
                <p className="text-muted-foreground mb-2">
                  {isValidating ? 'Validating routes...' : 'No validation data available'}
                </p>
                {!isValidating && (
                  <Button variant="outline" onClick={runValidation}>
                    Run Validation
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default RouteValidator;
