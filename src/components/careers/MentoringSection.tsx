
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  specialties: string[];
  image_url: string;
  available: boolean;
  completed_sessions: number;
  next_availability: string;
}

interface MentorCardProps {
  mentor: Mentor;
  onSchedule: (mentorId: string) => void;
}

const MentorCard = ({ mentor, onSchedule }: MentorCardProps) => {
  const initials = mentor.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  // Formatear la fecha de disponibilidad
  const formatDate = (dateString: string) => {
    if (!dateString) return "No disponible";
    
    const date = new Date(dateString);
    // Si la fecha es inválida, devolver un mensaje de error
    if (isNaN(date.getTime())) return "Fecha no disponible";
    
    return new Intl.DateTimeFormat('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={mentor.image_url} alt={mentor.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{mentor.name}</CardTitle>
              <CardDescription>{mentor.role} @ {mentor.company}</CardDescription>
            </div>
          </div>
          {mentor.available ? (
            <Badge variant="outline" className="bg-green-100 text-green-800">Disponible</Badge>
          ) : (
            <Badge variant="secondary">Ocupado</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-3">
          {mentor.specialties.map((specialty, index) => (
            <Badge key={index} variant="outline">{specialty}</Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" /> 
            <span>{mentor.completed_sessions} sesiones completadas</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> 
            <span>Próxima disponibilidad:</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" /> 
            <span>{formatDate(mentor.next_availability)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          className="w-full" 
          variant={mentor.available ? "default" : "outline"}
          disabled={!mentor.available}
          onClick={() => onSchedule(mentor.id)}
        >
          {mentor.available ? "Agendar sesión" : "Unirse a lista de espera"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const MentoringSection: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const { data, error } = await supabase
          .from('mentors')
          .select('*')
          .order('available', { ascending: false })
          .limit(6);

        if (error) throw error;
        setMentors(data || []);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los mentores');
        console.error('Error fetching mentors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleSchedule = (mentorId: string) => {
    // Aquí se implementaría la lógica para programar una sesión
    // Por ahora solo mostraremos un toast
    toast.success(`Solicitud enviada al mentor correctamente`);
    console.log(`Programar sesión con mentor: ${mentorId}`);
  };

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
          <h2 className="text-2xl font-bold">Mentorías Profesionales</h2>
          <p className="text-muted-foreground">Aprende de profesionales experimentados en tu campo</p>
        </div>
        <Button>Ver todos los mentores</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} onSchedule={handleSchedule} />
        ))}
      </div>
    </div>
  );
};

export default MentoringSection;
