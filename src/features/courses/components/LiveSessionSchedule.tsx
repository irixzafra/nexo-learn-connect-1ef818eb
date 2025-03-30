
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { VideoCameraIcon, ExternalLink, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface LiveSession {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  meeting_url?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  course_id: string;
}

interface LiveSessionScheduleProps {
  courseId: string;
}

export function LiveSessionSchedule({ courseId }: LiveSessionScheduleProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const { data: liveSessions, isLoading } = useQuery({
    queryKey: ['liveSessions', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('live_sessions')
        .select('*')
        .eq('course_id', courseId)
        .order('start_time', { ascending: true });
      
      if (error) {
        console.error('Error fetching live sessions:', error);
        throw error;
      }
      
      return data as LiveSession[];
    },
    // In a real application, fetchLiveSessions would make an API call
    // This is a placeholder to show how it would be implemented
    enabled: false, // Disable this query since we don't have the table yet
  });
  
  // Dummy data for development
  const dummyLiveSessions: LiveSession[] = [
    {
      id: '1',
      title: 'Introducción al curso',
      description: 'Sesión inicial donde presentaremos los objetivos y metodología del curso.',
      start_time: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days in the future
      end_time: new Date(Date.now() + 86400000 * 2 + 3600000).toISOString(), // 1 hour later
      meeting_url: 'https://zoom.us/j/123456789',
      status: 'scheduled',
      course_id: courseId
    },
    {
      id: '2',
      title: 'Resolución de dudas - Módulo 1',
      description: 'Sesión para resolver dudas sobre el primer módulo del curso.',
      start_time: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days in the future
      end_time: new Date(Date.now() + 86400000 * 5 + 3600000).toISOString(), // 1 hour later
      meeting_url: 'https://zoom.us/j/987654321',
      status: 'scheduled',
      course_id: courseId
    },
    {
      id: '3',
      title: 'Workshop práctico',
      description: 'Sesión práctica donde aplicaremos los conceptos aprendidos.',
      start_time: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days in the future
      end_time: new Date(Date.now() + 86400000 * 10 + 7200000).toISOString(), // 2 hours later
      meeting_url: 'https://meet.google.com/abc-defg-hij',
      status: 'scheduled',
      course_id: courseId
    },
    {
      id: '4',
      title: 'Sesión de repaso',
      description: 'Repasaremos los conceptos clave del curso antes del proyecto final.',
      start_time: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days in the past
      end_time: new Date(Date.now() - 86400000 * 2 + 5400000).toISOString(), // 1.5 hours later
      meeting_url: 'https://teams.microsoft.com/l/meetup-join/12345',
      status: 'completed',
      course_id: courseId
    }
  ];
  
  const sessions = liveSessions || dummyLiveSessions;
  
  // Get sessions for the selected date
  const sessionsForSelectedDate = date 
    ? sessions.filter(session => {
        const sessionDate = parseISO(session.start_time);
        return isSameDay(sessionDate, date);
      })
    : [];
  
  // Get dates with sessions for calendar highlighting
  const datesWithSessions = sessions.map(session => parseISO(session.start_time));
  
  const getSessionStatusBadge = (status: LiveSession['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Programada</Badge>;
      case 'in_progress':
        return <Badge className="bg-green-500">En progreso</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-gray-100 text-gray-500">Completada</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelada</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <VideoCameraIcon className="h-5 w-5 text-primary" />
          Clases en vivo
        </CardTitle>
        <CardDescription>
          Calendario de sesiones programadas para este curso
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal mb-2"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  modifiers={{
                    hasSessions: datesWithSessions,
                  }}
                  modifiersStyles={{
                    hasSessions: {
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            
            <div className="mt-4">
              {sessionsForSelectedDate.length > 0 ? (
                <div className="space-y-3">
                  {sessionsForSelectedDate.map(session => (
                    <div key={session.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{session.title}</h4>
                        {getSessionStatusBadge(session.status)}
                      </div>
                      {session.description && (
                        <p className="text-sm text-muted-foreground">{session.description}</p>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {format(parseISO(session.start_time), 'HH:mm')} - {format(parseISO(session.end_time), 'HH:mm')}
                        </span>
                      </div>
                      {session.meeting_url && session.status !== 'completed' && (
                        <div className="pt-1">
                          <Button 
                            size="sm" 
                            className="w-full"
                            disabled={session.status === 'cancelled'}
                            onClick={() => window.open(session.meeting_url, '_blank')}
                          >
                            {session.status === 'in_progress' ? 'Unirse ahora' : 'Ver detalles'}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  No hay sesiones programadas para esta fecha.
                </div>
              )}
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Próximas sesiones</h3>
            <div className="space-y-3">
              {sessions
                .filter(session => {
                  const now = new Date();
                  const sessionStart = parseISO(session.start_time);
                  return sessionStart > now && session.status !== 'cancelled';
                })
                .slice(0, 3)
                .map(session => (
                  <div key={session.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="bg-primary/10 text-primary p-2 rounded-md flex-shrink-0">
                      <VideoCameraIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{session.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(parseISO(session.start_time), 'PPP', { locale: es })} • {format(parseISO(session.start_time), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                ))}
              
              {sessions.filter(session => {
                const now = new Date();
                const sessionStart = parseISO(session.start_time);
                return sessionStart > now && session.status !== 'cancelled';
              }).length === 0 && (
                <div className="text-center py-2 text-muted-foreground text-sm">
                  No hay próximas sesiones programadas.
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
