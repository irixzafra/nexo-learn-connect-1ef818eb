
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  Check, 
  ExternalLink, 
  FileQuestion, 
  FileWarning, 
  Info, 
  RefreshCw, 
  X 
} from 'lucide-react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { useRouteValidation } from '@/hooks/useRouteValidation';
import SafeLink from '@/components/SafeLink';

// Define Route Issue types for display purposes
type RouteIssueDisplayType = 'error' | 'warning' | 'info';

const getIssueIcon = (type: RouteIssueDisplayType) => {
  switch (type) {
    case 'error': return <X className="h-4 w-4 text-destructive" />;
    case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
    case 'info': return <Info className="h-4 w-4 text-info" />;
    default: return <FileQuestion className="h-4 w-4" />;
  }
};

const RouteValidator: React.FC = () => {
  const { validationResult, isValidating, lastValidated, runValidation } = useRouteValidation();
  const [activeTab, setActiveTab] = useState('all');
  
  // Function to get variant for badge based on issue type
  const getIssueVariant = (type: RouteIssueDisplayType) => {
    switch (type) {
      case 'error': return 'destructive';
      case 'warning': return 'default';
      case 'info': return 'secondary';
      default: return 'outline';
    }
  };
  
  return (
    <AdminPageLayout
      title="Route Validator"
      subtitle="Check and validate all application routes"
      actions={
        <Button 
          onClick={runValidation} 
          disabled={isValidating}
          variant="default"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isValidating ? 'animate-spin' : ''}`} />
          {isValidating ? 'Validating...' : 'Validate Routes'}
        </Button>
      }
    >
      <div className="space-y-6">
        {!validationResult && !isValidating && (
          <Alert>
            <AlertTitle>No validation performed yet</AlertTitle>
            <AlertDescription>
              Click the "Validate Routes" button to check all application routes for potential issues.
            </AlertDescription>
          </Alert>
        )}
        
        {isValidating && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-8">
                <Activity className="h-12 w-12 animate-pulse text-primary mb-4" />
                <h3 className="text-lg font-medium">Validating Routes...</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  This may take a moment depending on the number of routes.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {validationResult && !isValidating && (
          <>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  {validationResult.valid ? (
                    <>
                      <Check className="h-5 w-5 text-success" />
                      All Routes Valid
                    </>
                  ) : (
                    <>
                      <FileWarning className="h-5 w-5 text-warning" />
                      Route Issues Detected
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {lastValidated && (
                    <span>Last validated: {lastValidated.toLocaleString()}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-background rounded-lg p-4 border">
                    <div className="text-2xl font-bold">{validationResult.stats.total}</div>
                    <div className="text-sm text-muted-foreground">Total Issues</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border">
                    <div className="text-2xl font-bold text-destructive">
                      {validationResult.stats.errors}
                    </div>
                    <div className="text-sm text-muted-foreground">Errors</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border">
                    <div className="text-2xl font-bold text-warning">
                      {validationResult.stats.warnings}
                    </div>
                    <div className="text-sm text-muted-foreground">Warnings</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={runValidation}
                >
                  Run Validation Again
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Route Issues</CardTitle>
                <CardDescription>
                  List of potential issues found in the application routes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Issues</TabsTrigger>
                    <TabsTrigger value="errors">Errors</TabsTrigger>
                    <TabsTrigger value="warnings">Warnings</TabsTrigger>
                    <TabsTrigger value="info">Info</TabsTrigger>
                  </TabsList>
                  
                  {['all', 'errors', 'warnings', 'info'].map((tabValue) => (
                    <TabsContent key={tabValue} value={tabValue}>
                      {validationResult.issues.length === 0 ? (
                        <div className="text-center py-6">
                          <Check className="h-12 w-12 mx-auto text-success opacity-50 mb-4" />
                          <p className="text-lg font-medium">No issues found!</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            All routes appear to be valid and follow best practices.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {validationResult.issues
                            .filter(issue => 
                              tabValue === 'all' || 
                              issue.severity === (tabValue === 'errors' ? 'error' : 
                                                 tabValue === 'warnings' ? 'warning' : 'info')
                            )
                            .map((issue, idx) => (
                              <div 
                                key={idx} 
                                className="p-4 border rounded-lg flex flex-col gap-2"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-2">
                                    {getIssueIcon(issue.severity as RouteIssueDisplayType)}
                                    <span className="font-medium">{issue.title}</span>
                                    <Badge variant={getIssueVariant(issue.severity as RouteIssueDisplayType)}>
                                      {issue.severity}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground ml-6">
                                  {issue.description}
                                </p>
                                {issue.path && (
                                  <div className="ml-6 mt-1 flex items-center gap-2">
                                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                                      {issue.path}
                                    </code>
                                    <SafeLink 
                                      to={issue.path} 
                                      showWarning={false}
                                      className="text-xs text-primary hover:underline"
                                    >
                                      <ExternalLink className="h-3 w-3 inline-block" />
                                    </SafeLink>
                                  </div>
                                )}
                                {issue.recommendation && (
                                  <div className="ml-6 mt-1 text-xs text-muted-foreground">
                                    <strong>Recommendation:</strong> {issue.recommendation}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminPageLayout>
  );
};

export default RouteValidator;
