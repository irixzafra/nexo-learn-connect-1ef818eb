
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface RouteVisit {
  path: string;
  timestamp: number;
  stayDuration?: number;
}

interface RouteMetric {
  path: string;
  visits: number;
  avgDuration: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2', '#45B39D'];

export const RouteMetrics: React.FC = () => {
  const location = useLocation();
  const [visits, setVisits] = useLocalStorage<RouteVisit[]>('route-metrics-visits', []);
  const [currentVisit, setCurrentVisit] = useState<RouteVisit | null>(null);
  const [metrics, setMetrics] = useState<RouteMetric[]>([]);
  
  // Record page visits
  useEffect(() => {
    const now = Date.now();
    
    // If there was a previous visit, update its duration
    if (currentVisit) {
      const stayDuration = now - currentVisit.timestamp;
      setVisits(prev => 
        prev.map(visit => 
          visit === currentVisit 
            ? { ...visit, stayDuration } 
            : visit
        )
      );
    }
    
    // Record the new visit
    const newVisit: RouteVisit = {
      path: location.pathname,
      timestamp: now
    };
    
    setVisits(prev => [...prev, newVisit]);
    setCurrentVisit(newVisit);
    
    // Cleanup function to record duration when unmounting
    return () => {
      const endTime = Date.now();
      const stayDuration = endTime - now;
      
      setVisits(prev => 
        prev.map(visit => 
          visit === newVisit 
            ? { ...visit, stayDuration } 
            : visit
        )
      );
    };
  }, [location.pathname]);
  
  // Calculate metrics from visits
  useEffect(() => {
    const pathMetrics: { [path: string]: { visits: number, totalDuration: number } } = {};
    
    // Group by path and calculate visits and total duration
    visits.forEach(visit => {
      if (!pathMetrics[visit.path]) {
        pathMetrics[visit.path] = { visits: 0, totalDuration: 0 };
      }
      
      pathMetrics[visit.path].visits += 1;
      
      if (visit.stayDuration) {
        pathMetrics[visit.path].totalDuration += visit.stayDuration;
      }
    });
    
    // Convert to array and calculate average duration
    const metricsArray = Object.entries(pathMetrics).map(([path, data]) => ({
      path,
      visits: data.visits,
      avgDuration: data.totalDuration / data.visits / 1000 // in seconds
    }));
    
    // Sort by most visited
    metricsArray.sort((a, b) => b.visits - a.visits);
    
    setMetrics(metricsArray);
  }, [visits]);
  
  // Clear metrics
  const handleClearMetrics = () => {
    if (confirm('Are you sure you want to clear all route metrics data?')) {
      setVisits([]);
      setMetrics([]);
    }
  };
  
  // Format for more readable display
  const formatPath = (path: string) => {
    if (path === '/') return 'Home';
    return path.split('/').filter(Boolean).join(' / ');
  };
  
  // Format duration in human-readable format
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Route Analytics</CardTitle>
          <CardDescription>
            Page navigation metrics and user behavior
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleClearMetrics}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Data
        </Button>
      </CardHeader>
      <CardContent>
        {metrics.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No navigation data collected yet.</p>
            <p className="text-sm">Analytics will appear as you navigate through the application.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium mb-4">Most Visited Routes</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={metrics.slice(0, 10)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
                  >
                    <XAxis 
                      dataKey="path" 
                      angle={-45} 
                      textAnchor="end" 
                      tickFormatter={formatPath}
                      height={80}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [value, name === 'visits' ? 'Visits' : 'Avg. Duration']}
                      labelFormatter={formatPath}
                    />
                    <Bar dataKey="visits" fill="#8884d8" name="Visits" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-4">Visit Distribution</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={metrics.slice(0, 7)}
                      dataKey="visits"
                      nameKey="path"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ path }) => formatPath(path)}
                    >
                      {metrics.slice(0, 7).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [value, formatPath(props.payload.path)]} />
                    <Legend formatter={(value) => formatPath(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-4">Average Time Spent (seconds)</h4>
              <div className="space-y-2">
                {metrics.slice(0, 5).map((metric) => (
                  <div key={metric.path} className="flex justify-between items-center">
                    <span className="text-sm">{formatPath(metric.path)}</span>
                    <span className="font-medium">{formatDuration(metric.avgDuration)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteMetrics;
