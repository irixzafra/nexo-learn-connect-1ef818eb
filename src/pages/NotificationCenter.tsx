
import React, { useState } from 'react';
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';
import { 
  Bell, 
  CheckCheck, 
  Filter, 
  MessageSquare, 
  Search, 
  Trophy, 
  Users, 
  Calendar, 
  Megaphone, 
  Sparkles,
  Book,
  Info
} from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';
import { NotificationType } from '@/types/notifications';
import { useNavigate } from 'react-router-dom';

const NotificationCenter: React.FC = () => {
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { notifications, markAllAsRead, markAsRead, unreadCount, refreshNotifications } = useNotifications();
  const navigate = useNavigate();

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'course_completed':
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case 'announcement':
        return <Megaphone className="h-5 w-5 text-purple-500" />;
      case 'achievement':
        return <Sparkles className="h-5 w-5 text-emerald-500" />;
      case 'community':
        return <Users className="h-5 w-5 text-indigo-500" />;
      case 'system':
      default:
        return <Info className="h-5 w-5 text-slate-500" />;
    }
  };

  const getTabIcon = (type: NotificationType | 'all') => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'course_completed':
        return <Book className="h-4 w-4" />;
      case 'announcement':
        return <Megaphone className="h-4 w-4" />;
      case 'achievement':
        return <Trophy className="h-4 w-4" />;
      case 'community':
        return <Users className="h-4 w-4" />;
      case 'system':
        return <Bell className="h-4 w-4" />;
      case 'all':
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatDate = (date: string) => {
    const notificationDate = new Date(date);
    
    if (isToday(notificationDate)) {
      return `Hoy, ${format(notificationDate, 'HH:mm')}`;
    } else if (isYesterday(notificationDate)) {
      return `Ayer, ${format(notificationDate, 'HH:mm')}`;
    } else {
      return format(notificationDate, 'dd MMM, HH:mm', { locale: es });
    }
  };

  const getGroupedNotifications = () => {
    const filtered = notifications.filter(notification => {
      const matchesFilter = filter === 'all' || notification.type === filter;
      const matchesSearch = searchTerm === '' || 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (notification.content && notification.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesFilter && matchesSearch;
    });

    const grouped: Record<string, typeof notifications> = {};
    
    filtered.forEach(notification => {
      const date = new Date(notification.created_at);
      let key: string;
      
      if (isToday(date)) {
        key = 'Hoy';
      } else if (isYesterday(date)) {
        key = 'Ayer';
      } else {
        key = format(date, 'dd MMMM yyyy', { locale: es });
      }
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      
      grouped[key].push(notification);
    });
    
    return grouped;
  };

  const groupedNotifications = getGroupedNotifications();
  const notificationCount = notifications.filter(n => 
    (filter === 'all' || n.type === filter) && 
    (searchTerm === '' || 
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.content && n.content.toLowerCase().includes(searchTerm.toLowerCase())))
  ).length;

  const handleNotificationClick = (notificationId: string, actionUrl?: string) => {
    markAsRead(notificationId);
    
    if (actionUrl) {
      navigate(actionUrl);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bell className="h-7 w-7 text-primary" />
              Centro de Notificaciones
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona todas tus notificaciones del sistema
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshNotifications}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtrar</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead} 
              className="flex items-center gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Marcar todo como leído</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-12 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <Tabs 
                defaultValue="all" 
                orientation="vertical" 
                onValueChange={(value) => setFilter(value as NotificationType | 'all')}
                value={filter}
              >
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                  <TabsTrigger 
                    value="all" 
                    className="justify-start w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {getTabIcon('all')}
                      <span>Todas</span>
                      <Badge className="ml-auto" variant="secondary">
                        {notifications.length}
                      </Badge>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="message" 
                    className="justify-start w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {getTabIcon('message')}
                      <span>Mensajes</span>
                      <Badge className="ml-auto" variant="secondary">
                        {notifications.filter(n => n.type === 'message').length}
                      </Badge>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="course_completed" 
                    className="justify-start w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {getTabIcon('course_completed')}
                      <span>Cursos</span>
                      <Badge className="ml-auto" variant="secondary">
                        {notifications.filter(n => n.type === 'course_completed').length}
                      </Badge>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="announcement" 
                    className="justify-start w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {getTabIcon('announcement')}
                      <span>Anuncios</span>
                      <Badge className="ml-auto" variant="secondary">
                        {notifications.filter(n => n.type === 'announcement').length}
                      </Badge>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="achievement" 
                    className="justify-start w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {getTabIcon('achievement')}
                      <span>Logros</span>
                      <Badge className="ml-auto" variant="secondary">
                        {notifications.filter(n => n.type === 'achievement').length}
                      </Badge>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="community" 
                    className="justify-start w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {getTabIcon('community')}
                      <span>Comunidad</span>
                      <Badge className="ml-auto" variant="secondary">
                        {notifications.filter(n => n.type === 'community').length}
                      </Badge>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="system" 
                    className="justify-start w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {getTabIcon('system')}
                      <span>Sistema</span>
                      <Badge className="ml-auto" variant="secondary">
                        {notifications.filter(n => n.type === 'system').length}
                      </Badge>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="md:col-span-12 lg:col-span-9">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <CardTitle>
                  {filter === 'all' ? 'Todas las notificaciones' : 
                    filter === 'message' ? 'Mensajes' :
                    filter === 'course_completed' ? 'Notificaciones de cursos' :
                    filter === 'announcement' ? 'Anuncios' :
                    filter === 'achievement' ? 'Logros' :
                    filter === 'community' ? 'Comunidad' : 'Notificaciones del sistema'}
                </CardTitle>
                <Badge variant="outline">
                  {notificationCount} {notificationCount === 1 ? 'notificación' : 'notificaciones'}
                </Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar notificaciones..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-300px)]">
                {Object.keys(groupedNotifications).length > 0 ? (
                  <div className="px-4 py-2">
                    {Object.entries(groupedNotifications).map(([date, notifications]) => (
                      <div key={date} className="mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2 sticky top-0 bg-background pt-2 pb-1 backdrop-blur-sm bg-opacity-90">
                          {date}
                        </h3>
                        <div className="space-y-2">
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className={cn(
                                "p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent group",
                                !notification.is_read && "bg-accent/50"
                              )}
                              onClick={() => handleNotificationClick(notification.id, notification.action_url)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className={cn(
                                      "text-sm truncate",
                                      !notification.is_read && "font-medium"
                                    )}>
                                      {notification.title}
                                    </h4>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                      {formatDate(notification.created_at)}
                                    </span>
                                  </div>
                                  {notification.content && (
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                      {notification.content}
                                    </p>
                                  )}
                                  {notification.sender_name && (
                                    <div className="flex items-center gap-2 mt-2">
                                      <Avatar className="h-5 w-5">
                                        {notification.sender_avatar ? (
                                          <AvatarImage src={notification.sender_avatar} />
                                        ) : (
                                          <AvatarFallback>{notification.sender_name.charAt(0)}</AvatarFallback>
                                        )}
                                      </Avatar>
                                      <span className="text-xs text-muted-foreground">{notification.sender_name}</span>
                                    </div>
                                  )}
                                  {notification.action_url && (
                                    <div className="mt-2 hidden group-hover:block">
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="h-7 text-xs" 
                                      >
                                        Ver detalles
                                      </Button>
                                    </div>
                                  )}
                                </div>
                                {!notification.is_read && (
                                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Bell className="h-12 w-12 mb-3 text-muted-foreground/30" />
                    {searchTerm || filter !== 'all' ? (
                      <>
                        <h3 className="text-lg font-medium mb-1">No hay notificaciones que coincidan</h3>
                        <p className="text-muted-foreground">
                          Intenta con otros términos de búsqueda o filtros
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => {
                            setSearchTerm('');
                            setFilter('all');
                          }}
                        >
                          Mostrar todas las notificaciones
                        </Button>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium mb-1">No tienes notificaciones</h3>
                        <p className="text-muted-foreground">
                          Cuando recibas notificaciones, aparecerán aquí
                        </p>
                      </>
                    )}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationCenter;
