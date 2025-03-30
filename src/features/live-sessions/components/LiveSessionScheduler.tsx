
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Clock, Loader2 } from 'lucide-react';

interface LiveSessionSchedulerProps {
  courseId: string;
  onSchedule: (session: {
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    meetingUrl?: string;
    meetingId?: string;
    meetingPassword?: string;
  }) => Promise<void>;
}

export function LiveSessionScheduler({ courseId, onSchedule }: LiveSessionSchedulerProps) {
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  
  const handleSchedule = async () => {
    if (!title || !startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }
    
    // Validate that end date is after start date
    const parsedStartTime = startTime.split(':').map(Number);
    const parsedEndTime = endTime.split(':').map(Number);
    
    const startDateTime = new Date(startDate);
    startDateTime.setHours(parsedStartTime[0], parsedStartTime[1], 0);
    
    const endDateTime = new Date(endDate);
    endDateTime.setHours(parsedEndTime[0], parsedEndTime[1], 0);
    
    if (endDateTime <= startDateTime) {
      toast({
        variant: "destructive",
        title: "Error en las fechas",
        description: "La fecha y hora de fin debe ser posterior a la fecha y hora de inicio.",
      });
      return;
    }
    
    setIsScheduling(true);
    
    try {
      await onSchedule({
        title,
        description,
        startTime: startDateTime,
        endTime: endDateTime,
        meetingUrl,
        meetingId,
        meetingPassword,
      });
      
      toast({
        title: "Sesión programada",
        description: "La sesión en directo ha sido programada con éxito.",
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setStartDate(undefined);
      setEndDate(undefined);
      setStartTime('10:00');
      setEndTime('11:00');
      setMeetingUrl('');
      setMeetingId('');
      setMeetingPassword('');
    } catch (error) {
      console.error('Error scheduling session:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo programar la sesión. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsScheduling(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programar Sesión en Directo</CardTitle>
        <CardDescription>
          Crea una nueva sesión en directo para tus estudiantes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título de la sesión *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Clase magistral: Introducción a la fotografía"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe brevemente el contenido de la sesión..."
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Fecha de inicio *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, 'PPP', { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startTime">Hora de inicio *</Label>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Fecha de finalización *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, 'PPP', { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endTime">Hora de finalización *</Label>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Detalles de la reunión</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meetingUrl">URL de la reunión</Label>
              <Input
                id="meetingUrl"
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
                placeholder="https://zoom.us/j/1234567890"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meetingId">ID de la reunión</Label>
                <Input
                  id="meetingId"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  placeholder="123 456 7890"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meetingPassword">Contraseña</Label>
                <Input
                  id="meetingPassword"
                  value={meetingPassword}
                  onChange={(e) => setMeetingPassword(e.target.value)}
                  placeholder="abc123"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSchedule} disabled={isScheduling}>
          {isScheduling ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Programando...
            </>
          ) : (
            'Programar Sesión'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
