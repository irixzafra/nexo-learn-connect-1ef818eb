
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  specialties: string[];
  image: string;
  available: boolean;
  sessions: number;
  nextAvailability: string;
}

const mentors: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Sara Fernández',
    role: 'Frontend Developer',
    company: 'TechCorp',
    specialties: ['React', 'UI/UX', 'Career Transition'],
    image: '',
    available: true,
    sessions: 24,
    nextAvailability: '23 Nov, 15:00'
  },
  {
    id: 'mentor-2',
    name: 'Miguel Torres',
    role: 'CTO',
    company: 'StartupHub',
    specialties: ['Leadership', 'Architecture', 'Scaling Teams'],
    image: '',
    available: true,
    sessions: 52,
    nextAvailability: '25 Nov, 10:00'
  },
  {
    id: 'mentor-3',
    name: 'Lucía Ramírez',
    role: 'Data Scientist',
    company: 'DataInnovate',
    specialties: ['Python', 'Machine Learning', 'Analytics'],
    image: '',
    available: false,
    sessions: 18,
    nextAvailability: '2 Dic, 17:30'
  }
];

const MentorCard = ({ mentor }: { mentor: Mentor }) => {
  const initials = mentor.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={mentor.image} alt={mentor.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{mentor.name}</CardTitle>
              <CardDescription>{mentor.role} @ {mentor.company}</CardDescription>
            </div>
          </div>
          {mentor.available ? (
            <Badge variant="success" className="bg-green-100 text-green-800">Disponible</Badge>
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
            <span>{mentor.sessions} sesiones completadas</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> 
            <span>Próxima disponibilidad:</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" /> 
            <span>{mentor.nextAvailability}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          className="w-full" 
          variant={mentor.available ? "default" : "outline"}
          disabled={!mentor.available}
        >
          {mentor.available ? "Agendar sesión" : "Unirse a lista de espera"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const MentoringSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Mentorías Profesionales</h2>
          <p className="text-muted-foreground">Aprende de profesionales experimentados en tu campo</p>
        </div>
        <Button>Ver todos los mentores</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default MentoringSection;
