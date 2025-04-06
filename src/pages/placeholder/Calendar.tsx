
import React from 'react';
import { Calendar as CalendarIcon, Plus, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Calendar: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CalendarIcon className="h-8 w-8 text-primary" />
            Calendario
          </h1>
          <p className="text-muted-foreground">Administra tus eventos y clases programadas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <List className="h-4 w-4 mr-2" />
            Lista
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Evento
          </Button>
        </div>
      </div>

      <Tabs defaultValue="month" className="space-y-4">
        <TabsList>
          <TabsTrigger value="day">Día</TabsTrigger>
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="month">Mes</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
        </TabsList>
        
        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Noviembre 2023</CardTitle>
              <CardDescription>Vista mensual de tus eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-px bg-muted text-center">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                  <div key={day} className="py-2 font-medium text-sm">{day}</div>
                ))}
                
                {Array.from({ length: 35 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`min-h-[100px] p-1 border border-border ${i % 7 === 0 || i % 7 === 6 ? 'bg-muted/50' : 'bg-card'}`}
                  >
                    <div className="text-right text-sm text-muted-foreground p-1">
                      {((i - 2 + 31) % 31) + 1}
                    </div>
                    {Math.random() > 0.8 && (
                      <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 p-1 mt-1 rounded">
                        Evento {i}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>15 de Noviembre, 2023</CardTitle>
              <CardDescription>Vista diaria de tus eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-10">
                Vista diaria en desarrollo
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Semana del 13 al 19 de Noviembre, 2023</CardTitle>
              <CardDescription>Vista semanal de tus eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-10">
                Vista semanal en desarrollo
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agenda" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tu Agenda</CardTitle>
              <CardDescription>Próximos eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-10">
                Vista de agenda en desarrollo
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calendar;
