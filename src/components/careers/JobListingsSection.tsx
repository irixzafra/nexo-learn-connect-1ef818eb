
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Briefcase, Clock, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  is_remote: boolean;
  contract_type: string;
  posted_at: string;
  is_featured: boolean;
  category: string;
  salary_range: {
    min: number;
    max: number;
    currency: string;
  };
  application_url: string;
  company_logo_url: string;
}

interface JobListingCardProps {
  job: JobListing;
}

const JobListingCard = ({ job }: JobListingCardProps) => {
  // Formatear la fecha
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Fecha no disponible";
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "1 día atrás";
    return `${diffDays} días atrás`;
  };

  return (
    <Card className={job.is_featured ? "border-primary" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="mb-1">{job.title}</CardTitle>
            <CardDescription className="flex items-center">
              <Building className="h-4 w-4 mr-1" />
              {job.company}
            </CardDescription>
          </div>
          {job.is_featured && (
            <Badge variant="default" className="ml-2">
              Destacado
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" /> {job.is_remote ? "Remoto" : job.location}
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" /> {job.contract_type || "Tiempo Completo"}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" /> {getTimeAgo(job.posted_at)}
          </div>
        </div>
        <p className="text-sm mb-3">{job.description.length > 150 ? `${job.description.substring(0, 150)}...` : job.description}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {job.category && <Badge variant="secondary">{job.category}</Badge>}
          {job.salary_range && (
            <Badge variant="outline">
              {job.salary_range.min.toLocaleString('es-ES')} - {job.salary_range.max.toLocaleString('es-ES')} {job.salary_range.currency}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          Ver detalles
        </Button>
        <Button 
          size="sm"
          onClick={() => window.open(job.application_url, '_blank')}
        >
          Aplicar <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const JobListingsSection: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('job_listings')
          .select('*')
          .order('is_featured', { ascending: false })
          .limit(6);

        if (error) throw error;
        setJobs(data || []);
      } catch (err: any) {
        setError(err.message || 'Error al cargar las ofertas de trabajo');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 text-center">
        <p className="text-destructive">Error: {error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ofertas de Empleo</h2>
          <p className="text-muted-foreground">Descubre nuevas oportunidades profesionales</p>
        </div>
        <Button>Ver todas las ofertas</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobListingCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListingsSection;
