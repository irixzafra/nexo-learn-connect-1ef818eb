
import React, { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { LoadingPage } from '@/components/ui/loading-page';
import { Bell, CheckCircle, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Notification, NotificationType } from '@/types/notifications';
import { useNavigate } from 'react-router-dom';

const Notifications: React.FC = () => {
  const { 
    notifications, 
    isLoading, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const typeMatch = filter === 'all' || notification.type === filter;
    const readMatch = !showUnreadOnly || !notification.isRead;
    return typeMatch && readMatch;
  });

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  if (isLoading) {
    return <LoadingPage message="Cargando notificaciones..." />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notificaciones</h1>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={filter === 'all'}
                onCheckedChange={() => setFilter('all')}
              >
                Todos los tipos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === 'message'}
                onCheckedChange={() => setFilter('message')}
              >
                Mensajes
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === 'course_completed'}
                onCheckedChange={() => setFilter('course_completed')}
              >
                Cursos completados
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === 'announcement'}
                onCheckedChange={() => setFilter('announcement')}
              >
                Anuncios
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === 'achievement'}
                onCheckedChange={() => setFilter('achievement')}
              >
                Logros
              </DropdownMenuCheckboxItem>
              <Separator className="my-2" />
              <DropdownMenuCheckboxItem
                checked={showUnreadOnly}
                onCheckedChange={setShowUnreadOnly}
              >
                Solo no leídas
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar todo como leído
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Todas las notificaciones</CardTitle>
          <CardDescription>
            {filteredNotifications.length} 
            {filteredNotifications.length === 1 ? ' notificación' : ' notificaciones'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <Bell className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-lg">No hay notificaciones</p>
              <p className="text-sm mt-2">
                {filter !== 'all' || showUnreadOnly 
                  ? 'Prueba a cambiar los filtros para ver más notificaciones' 
                  : 'Las notificaciones aparecerán aquí cuando las recibas'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="flex items-start p-4 rounded-lg border hover:bg-accent/50 cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-base ${!notification.isRead ? 'font-medium' : ''}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(notification.createdAt), 'PPP, HH:mm', { locale: es })}
                      </span>
                    </div>
                    {notification.content && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.content}
                      </p>
                    )}
                    {!notification.isRead && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          No leído
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
