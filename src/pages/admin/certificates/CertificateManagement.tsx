
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Award, Search, FileCheck, Ban, Clock, RefreshCw } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface Certificate {
  id: string;
  certificate_number: string;
  issue_date: string;
  expiry_date: string | null;
  status: 'issued' | 'revoked' | 'expired';
  user: {
    full_name: string;
    email: string;
  };
  course: {
    title: string;
  };
}

const CertificateManagement: React.FC = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    fetchCertificates();
  }, []);
  
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          id,
          certificate_number,
          issue_date,
          expiry_date,
          status,
          profiles:user_id (
            full_name,
            email
          ),
          courses:course_id (
            title
          )
        `)
        .order('issue_date', { ascending: false });
      
      if (error) throw error;
      
      // Transformar los datos para facilitar el acceso
      const formattedData = data.map((cert: any) => ({
        id: cert.id,
        certificate_number: cert.certificate_number,
        issue_date: cert.issue_date,
        expiry_date: cert.expiry_date,
        status: cert.status,
        user: {
          full_name: cert.profiles?.full_name || 'Usuario desconocido',
          email: cert.profiles?.email || 'Sin email'
        },
        course: {
          title: cert.courses?.title || 'Curso desconocido'
        }
      }));
      
      setCertificates(formattedData);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredCertificates = certificates.filter(cert => {
    // Filtrar por búsqueda
    const matchesSearch = 
      cert.certificate_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.course.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtrar por estado (tab)
    const matchesTab = 
      activeTab === 'all' || 
      cert.status === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  const certificateStats = {
    all: certificates.length,
    issued: certificates.filter(c => c.status === 'issued').length,
    revoked: certificates.filter(c => c.status === 'revoked').length,
    expired: certificates.filter(c => c.status === 'expired').length
  };
  
  const handleVerifyCertificate = (id: string) => {
    navigate(`/admin/certificates/verify/${id}`);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Certificados</h1>
          <p className="text-muted-foreground mt-1">
            Administre los certificados emitidos en la plataforma
          </p>
        </div>
        
        <Button onClick={fetchCertificates} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">{certificateStats.all}</CardTitle>
            <CardDescription>Total de certificados</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">{certificateStats.issued}</CardTitle>
            <CardDescription className="flex items-center">
              <FileCheck className="h-4 w-4 mr-1 text-green-600" />
              Certificados vigentes
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-amber-600">{certificateStats.expired}</CardTitle>
            <CardDescription className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-amber-600" />
              Certificados expirados
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-red-600">{certificateStats.revoked}</CardTitle>
            <CardDescription className="flex items-center">
              <Ban className="h-4 w-4 mr-1 text-red-600" />
              Certificados revocados
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Listado de Certificados</CardTitle>
          <CardDescription>
            Busque y verifique los certificados emitidos en la plataforma
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Buscar por número, estudiante o curso..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
                <TabsTrigger value="all">
                  Todos <Badge className="ml-1 bg-primary/10">{certificateStats.all}</Badge>
                </TabsTrigger>
                <TabsTrigger value="issued">
                  Vigentes <Badge className="ml-1 bg-green-100 text-green-800">{certificateStats.issued}</Badge>
                </TabsTrigger>
                <TabsTrigger value="expired">
                  Expirados <Badge className="ml-1 bg-amber-100 text-amber-800">{certificateStats.expired}</Badge>
                </TabsTrigger>
                <TabsTrigger value="revoked">
                  Revocados <Badge className="ml-1 bg-red-100 text-red-800">{certificateStats.revoked}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableCaption>Lista de certificados emitidos en la plataforma.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número de Certificado</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha de Emisión</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCertificates.length > 0 ? (
                    filteredCertificates.map(cert => (
                      <TableRow key={cert.id}>
                        <TableCell>{cert.certificate_number}</TableCell>
                        <TableCell>
                          <div>
                            <div>{cert.user.full_name}</div>
                            <div className="text-xs text-muted-foreground">{cert.user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{cert.course.title}</TableCell>
                        <TableCell>
                          {cert.status === 'issued' ? (
                            <Badge className="bg-green-100 text-green-800">
                              <FileCheck className="h-3 w-3 mr-1" /> Vigente
                            </Badge>
                          ) : cert.status === 'revoked' ? (
                            <Badge className="bg-red-100 text-red-800">
                              <Ban className="h-3 w-3 mr-1" /> Revocado
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800">
                              <Clock className="h-3 w-3 mr-1" /> Expirado
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{new Date(cert.issue_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleVerifyCertificate(cert.id)}
                          >
                            <Search className="h-4 w-4 mr-1" />
                            Verificar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Award className="h-8 w-8 text-muted-foreground mb-2" />
                          <p>No se encontraron certificados.</p>
                          {searchQuery && (
                            <Button 
                              variant="link" 
                              onClick={() => {
                                setSearchQuery('');
                                setActiveTab('all');
                              }}
                            >
                              Limpiar filtros
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateManagement;
