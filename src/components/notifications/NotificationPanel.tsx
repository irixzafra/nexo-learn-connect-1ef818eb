
import React from 'react';
import { 
  BellRing, 
  Check, 
  ChevronRight, 
  Sparkles, 
  MessageSquare, 
  Trophy,
  Bell,
  Info,
  RefreshCw
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Notification } from '@/types/notifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

interface NotificationPanelProps {
  onClose?: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { 
    notifications, 
    isLoading, 
    markAsRead, 
    markAllAsRead,
    refresh 
  } = useNotifications();
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'announcement':
        return <Bell className="h-4 w-4 text-purple-500" />;
      case 'achievement':
        return <Trophy className="h-4 w-4 text-amber-500" />;
      case 'course_completed':
        return <Sparkles className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-slate-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    if (isToday(date)) {
      return `Hoy, ${format(date, 'HH:mm')}`;
    } else if (isYesterday(date)) {
      return `Ayer, ${format(date, 'HH:mm')}`;
    } else {
      return format(date, 'dd/MM/yyyy', { locale: es });
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
    
    // Navigate if there's an action URL
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      if (onClose) onClose();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 h-[300px]">
        <div className="animate-spin">
          <BellRing className="h-6 w-6 text-primary/50" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Cargando notificaciones...</p>
      </div>
    );
  }

  return (
    <div className="w-[350px] max-w-full flex flex-col max-h-[85vh]">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h3 className="font-medium">Notificaciones</h3>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => refresh()}
            className="h-8 w-8"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => markAllAsRead()}
            className="text-xs h-8"
            disabled={notifications.every(n => n.isRead)}
          >
            <Check className="h-3.5 w-3.5 mr-1" />
            Marcar todas como leídas
          </Button>
        </div>
      </div>
      
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 h-[200px]">
          <BellRing className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground mt-2">No tienes notificaciones</p>
        </div>
      ) : (
        <ScrollArea className="flex-1 max-h-[400px]">
          <div className="flex flex-col">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={cn(
                  "flex p-3 border-b border-border/60 cursor-pointer transition-colors",
                  !notification.isRead ? "bg-muted/30" : "hover:bg-muted/30"
                )}
              >
                <div className="mr-3 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <p className={cn(
                      "text-sm line-clamp-2",
                      !notification.isRead && "font-medium"
                    )}>
                      {notification.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                      {formatDate(notification.createdAt)}
                    </span>
                  </div>
                  
                  {notification.content && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.content}
                    </p>
                  )}
                  
                  {notification.actionUrl && (
                    <div className="flex items-center text-xs text-primary font-medium">
                      {!notification.isRead && <span className="h-1.5 w-1.5 rounded-full bg-primary mr-1"></span>}
                      Ver detalles
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
      
      <Separator />
      <div className="p-2">
        <Button 
          variant="ghost" 
          className="w-full justify-center text-sm h-8"
          onClick={() => {
            navigate('/notifications');
            if (onClose) onClose();
          }}
        >
          Ver todas las notificaciones
        </Button>
      </div>
    </div>
  );
};
