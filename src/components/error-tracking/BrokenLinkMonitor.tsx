
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link2, Search, FileWarning, RefreshCw, Download } from 'lucide-react';

interface BrokenLink {
  id: string;
  path: string;
  referrer: string;
  timestamp: string;
  count: number;
  lastOccurrence: string;
  status: 'active' | 'fixed' | 'ignored';
}

// Mock data - in a real app this would come from an API
const mockBrokenLinks: BrokenLink[] = [
  {
    id: '1',
    path: '/cursos/javascript-avanzado',
    referrer: '/cursos',
    timestamp: '2023-10-15T14:30:00',
    count: 23,
    lastOccurrence: '2023-10-18T09:15:00',
    status: 'active'
  },
  {
    id: '2',
    path: '/blog/desarrollo-web',
    referrer: '/blog',
    timestamp: '2023-10-12T10:45:00',
    count: 8,
    lastOccurrence: '2023-10-17T16:20:00',
    status: 'active'
  },
  {
    id: '3',
    path: '/admin/usuarios',
    referrer: '/admin/dashboard',
    timestamp: '2023-10-10T08:15:00',
    count: 3,
    lastOccurrence: '2023-10-10T14:30:00',
    status: 'fixed'
  },
  {
    id: '4',
    path: '/profile/settings/notifications',
    referrer: '/profile/settings',
    timestamp: '2023-10-08T11:22:00',
    count: 12,
    lastOccurrence: '2023-10-16T18:45:00',
    status: 'ignored'
  }
];

const BrokenLinkMonitor: React.FC = () => {
  const [brokenLinks, setBrokenLinks] = useState<BrokenLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'fixed' | 'ignored'>('all');

  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    setTimeout(() => {
      setBrokenLinks(mockBrokenLinks);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter from the backend
    console.log('Searching for:', searchTerm);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate fetching fresh data
    setTimeout(() => {
      setBrokenLinks(mockBrokenLinks);
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    // In a real app, this would generate a CSV of broken links
    console.log('Exporting broken links data');
  };

  const handleStatusChange = (id: string, newStatus: 'active' | 'fixed' | 'ignored') => {
    // Update status of a broken link
    setBrokenLinks(links =>
      links.map(link =>
        link.id === id ? { ...link, status: newStatus } : link
      )
    );
  };

  const filteredLinks = brokenLinks.filter(link => {
    const matchesSearch = searchTerm === '' || 
      link.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.referrer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || link.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <Link2 className="h-5 w-5 text-primary" />
          Monitor de Enlaces Rotos
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8" 
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar enlaces..."
              className="pl-8 h-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="flex items-center gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todos
            </Button>
            <Button 
              variant={filter === 'active' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('active')}
              className="text-red-500 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700"
            >
              Activos
            </Button>
            <Button 
              variant={filter === 'fixed' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('fixed')}
              className="text-green-500 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700"
            >
              Corregidos
            </Button>
            <Button 
              variant={filter === 'ignored' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('ignored')}
              className="text-gray-500 border-gray-200 bg-gray-50 hover:bg-gray-100 hover:text-gray-700"
            >
              Ignorados
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileWarning className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No se encontraron enlaces rotos que coincidan con tu búsqueda</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ruta</TableHead>
                <TableHead>Referencia</TableHead>
                <TableHead>Ocurrencias</TableHead>
                <TableHead>Último</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLinks.map(link => (
                <TableRow key={link.id}>
                  <TableCell className="font-mono text-sm">{link.path}</TableCell>
                  <TableCell className="font-mono text-sm">{link.referrer}</TableCell>
                  <TableCell>{link.count}</TableCell>
                  <TableCell>{new Date(link.lastOccurrence).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      link.status === 'active' ? 'bg-red-100 text-red-800' :
                      link.status === 'fixed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {link.status === 'active' ? 'Activo' :
                       link.status === 'fixed' ? 'Corregido' : 'Ignorado'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {link.status !== 'fixed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-green-500 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleStatusChange(link.id, 'fixed')}
                        >
                          Marcar como corregido
                        </Button>
                      )}
                      {link.status !== 'ignored' && link.status !== 'fixed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                          onClick={() => handleStatusChange(link.id, 'ignored')}
                        >
                          Ignorar
                        </Button>
                      )}
                      {link.status !== 'active' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleStatusChange(link.id, 'active')}
                        >
                          Reactivar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BrokenLinkMonitor;
