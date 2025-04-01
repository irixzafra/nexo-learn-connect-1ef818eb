
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  ExternalLink, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Share2, 
  Maximize2 
} from 'lucide-react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { useValidateRoutes } from '@/hooks/useValidateRoutes';
import { mainNavigation, adminNavigation } from '@/config/navigation';
import { routeMap } from '@/utils/routeUtils';

const NavigationDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [zoomLevel, setZoomLevel] = useState(100);
  const adminRoutesValidated = useValidateRoutes(adminNavigation);
  const mainRoutesValidated = useValidateRoutes(mainNavigation);
  
  const handleZoomIn = () => {
    if (zoomLevel < 200) setZoomLevel(zoomLevel + 10);
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > 50) setZoomLevel(zoomLevel - 10);
  };
  
  const exportDiagram = () => {
    // In a real implementation, this would export the diagram
    console.log('Export diagram functionality would go here');
    alert('Export feature will be implemented soon');
  };
  
  // Count routes by type
  const routeStats = {
    total: Object.keys(routeMap).length,
    dynamic: Object.values(routeMap).filter(route => 
      typeof route === 'function' || (typeof route === 'string' && route.includes(':'))
    ).length,
    static: Object.values(routeMap).filter(route => 
      typeof route === 'string' && !route.includes(':')
    ).length
  };
  
  return (
    <AdminPageLayout
      title="Navigation Diagram"
      subtitle="Visualize and analyze the application's routing structure"
      backAction={{
        label: "Back to Navigation",
        onClick: () => window.location.href = "/admin/navigation"
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <Card className="w-full md:w-3/4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Navigation Structure</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{zoomLevel}%</span>
                  <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={exportDiagram}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                Interactive visualization of all application routes and their relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="map">Route Map</TabsTrigger>
                  <TabsTrigger value="tree">Tree View</TabsTrigger>
                  <TabsTrigger value="flow">Flow Diagram</TabsTrigger>
                </TabsList>
                
                <TabsContent value="map" className="h-[500px] border rounded-md p-4">
                  <div 
                    className="h-full overflow-auto" 
                    style={{transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left'}}
                  >
                    <div className="text-center text-muted-foreground p-6">
                      <Activity className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                      <p>Route map visualization will be implemented soon.</p>
                      <p className="text-sm">This will display a visual map of all application routes.</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tree" className="h-[500px] border rounded-md p-4">
                  <div className="h-full overflow-auto">
                    <ul className="space-y-2 text-sm">
                      <li className="font-semibold">Main Routes</li>
                      <ul className="pl-4 space-y-1">
                        {mainRoutesValidated.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span className={item.active ? "text-primary font-medium" : ""}>
                              {item.title} {item.path && <span className="text-xs text-muted-foreground">({item.path})</span>}
                            </span>
                            {item.isExternal && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                          </li>
                        ))}
                      </ul>
                      
                      <li className="font-semibold mt-4">Admin Routes</li>
                      <ul className="pl-4 space-y-1">
                        {adminRoutesValidated.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span className={item.active ? "text-primary font-medium" : ""}>
                              {item.title} {item.path && <span className="text-xs text-muted-foreground">({item.path})</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="flow" className="h-[500px] border rounded-md p-4">
                  <div className="text-center text-muted-foreground p-6">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                    <p>Flow diagram will be implemented soon.</p>
                    <p className="text-sm">This will show the flow between different routes and page transitions.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="w-full md:w-1/4">
            <CardHeader>
              <CardTitle>Route Statistics</CardTitle>
              <CardDescription>Summary of application routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Routes:</span>
                    <span className="font-medium">{routeStats.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Static Routes:</span>
                    <span className="font-medium">{routeStats.static}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dynamic Routes:</span>
                    <span className="font-medium">{routeStats.dynamic}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Route Analysis</h4>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = "/admin/route-validator"}
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    Run Route Validation
                  </Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Advanced Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Share2 className="mr-2 h-4 w-4" />
                      Export Route Map
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default NavigationDiagram;
